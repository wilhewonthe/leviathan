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

### Deep links (shareable, and handy on a phone)

```
?open=bank                  open a component's panel directly
?view=basement              start in a camera preset
?mast=0&shutters=1&night=1  set the toggles
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
  a diagram you can click, not a render.
