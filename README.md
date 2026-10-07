# Hurray Wellness – Animated Hero

Full-screen "coming soon" hero built with **Vite + React + Tailwind CSS v4**.
No animation libraries: everything is CSS keyframes.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the build
```

## What animates

- Text lines slide in from the **left** on load (staggered); the divider line grows; "Wellness" has a continuous shine.
- The woman slides in once from the **right**, then stays still.
- The four circle shapes pop in, then loop continuously (float, morph, drift) with a light mouse parallax.
- Sunlight (top-left glow + soft diagonal bands) pulses and sways.

## Customize

- **Swap the woman**: replace `src/assets/woman.png` (transparent PNG). If her framing changes,
  adjust `x`, `y`, `width`, `height` on the `<image>` in `src/components/Hero.jsx`
  (the SVG uses a 1600x900 coordinate space).
- **Colors / animations / font**: edit the `@theme` block in `src/index.css`.
- **Circle positions**: edit `cx`, `cy`, `r` on the shapes in `Hero.jsx`.
- **Portrait breakpoint**: `@custom-variant tall` in `src/index.css`
  (and `TALL_QUERY` in `Hero.jsx`; keep them in sync).

## Responsiveness

The hero is always exactly one screen (`100dvh`) and never scrolls. The circles and woman live in one SVG and
scale together. Landscape: text left, scene pinned bottom-right. Portrait/near-square
(aspect ratio below 11:10): text on top, scene below.
