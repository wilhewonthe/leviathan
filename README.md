# Operation Leviathan — interactive rig panel

A single self-contained HTML file: a clickable, animated 3D model of the 2006 Alfa See Ya
37FD as it is planned, with a side panel on every component carrying the specification,
the **envelope** (what is deliberately *not* fixed), and the warnings worth remembering.

**Live:** https://wilhewonthe.github.io/leviathan/

No build step, no dependencies to install — three.js loads from a CDN. Open
`index.html` and it runs.

## Using it

- **Click any component** — roof array, shutters, wind rig, genset, battery bank,
  inverter, compute node, network, 12V island, shore input, mini-split.
- **Drag** to orbit, **scroll** to zoom.
- **Day / Night** — swaps the lighting for the evening case.
- **Energy flow** — animates the power paths along their actual routes.
- **Deploy shutters / Stow mast** — the two moving parts.
- **Coach / Basement / Whole rig** — camera presets. The basement view reveals the bank,
  inverter, compute node, genset and 12V island inside the bay.
- **Power ledger** — the working energy balance, computed from stated assumptions.
- **Scan** — photoreal mode. Swap the diagram for a real Gaussian-splat capture of the
  coach, with the same components still clickable. See *Photoreal scan mode* below.

### Deep links (shareable, and handy on a phone)

```
?open=bank                  open a component's panel directly
?view=basement              start in a camera preset
?mast=0&shutters=1&night=1  set the toggles
?photoreal=1                start in scan mode
```

Full list of `?open=` ids: `panels`, `shutters`, `mast`, `genset`, `bank`, `inverter`,
`compute`, `network`, `island`, `shore`, `minisplit`.
Example: `index.html?open=bank&view=basement`

### Attaching your own dashboards

Edit `live.json` (next to `index.html`) and the panels pick it up — no rebuild:

```json
{
  "metrics": { "soc": 78, "pv_w": 2140, "load_w": 1180, "gpu_w": 640 },
  "dashboards": {
    "victron": "http://cerbo.local",
    "grafana":  "http://100.x.x.x:3000/d/leviathan",
    "proxmox":  "https://proxmox.local:8006"
  }
}
```

Each component maps to a dashboard slot (bank/inverter → `victron`, network → `grafana`,
compute → `proxmox`). Empty slots say so instead of breaking. Prefer **local** addresses
over cloud portals: a cloud dashboard is unavailable exactly when the rig is offline and
you actually want to look at it.

You can also drive it from the console or another page:

```js
Leviathan.select('bank');          // open a component
Leviathan.setLive({ metrics: { soc: 78 } });
```

## Photoreal scan mode

The diagram model is a blockout: honest for layout, useless for *what it looks like*.
Scan mode replaces the visuals with a real capture, without giving up the interactive layer.

The insight that makes it work: **a Gaussian splat is surface, not structure.** It looks like
a photograph but knows nothing about what a component *is* — you can't click a cloud of
points and get a spec sheet, and you can't splat the inside of a sealed basement bay at all.
So the two layers do different jobs:

| layer | provides | why |
|---|---|---|
| the splat | what the rig looks like | captured light, real surfaces |
| the diagram model | what everything *is* | stays clickable at zero opacity, so the 11 spec panels keep working |
| the beacons | where to click | 22 markers at each component's real position, over the splat |

Turn it on and the model drops to `opacity: 0` — still in the scene, still raycastable, just
invisible — and cyan beacons appear at each component's position. Clicking a beacon opens
exactly the same panel it always did.

This also solves a problem no amount of rendering fidelity could: **you cannot photograph
hardware you haven't bought.** Only the shell and the fitted gear can be scanned. The bank,
the inverter, the genset and the basement interior have no physical counterpart yet, so the
diagram stays the right answer for them regardless.

### Turning it on

The slot lives in the `WIKI` block:

```js
splat: {
  url: null,                 // e.g. "alfa.spz" — your capture, next to index.html
  demo: "https://sparkjs.dev/assets/splats/butterfly.spz",
  fit: { scale: 1.0, pos: [0,0,0], rot: [0,0,0], flipY: true }
}
```

Until `url` is set, `?photoreal=1` loads the public demo splat and labels it as such, so the
pipeline can be exercised end to end before you've filmed anything. **`CAPTURE.md`** is the
capture and alignment procedure.

`fit` exists because a raw splat arrives at arbitrary scale and orientation. The scene is in
feet (38 × 8.5 × 13), so `scale` is the first knob, then `rot` in degrees, then `pos`. The
beacons double as the alignment reference — when a beacon lands on the corresponding part of
the splat, `fit` is right.

### Why it can't break the panel

Spark is loaded with a **dynamic import inside a try/catch**, and nothing in the core path
awaits it. If it's offline, blocked, or the file is missing, the diagram model is untouched
and the button reports why. Activation never blocks on the splat either — the model hides and
the beacons appear immediately, and a scan that never arrives warns after 12 seconds rather
than leaving scan mode stuck loading.

Renderer: [Spark](https://sparkjs.dev) (World Labs, MIT) — the maintained successor to
mkkellogg's viewer, which its own author now points people away from.

## The wiki

The **source of truth is not this file.** It is a markdown wiki in
`~/leviathan-wiki/`, in the Karpathy LLM-wiki layout, openable directly as an Obsidian
vault. The `WIKI` object at the top of `index.html` is the generated subset this panel
needs; regenerate it when the wiki changes.

The wiki is built so no number is treated as fixed — every hardware figure is written as
*role → governing constraint → acceptable envelope*, because the parts will be bought on
price when they're available, not chosen to a spec sheet today.

## Regenerating this panel

Edit the `WIKI` object at the top of the `<script type="module">` block. That is the only
place the panel's content lives. Structure per component:

```js
{ id, label, group, status: 'settled'|'open'|'contested',
  spec:     { "Label": "value", ... },   // what it is
  envelope: "what is NOT fixed and why",
  notes:    ["plain note", "⚠️ warning"],  // ⚠️ renders as a warning block
  wiki:     "entities/whatever.md" }
```

`status` colours the badge in the panel header. `⚠️` at the start of a note renders it as
a warning block.

## The headline finding

The panel's **Power ledger** carries the number that matters most, and it is not a
hardware spec: recomputing the energy balance from the plan's own assumptions shows a
**deficit at every compute duty cycle, including running no GPU work at all.** The source
plan sized hardware around ~5 kWh/day early on, then sized the *load* around 38.4 kWh/day
once the compute node appeared, and never reconciled the two.

That is why the roof-fit table is in there too: the roof physically takes 11–12 large
panels, not the 8 the plan settled on, and whether to use that area is an energy question
rather than a space question.

## Notes

- `<meta name="robots" content="noindex">` is set deliberately. This is a personal plan,
  not a public document.
- Press **Power ledger →** to see all assumptions and what would replace each one with a
  measured value (PVWatts for the site's real sun hours, NASA POWER for wind).
- The model is a deliberate low-poly blockout built from the plan's own dimensions: it is
  a diagram you can click, not a render. For the photoreal view, see **Photoreal scan mode**
  and `CAPTURE.md`.
