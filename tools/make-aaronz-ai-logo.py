# Builds investor/aaronz-ai-logo.svg from the traced Aaronz & Co logo. Run from the repo root.
# The traced top row touches "& Co", so clip paths separate the letters; the "o" is its top half mirrored,
# the second "A" is copied, and the "I" is built from the foot of the "r".
import re
s=open('assets/brand/aaronz-co-logo.svg').read()
d=re.search(r' d="([^"]+)"',s).group(1)
subs=[x.strip() for x in re.split(r'(?=M )',d) if x.strip()]
A=subs[0]+' '+subs[1]; r=subs[2]; z=subs[4]
fused=' '.join([subs[3],subs[5],subs[6],subs[7]])   # a, o, n (and the & and C, clipped away) with their counters
clips='''<clipPath id="a"><path d="M335 140H596V372L598 376Q590 388 582 392Q572 398 556 397.5Q528 398 518 390L510 384.5H484Q474 391 462 395Q440 399 415 396Q392 393 378 386Q370 381 366 374L335 355Z"/></clipPath>
<clipPath id="o"><path d="M775 140H1005L1032 200V284H775Z"/></clipPath>
<clipPath id="n"><path d="M1008 145H1296V396.5H1032Q1021 396.5 1019 390V380H1040V182H1008Z"/></clipPath>
<clipPath id="f"><rect x="596" y="330" width="126" height="70"/></clipPath>'''
I=f'<g transform="translate(2034) scale(1.3 1) translate(-598)"><path d="{r}" clip-path="url(#f)"/><path d="{r}" clip-path="url(#f)" transform="matrix(1 0 0 -1 0 411)"/><rect x="635" y="66" width="44" height="279"/></g>'
body=f'''<defs>{clips}</defs><g fill="#000" fill-rule="evenodd"><path d="{A}"/><path d="{r}"/><path d="{z}"/><path d="{fused}" clip-path="url(#a)"/><path d="{fused}" clip-path="url(#n)"/><path d="{fused}" clip-path="url(#o)"/><path d="{fused}" clip-path="url(#o)" transform="matrix(1 0 0 -1 0 551)"/><path d="{A}" transform="translate(1640)"/>{I}</g>'''
open('investor/aaronz-ai-logo.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2200 404" role="img" aria-label="Aaronz AI"><title>Aaronz AI</title>{body}</svg>\n')
