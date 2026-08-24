#!/usr/bin/env python3
"""Paint the burned-in timestamp and scale bar out of a frame sequence.

Imaris prints both into the pixels. A black box would be simpler, but the
timestamp sits directly on top of vesicles near the right-hand cell, so a box
would erase real signal. Instead the white glyphs are detected, dilated a
little, and filled in from their surroundings.

The vesicles recovered this way are INTERPOLATED, not measured. That is fine for
a decorative banner and is not something to reuse in a figure.

Usage:  deburn-overlays.py <in-dir> <out-dir>
Requires numpy and Pillow.
"""

import glob
import os
import sys

import numpy as np
from PIL import Image

# Where the overlays live in the 1554x930 source: top-right, bottom-left.
# Generous boxes -- the white/neutral test inside them is what actually selects.
REGIONS = [(1290, 1554, 0, 170), (0, 210, 810, 930)]


def dilate(mask, radius=2):
    out = mask.copy()
    for dy in range(-radius, radius + 1):
        for dx in range(-radius, radius + 1):
            out |= np.roll(np.roll(mask, dy, 0), dx, 1)
    return out


def neighbourhood_sum(img, known, radius=2):
    """Sum of `img` and count of `known`, over a square window."""
    total = np.zeros_like(img, dtype=float)
    count = np.zeros(img.shape[:2], dtype=float)
    weight = known.astype(float)
    for dy in range(-radius, radius + 1):
        for dx in range(-radius, radius + 1):
            total += np.roll(np.roll(img * weight[..., None], dy, 0), dx, 1)
            count += np.roll(np.roll(weight, dy, 0), dx, 1)
    return total, count


def deburn(frame):
    height, width, _ = frame.shape
    hi, lo = frame.max(2), frame.min(2)
    # The overlays are bright and colourless; fluorescence never is.
    burned = np.zeros((height, width), bool)
    for x0, x1, y0, y1 in REGIONS:
        region = np.zeros_like(burned)
        region[y0:y1, x0:x1] = True
        burned |= region & (lo > 140) & ((hi - lo) < 40)
    burned = dilate(burned)

    known = ~burned
    out = frame.copy()
    # Fill from the outside in: repeated local averages over what is still
    # unknown. Converges in a handful of passes for text-sized holes.
    for _ in range(14):
        if known.all():
            break
        total, count = neighbourhood_sum(out, known)
        fillable = (~known) & (count > 0)
        out[fillable] = total[fillable] / count[fillable][..., None]
        known |= fillable
    out[~known] = 0.0
    return np.clip(out, 0, 255).astype(np.uint8)


def main(src_dir, dst_dir):
    os.makedirs(dst_dir, exist_ok=True)
    frames = sorted(glob.glob(os.path.join(src_dir, "*.png")))
    if not frames:
        sys.exit(f"no PNG frames in {src_dir}")
    for path in frames:
        frame = np.asarray(Image.open(path).convert("RGB")).astype(float)
        Image.fromarray(deburn(frame)).save(
            os.path.join(dst_dir, os.path.basename(path)))
    print(f"retouched {len(frames)} frames -> {dst_dir}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
