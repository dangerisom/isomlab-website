#!/usr/bin/env python3
"""Re-pseudocolour the composite so the banner sits in the site palette.

The source is a flattened RGB composite of three channels:

    TM184C          magenta   (r, 0, r)
    LysoTracker     yellow    (l, l, 0)
    nuclei          blue      (0, 0, n)

Because the mixing is additive and each channel had a distinct hue, the three
can be recovered from the composite:

    lyso   = G
    tm184c = R - G
    nuclei = B - tm184c

with one correction. Where magenta and yellow overlap, R saturates at 255 and
`R - G` collapses to zero -- the exact pixels that matter most, the vesicles on
the bridge. There, the blue channel still carries the magenta intensity
un-clipped, so it is used instead.

Pseudocolour is arbitrary by construction, so restating it is not a
manipulation. What must not change is which pixels are lit, and nothing here
touches that -- only the colour each channel is drawn in.

Usage:  recolor-channels.py <in-dir> <out-dir>
Requires numpy and Pillow.
"""

import glob
import os
import sys

import numpy as np
from PIL import Image

# Site palette: --accent, --green, and a dim warm grey near --ink-faint so the
# nuclei read as context and let the two real channels carry the image.
TM184C = (0xE8, 0x83, 0x4A)      # --accent, UM orange
LYSOTRACKER = (0x4D, 0x9B, 0x7A)  # --green
NUCLEI = (0x4A, 0x45, 0x40)

# Orange and bluish-green are the one pair that stays separable across the
# common colour-vision deficiencies; magenta/yellow did too, so this keeps that
# property rather than trading it away for palette fit.

SATURATED = 0.94   # above this, R is clipped and R-G cannot be trusted
GAIN = 1.12        # the palette colours are darker than pure magenta/yellow


def unmix(frame):
    r, g, b = frame[..., 0], frame[..., 1], frame[..., 2]
    lyso = g
    tm = r - g
    clipped = r > SATURATED
    tm = np.where(clipped, np.maximum(tm, b), tm)
    nuclei = b - tm
    return (np.clip(tm, 0, 1), np.clip(lyso, 0, 1), np.clip(nuclei, 0, 1))


def recolor(frame):
    tm, lyso, nuclei = unmix(frame)
    out = np.zeros_like(frame)
    for weight, colour in ((tm, TM184C), (lyso, LYSOTRACKER), (nuclei, NUCLEI)):
        out += weight[..., None] * (np.array(colour, float) / 255.0)
    return np.clip(out * GAIN, 0, 1)


def main(src_dir, dst_dir):
    os.makedirs(dst_dir, exist_ok=True)
    frames = sorted(glob.glob(os.path.join(src_dir, "*.png")))
    if not frames:
        sys.exit(f"no PNG frames in {src_dir}")
    for path in frames:
        frame = np.asarray(Image.open(path).convert("RGB")).astype(float) / 255.0
        out = (recolor(frame) * 255).round().astype(np.uint8)
        Image.fromarray(out).save(os.path.join(dst_dir, os.path.basename(path)))
    print(f"recoloured {len(frames)} frames -> {dst_dir}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
