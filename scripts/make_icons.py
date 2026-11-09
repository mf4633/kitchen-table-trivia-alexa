"""Draw the Kitchen Table Trivia icons: a question-mark card on a wooden table.

Usage: python -P scripts/make_icons.py docs
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

out = sys.argv[1]
S = 1024
im = Image.new("RGB", (S, S))
d = ImageDraw.Draw(im)

# warm wall gradient
for y in range(S):
    t = y / S
    d.line([(0, y), (S, y)], fill=(int(252 - 30 * t), int(196 - 40 * t), int(120 - 30 * t)))

# tabletop with planks
top = 660
d.rectangle([0, top, S, S], fill=(140, 82, 45))
for i, y in enumerate(range(top, S, 92)):
    d.line([(0, y), (S, y)], fill=(112, 62, 32), width=8)
    x = 180 + (i * 310) % 700
    d.line([(x, y), (x, y + 92)], fill=(112, 62, 32), width=6)
d.rectangle([0, top - 18, S, top + 6], fill=(168, 104, 60))

# card with shadow, standing on the table
cx0, cy0, cx1, cy1 = 262, 170, 762, 760
d.rounded_rectangle([cx0 + 22, cy0 + 26, cx1 + 22, cy1 + 26], radius=56, fill=(90, 50, 25))
d.rounded_rectangle([cx0, cy0, cx1, cy1], radius=56, fill=(255, 250, 240), outline=(181, 83, 42), width=14)

# question mark
font = None
for name in ("seguibl.ttf", "arialbd.ttf", "DejaVuSans-Bold.ttf"):
    try:
        font = ImageFont.truetype(name, 470)
        break
    except OSError:
        continue
if font is None:
    font = ImageFont.load_default()
bbox = d.textbbox((0, 0), "?", font=font)
w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
d.text(((cx0 + cx1) / 2 - w / 2 - bbox[0], (cy0 + cy1) / 2 - h / 2 - bbox[1] - 10), "?", font=font, fill=(181, 83, 42))

# three answer dots: A B C
for i, x in enumerate((392, 512, 632)):
    d.ellipse([x - 26, 680 - 26, x + 26, 680 + 26], fill=(46, 125, 50) if i == 1 else (214, 196, 170))

for size in (512, 108):
    im.resize((size, size), Image.LANCZOS).save(os.path.join(out, f"icon-{size}.png"), optimize=True)
print("icons written to", out)
