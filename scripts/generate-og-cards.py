"""Generate 1200x630 Open Graph cards for blog articles into public/og/.

Renders each article's MUI hero icon (extracted from @mui/icons-material
SVG path data) plus its title onto a branded card. Run after adding a new
icon-hero article:  python3 scripts/generate-og-cards.py
Requires: Pillow (pip install Pillow)
"""
import re
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = '/Users/olvisgil/Documents/GitHub/edunode-website'
OUT = ROOT + '/public/og'
W, H = 1200, 630

CARDS = [
    ('blockchain-developer-roadmap', 'Map', 'How to Become a Blockchain Developer in 2026'),
    ('what-is-a-stablecoin', 'MonetizationOn', 'What Is a Stablecoin? How USDC Works on Stellar'),
    ('rwa-tokenization', 'AccountBalance', 'Real-World Asset (RWA) Tokenization Explained'),
    ('smart-contract-security-vulnerabilities', 'Security', 'Top 10 Smart Contract Security Vulnerabilities'),
    ('freighter-wallet', 'AccountBalanceWallet', "Freighter Wallet: Stellar's Most Popular Wallet"),
    ('what-is-defi', 'AccountBalance', 'What Is DeFi? A Beginner\u2019s Guide to DeFi'),
    ('crypto-wallet-security', 'VpnKey', 'Crypto Wallet Security: Seed Phrases & Passkeys'),
    ('ai-and-blockchain', 'Memory', 'AI and Blockchain: How AI Meets Web3'),
    ('build-stellar-apps-with-go', 'Code', "A Go Developer's Guide to Stellar"),
]

def icon_ds(name):
    src = open(f'{ROOT}/node_modules/@mui/icons-material/{name}.js').read()
    return re.findall(r'd: "([^"]+)"|d: \'([^\']+)\'', src)

TOKEN = re.compile(r'([MmLlHhVvCcSsZz])|(-?\d*\.?\d+(?:e-?\d+)?)')

def cubic(p0, p1, p2, p3, t):
    mt = 1 - t
    return (
        mt**3*p0[0] + 3*mt**2*t*p1[0] + 3*mt*t**2*p2[0] + t**3*p3[0],
        mt**3*p0[1] + 3*mt**2*t*p1[1] + 3*mt*t**2*p2[1] + t**3*p3[1],
    )

def parse_path(d, steps=16):
    toks = [(m.group(1), m.group(2)) for m in TOKEN.finditer(d)]
    polys, poly = [], []
    i, cmd = 0, None
    cx = cy = sx = sy = 0.0
    prev_c2 = None

    def num():
        nonlocal i
        v = float(toks[i][1]); i += 1; return v

    while i < len(toks):
        if toks[i][0]:
            cmd = toks[i][0]; i += 1
            if cmd in 'Zz':
                if poly: polys.append(poly); poly = []
                cx, cy = sx, sy
                prev_c2 = None
                continue
        rel = cmd.islower()
        C = cmd.upper()
        if C == 'M':
            x, y = num(), num()
            if rel: x += cx; y += cy
            if poly: polys.append(poly)
            poly = [(x, y)]
            cx, cy, sx, sy = x, y, x, y
            cmd = 'l' if rel else 'L'
        elif C == 'L':
            x, y = num(), num()
            if rel: x += cx; y += cy
            poly.append((x, y)); cx, cy = x, y
            prev_c2 = None
        elif C == 'H':
            x = num()
            if rel: x += cx
            poly.append((x, cy)); cx = x
            prev_c2 = None
        elif C == 'V':
            y = num()
            if rel: y += cy
            poly.append((cx, y)); cy = y
            prev_c2 = None
        elif C == 'C':
            p1 = (num(), num()); p2 = (num(), num()); p3 = (num(), num())
            if rel:
                p1 = (p1[0]+cx, p1[1]+cy); p2 = (p2[0]+cx, p2[1]+cy); p3 = (p3[0]+cx, p3[1]+cy)
            for k in range(1, steps+1):
                poly.append(cubic((cx, cy), p1, p2, p3, k/steps))
            prev_c2 = p2; cx, cy = p3
        elif C == 'S':
            p1 = prev_c2 and (2*cx - prev_c2[0], 2*cy - prev_c2[1]) or (cx, cy)
            p2 = (num(), num()); p3 = (num(), num())
            if rel:
                p2 = (p2[0]+cx, p2[1]+cy); p3 = (p3[0]+cx, p3[1]+cy)
            for k in range(1, steps+1):
                poly.append(cubic((cx, cy), p1, p2, p3, k/steps))
            prev_c2 = p2; cx, cy = p3
        else:
            break
    if poly: polys.append(poly)
    return polys

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def font(path, size, name_hint=''):
    for idx in range(0, 12):
        try:
            f = ImageFont.truetype(path, size, index=idx)
            fam = ' '.join(f.getname()).lower()
            if name_hint.lower() in fam:
                return f
        except Exception:
            break
    return ImageFont.truetype(path, size)

HELV = '/System/Library/Fonts/Helvetica.ttc'
f_title = font(HELV, 44, 'bold')
f_tag   = font(HELV, 26, 'bold')
f_foot  = font(HELV, 26, '')

def wrap(draw, text, fnt, maxw):
    lines, cur = [], ''
    for w in text.split(' '):
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=fnt) <= maxw or not cur:
            cur = t
        else:
            lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

for slug, icon, title in CARDS:
    img = Image.new('RGB', (W, H))
    px = img.load()
    top, bot = (13, 13, 43), (27, 20, 64)
    for y in range(H):
        row = lerp(top, bot, y / H)
        for x in range(W):
            px[x, y] = row

    # purple glow top-right
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([720, -260, 1420, 440], fill=(107, 72, 255, 70))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img.paste(glow, (0, 0), glow)

    d = ImageDraw.Draw(img)

    # icon tile
    tx, ty, ts = 90, 175, 280
    d.rounded_rectangle([tx, ty, tx+ts, ty+ts], radius=36,
                        fill=(107, 72, 255, 38), outline=(107, 72, 255), width=3)
    scale = 150 / 24.0
    ox, oy = tx + (ts - 150) / 2, ty + (ts - 150) / 2

    def inside(pt, poly):
        x, y = pt
        ins = False
        n = len(poly)
        for i in range(n):
            x1, y1 = poly[i]; x2, y2 = poly[(i + 1) % n]
            if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
                ins = not ins
        return ins

    for dstr in icon_ds(icon):
        d = dstr[0] or dstr[1]
        drawn = []
        for poly in parse_path(d):
            pts = [(ox + x*scale, oy + y*scale) for x, y in poly]
            if len(pts) < 3:
                continue
            cxm = sum(p[0] for p in pts) / len(pts)
            cym = sum(p[1] for p in pts) / len(pts)
            is_hole = any(inside((cxm, cym), p) for p in drawn)
            ImageDraw.Draw(img).polygon(
                pts, fill=(107, 72, 255) if is_hole else (167, 139, 250))
            drawn.append(pts)
    d = ImageDraw.Draw(img)

    # text
    tx0, maxw = 430, W - 430 - 60
    lines = wrap(d, title, f_title, maxw)
    line_h = 56
    block = len(lines) * line_h
    y = (H - block) / 2 + 20
    d.text((tx0, y - 62), 'EDUNODE BLOG', font=f_tag, fill=(139, 124, 246))
    for ln in lines:
        d.text((tx0, y), ln, font=f_title, fill=(255, 255, 255))
        y += line_h

    d.text((W - 60, H - 60), 'edunode.org', font=f_foot, fill=(111, 122, 160), anchor='ra')

    img.save(f'{OUT}/{slug}.png', optimize=True)
    print('wrote', slug)
