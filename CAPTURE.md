---
title: Capturing the coach for a photoreal scan
created: 2026-09-28
updated: 2026-09-28
type: procedure
tags: [panel, photoreal, gaussian-splatting, capture]
status: ready-when-you-are
---

# Capturing the coach

The panel's scan mode is built, wired and tested. It is waiting on one thing: a
Gaussian splat of the actual rig. This is the whole job, in order.

Scope agreed: **exterior only.** The shell as it exists today. Everything planned
but not yet bolted on (battery bank, Victron, genset) has nothing to photograph, so
it stays as the diagram model — which is also the only way to show the inside of a
sealed basement bay. The two layers are complementary, not competing.

---

## 1. Shoot it (about 10 minutes, phone is fine)

Photogrammetry and splat training both fail on the same three things: blur, glare,
and gaps. Everything below is aimed at those.

**Setup**

- Overcast day, or the shaded side of the coach. **Harsh sun is the enemy** — hard
  shadows become baked-in geometry that looks wrong from any other angle.
- Park it somewhere you can walk a **full 360°** with 2–3 m of clearance.
- Clean the glass, or accept that the windows will reconstruct as smeared blobs.
  Sky reflected in dark glass is the single worst input for these pipelines.
- Lock exposure and focus if your camera app allows it. Auto-exposure flicker
  between frames shows up as patchy colour in the result.

**The orbit**

- Walk the full circle **twice**: once at chest height, once lower — roughly
  1 m, looking slightly up at the roof line. The second pass at a different height
  is what stops the roof and the skirt reconstructing as flat cardboard.
- **Move slowly and steadily.** Video is fine and probably better than stills:
  a slow continuous walk at ~0.5 m/s. Fast pans create motion blur, and blur is
  unrecoverable.
- **Overlap 60–70%.** If you can see the previous position, you moved too far.
- Keep the coach filling most of the frame, but do leave some ground visible — a
  bit of ground gives the reconstruction a floor to sit on.
- One more short pass aimed up at the roof if you can manage it from a step ladder.
  The roof is where the solar/deployable plan physically lives, so it is worth the
  extra minute.
- 2–4 minutes of footage total is plenty. 4K if your phone does it, 1080p30 is fine.

**Do NOT**

- Don't shoot through a window or from inside.
- Don't use a wide-angle action cam — the distortion fights the reconstruction.
- Don't stop for photos mid-orbit and change position subtly; keep the motion continuous.

---

## 2. Turn it into a splat

Two routes. Pick per how much you care about the images leaving your machine.

### Route A — cloud (no GPU, works from the phone)

The quickest path to a real result. Upload the footage, get a splat back, download it.

- Luma AI's app does this end to end from a phone; other services exist and the
  field moves fast, so check what's current when you get there.
- Export **.spz** or **.ply** if offered. .spz is the compact one and is what this
  panel is set up to prefer.
- Trade-off: your vehicle footage goes to someone else's server, and you re-upload
  if you want to rescan.

### Route B — local (nothing leaves the machine)

Entirely offline, but it's a real pipeline and this box is at the small end of what
it will run on. **None of this is installed yet, and I have not run it here** —
these are the components and the shape of it, not a verified recipe:

1. A **Python 3.12 venv** — this box runs 3.14, and PyTorch has no wheels for it yet.
   `uv python install 3.12` then `uv venv --python 3.12`.
2. **COLMAP** (or GLOMAP) for structure-from-motion: turns the frames into camera
   poses. Not installed, and it needs building since there's no passwordless sudo.
3. **gsplat** for training. The 4 GB card is the binding constraint:
   - nerfstudio's default splatfacto wants ~6 GB and will not fit.
   - gsplat with **MCMC capped around 1M Gaussians** runs in roughly 2 GB. That fits.
   - Expect it to be slow on a laptop GPU. Hours, not minutes, for a good result.
4. `ffmpeg` to pull frames — that part **is** installed here.

Recommendation: if you want a result without a weekend of toolchain work, use
Route A first, and treat Route B as the version you own and can re-run.

---

## 3. Wire it into the panel

1. Drop the file next to `index.html` (e.g. `alfa.spz`). Keep it under 100 MB —
   that's GitHub Pages' per-file limit. A 2–3 minute orbit usually lands well
   inside that.
2. Set the URL in `alfa-leviathan.html`:
   ```js
   splat: { url: "alfa.spz", ... }
   ```
3. Open `?photoreal=1`.

**Aligning it.** A raw splat arrives at arbitrary scale and orientation, so it will
not land on the model by itself. Use this procedure:

1. Turn scan mode on. The coach model hides and the 11 **beacons** appear.
2. Adjust `fit` until the splat sits inside the beacon constellation:
   ```js
   fit: { scale: 1.0, pos: [0, 0, 0], rot: [0, 0, 0], flipY: true }
   ```
   - `scale` — the scene is in **feet** (the coach is 38 long, 8.5 wide, 13 tall).
     A splat usually arrives with no meaningful units, so this is the first knob.
   - `rot` — degrees, `[x, y, z]`. Get the nose pointing the right way, then level it.
   - `flipY` — leave `true` unless the coach appears upside-down; Spark's own
     example uses the flip because phone-photogrammetry output is often inverted
     about Y.
   - `pos` — fine positioning once scale and rotation are right.
3. The beacons are the alignment reference: each one sits at a real component's
   position on the model (bank, array, mast, basement AC, and so on). When a beacon
   lands on the corresponding part of the splat, `fit` is correct.

The beacons stay clickable throughout, so the spec panels keep working whether the
scan is aligned, half-loaded, or not there at all.

---

## Ready-made facts

- **The demo splat proves the pipeline.** `?photoreal=1` with `url` unset loads a
  public sample instead, and says so in a banner. It's a butterfly, not a coach —
  it exists to show the plumbing works before you spend an afternoon filming.
- **Scan mode never breaks the panel.** Spark is loaded lazily, the whole thing is
  wrapped, and if it fails the diagram model is untouched.
- **Privacy.** The panel is published to a public repo (`wilhewonthe/leviathan`).
  If the scan goes in the deploy directory, footage of your coach, at a place you
  parked it, becomes public. If that's not wanted: keep the `.spz` out of the
  published copy and open `alfa-leviathan.html` locally with the file alongside it.
  Nothing else about the panel requires the scan to be hosted.

## Not yet verified

Splat rasterisation could not be confirmed in this environment — the headless
software renderer executes Spark without producing splat pixels, so the demo
renders nothing here. That means the *plumbing* is proven (Spark loads, the
model hides, beacons appear and stay clickable, toggles restore cleanly) but
the first real visual confirmation will be on your own machine.
