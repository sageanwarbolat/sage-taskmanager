Place the Sage UI webfont files in this folder to enable the exact typography.

Expected files (example names):
- SageUI-Regular.woff2
- SageUI-Regular.woff
- SageUI-Bold.woff2
- SageUI-Bold.woff

How to obtain:
- If you have a license or package for the Sage UI font, copy the `.woff2`/`.woff` files here.
- If Sage UI is a proprietary font, please add the files from your design system provider.

Notes:
- The CSS in `styles.css` preloads and registers these files using `@font-face`.
- The browser will fall back to system fonts if the files are absent.
