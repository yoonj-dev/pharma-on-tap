#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)

# 1. Favicon SVG (Rose & Emerald Biotech Capsule / DNA Motif)
svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="capsuleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e" />
      <stop offset="50%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="#0f172a"/>
  
  <!-- Outer Bio Ring -->
  <circle cx="256" cy="256" r="170" fill="none" stroke="#1e293b" stroke-width="16" />
  
  <!-- Angled Medicine Capsule -->
  <g transform="rotate(-45 256 256)" filter="url(#glow)">
    <!-- Top Capsule Half (Rose) -->
    <path d="M 216 130 C 216 95, 296 95, 296 130 L 296 250 L 216 250 Z" fill="#f43f5e" />
    <!-- Bottom Capsule Half (Emerald) -->
    <path d="M 216 262 L 296 262 L 296 382 C 296 417, 216 417, 216 382 Z" fill="#10b981" />
    <!-- Center Dividing Band -->
    <rect x="210" y="250" width="92" height="12" rx="3" fill="#ffffff" fill-opacity="0.9"/>
    <!-- Capsule Gloss Shine -->
    <path d="M 230 140 L 240 140 L 240 370 L 230 370 Z" fill="#ffffff" fill-opacity="0.25" rx="4"/>
  </g>
  
  <!-- DNA Molecule Orbit Dots -->
  <circle cx="150" cy="170" r="14" fill="#38bdf8" />
  <circle cx="362" cy="342" r="14" fill="#a855f7" />
  <circle cx="342" cy="150" r="10" fill="#34d399" />
  <circle cx="170" cy="362" r="10" fill="#fb7185" />
</svg>'''

with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w") as f:
    f.write(svg_content)

def draw_pharma_icon(size):
    img = Image.new("RGBA", (size, size), (15, 23, 42, 255))
    draw = ImageDraw.Draw(img)
    scale = size / 512.0
    
    # Outer ring
    c = size // 2
    r_ring = int(170 * scale)
    w_ring = max(2, int(14 * scale))
    draw.ellipse([c - r_ring, c - r_ring, c + r_ring, c + r_ring], outline=(30, 41, 59, 255), width=w_ring)
    
    # Angled capsule simulation: two distinct rounded pill shapes
    # Draw simple clean pill in center
    pill_w = int(100 * scale)
    pill_h = int(240 * scale)
    x1 = c - pill_w // 2
    y1 = c - pill_h // 2
    r_pill = pill_w // 2
    
    # Top half (Rose)
    draw.rounded_rectangle([x1, y1, x1 + pill_w, c - int(4 * scale)], radius=r_pill, fill=(244, 63, 94, 255))
    # Bottom half (Emerald)
    draw.rounded_rectangle([x1, c + int(4 * scale), x1 + pill_w, y1 + pill_h], radius=r_pill, fill=(16, 185, 129, 255))
    
    # Molecule dots
    d_r = max(2, int(12 * scale))
    draw.ellipse([int(150 * scale) - d_r, int(170 * scale) - d_r, int(150 * scale) + d_r, int(170 * scale) + d_r], fill=(56, 189, 248, 255))
    draw.ellipse([int(362 * scale) - d_r, int(342 * scale) - d_r, int(362 * scale) + d_r, int(342 * scale) + d_r], fill=(168, 85, 247, 255))
    
    return img

img_512 = draw_pharma_icon(512)
img_512.save(os.path.join(PUBLIC_DIR, "icon-512.png"))

img_192 = draw_pharma_icon(192)
img_192.save(os.path.join(PUBLIC_DIR, "icon-192.png"))

img_180 = draw_pharma_icon(180)
img_180.save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"))

img_32 = draw_pharma_icon(32)
img_32.save(os.path.join(PUBLIC_DIR, "favicon.ico"), format="ICO", sizes=[(32, 32)])

# Open Graph image (1200x630)
og_img = Image.new("RGBA", (1200, 630), (15, 23, 42, 255))
draw_og = ImageDraw.Draw(og_img)

for x in range(0, 1200, 60):
    draw_og.line([x, 0, x, 630], fill=(30, 41, 59, 100), width=1)
for y in range(0, 630, 60):
    draw_og.line([0, y, 1200, y], fill=(30, 41, 59, 100), width=1)

icon_center = draw_pharma_icon(240)
og_img.paste(icon_center, (120, 195), icon_center)

og_img.save(os.path.join(PUBLIC_DIR, "og-image.png"))
print("Pharma on Tap branding assets generated successfully!")
