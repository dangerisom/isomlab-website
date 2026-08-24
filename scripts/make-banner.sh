#!/bin/bash
# Rebuild the looping homepage banner from the source microscopy clip.
#
# Rarely needed -- only when the source movie changes. See "The homepage banner"
# in the README for what each step is doing and why.
#
# Requires ffmpeg, plus python3 with numpy and Pillow for the retouch step.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=src/assets/RICTOR-3D-connection-1.mp4
OUT=public/media/intercellular-connection
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

ANGLE=23.66          # measured axis of the connection, degrees
CROP=1740:350:56:580  # w:h:x:y in the rotated canvas -- ~5:1, a cell at each end

mkdir -p public/media "$WORK/raw"
echo "1/5  extracting frames"
ffmpeg -v error -i "$SRC" "$WORK/raw/f%03d.png"

echo "2/5  painting out the timestamp and scale bar"
python3 scripts/deburn-overlays.py "$WORK/raw" "$WORK/clean"

echo "3/5  re-pseudocolouring into the site palette"
python3 scripts/recolor-channels.py "$WORK/clean" "$WORK/tinted"

echo "4/5  levelling ${ANGLE} deg, cropping to ${CROP}, ping-pong loop"
R="${ANGLE}*PI/180"
VF="rotate=${R}:ow=rotw(${R}):oh=roth(${R}):c=black,crop=${CROP},format=yuv420p"
# Reversing without the shared end frames keeps the turnaround from stuttering.
ffmpeg -v error -framerate 8 -i "$WORK/tinted/f%03d.png" \
  -filter_complex "[0:v]${VF},split[a][b];\
[b]reverse,trim=start_frame=1:end_frame=34,setpts=PTS-STARTPTS[r];\
[a][r]concat=n=2:v=1:a=0[v]" \
  -map "[v]" -r 8 -an \
  -c:v libx264 -profile:v high -crf 23 -preset slow -pix_fmt yuv420p \
  -movflags +faststart "${OUT}.mp4" -y

echo "5/5  webm and poster"
ffmpeg -v error -i "${OUT}.mp4" -an -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 \
  "${OUT}.webm" -y
ffmpeg -v error -i "${OUT}.mp4" -frames:v 1 -q:v 4 "${OUT}.jpg" -y

echo
ls -la "${OUT}".* | awk '{printf "  %6.0f KB  %s\n", $5/1024, $9}'
echo
echo "If you change the crop, update the aspect-ratio in src/pages/index.astro."
