export default {
  async fetch(request: Request): Promise<Response> {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leviathan Compute Revenue Mindmap</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'JetBrains Mono', monospace; background: #020617; min-height: 100vh; padding: 2rem; color: white; }
    .container { max-width: 1400px; margin: 0 auto; }
    .header { margin-bottom: 2rem; }
    .header-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
    .pulse-dot { width: 12px; height: 12px; background: #22d3ee; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    h1 { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.025em; }
    .subtitle { color: #94a3b8; font-size: 0.875rem; margin-left: 1.75rem; }
    .diagram-container { background: rgba(15, 23, 42, 0.5); border-radius: 1rem; border: 1px solid #1e293b; padding: 1.5rem; overflow-x: auto; }
    svg { width: 100%; min-width: 1100px; display: block; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 2rem; }
    .card { background: rgba(15, 23, 42, 0.5); border-radius: 0.75rem; border: 1px solid #1e293b; padding: 1.25rem; }
    .card-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
    .card-dot { width: 8px; height: 8px; border-radius: 50%; }
    .card-dot.cyan { background: #22d3ee; }
    .card-dot.emerald { background: #34d399; }
    .card-dot.violet { background: #a78bfa; }
    .card-dot.amber { background: #fbbf24; }
    .card-dot.rose { background: #fb7185; }
    .card h3 { font-size: 0.875rem; font-weight: 600; }
    .card ul { list-style: none; color: #94a3b8; font-size: 0.75rem; }
    .card li { margin-bottom: 0.375rem; }
    .footer { text-align: center; margin-top: 1.5rem; color: #475569; font-size: 0.75rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-row">
        <div class="pulse-dot"></div>
        <h1>Leviathan Compute Revenue Mindmap</h1>
      </div>
      <p class="subtitle">Quad-stream revenue architecture for off-grid GPU compute arbitrage</p>
    </div>

    <div class="diagram-container">
      <svg viewBox="0 0 1200 780">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.5"/>
          </pattern>
        </defs>

        <!-- Background Grid -->
        <rect width="100%" height="100%" fill="url(#grid)" />

        <!-- CENTRAL HUB -->
        <ellipse cx="600" cy="390" rx="140" ry="50" fill="rgba(34, 211, 238, 0.15)" stroke="#22d3ee" stroke-width="2"/>
        <text x="600" y="375" fill="white" font-size="14" font-weight="700" text-anchor="middle">Leviathan Compute</text>
        <text x="600" y="395" fill="white" font-size="14" font-weight="700" text-anchor="middle">Revenue Model</text>
        <text x="600" y="420" fill="#22d3ee" font-size="9" text-anchor="middle">Panic Responsibly™</text>

        <!-- SPOKE 1: QUAD-STREAM REVENUE (TOP-LEFT) -->
        <ellipse cx="220" cy="160" rx="150" ry="90" fill="rgba(52, 211, 153, 0.1)" stroke="#34d399" stroke-width="1.5"/>
        <text x="220" y="95" fill="#34d399" font-size="11" font-weight="600" text-anchor="middle">QUAD-STREAM REVENUE</text>
        
        <!-- Passive Income Branch -->
        <rect x="80" y="140" width="140" height="40" rx="6" fill="rgba(52, 211, 153, 0.15)" stroke="#34d399" stroke-width="1.5"/>
        <text x="150" y="158" fill="white" font-size="11" font-weight="600" text-anchor="middle">Passive Income</text>
        
        <rect x="80" y="200" width="140" height="100" rx="6" fill="rgba(34, 211, 153, 0.1)" stroke="#34d399" stroke-width="1.5"/>
        <text x="150" y="218" fill="#34d399" font-size="10" font-weight="600" text-anchor="middle">GPU Compute Rack</text>
        <text x="150" y="238" fill="#94a3b8" font-size="8" text-anchor="middle">RTX 4090 Cluster</text>
        <text x="150" y="254" fill="#94a3b8" font-size="8" text-anchor="middle">Vast.ai</text>
        <text x="150" y="270" fill="#94a3b8" font-size="8" text-anchor="middle">Render Network</text>
        <text x="150" y="286" fill="#94a3b8" font-size="8" text-anchor="middle">Rent Coverage 24/7</text>

        <!-- Active Manufacturing Branch -->
        <rect x="300" y="140" width="150" height="40" rx="6" fill="rgba(52, 211, 153, 0.15)" stroke="#34d399" stroke-width="1.5"/>
        <text x="375" y="158" fill="white" font-size="11" font-weight="600" text-anchor="middle">Active Manufacturing</text>
        
        <rect x="300" y="200" width="150" height="160" rx="6" fill="rgba(251, 211, 36, 0.1)" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="375" y="218" fill="#fbbf24" font-size="10" font-weight="600" text-anchor="middle">3D Printing</text>
        <text x="375" y="238" fill="#94a3b8" font-size="8" text-anchor="middle">Formlabs Form 4</text>
        <text x="375" y="254" fill="#94a3b8" font-size="8" text-anchor="middle">Medical Grade Resin</text>
        <text x="375" y="270" fill="#94a3b8" font-size="8" text-anchor="middle">Anatomical Sovereignty</text>
        
        <text x="375" y="295" fill="#fb7185" font-size="10" font-weight="600" text-anchor="middle">Laser Fabrication</text>
        <text x="375" y="315" fill="#94a3b8" font-size="8" text-anchor="middle">xTool P2 Laser</text>
        <text x="375" y="331" fill="#94a3b8" font-size="8" text-anchor="middle">Leather Engraving</text>
        <text x="375" y="347" fill="#94a3b8" font-size="8" text-anchor="middle">Acrylic Cutting</text>
        <text x="375" y="363" fill="#94a3b8" font-size="8" text-anchor="middle">Custom Hardware</text>

        <rect x="300" y="380" width="150" height="50" rx="6" fill="rgba(167, 139, 250, 0.1)" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="375" y="398" fill="#a78bfa" font-size="10" font-weight="600" text-anchor="middle">Vinil Graphics</text>
        <text x="375" y="418" fill="#94a3b8" font-size="8" text-anchor="middle">Graphtec Cutter</text>
        <text x="375" y="434" fill="#94a3b8" font-size="8" text-anchor="middle">Event Decals</text>

        <!-- SPOKE 2: GENERATION-LED (TOP-RIGHT) -->
        <ellipse cx="980" cy="160" rx="150" ry="90" fill="rgba(251, 191, 36, 0.1)" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="980" y="95" fill="#fbbf24" font-size="11" font-weight="600" text-anchor="middle">GENERATION-LED (DUMP LOAD)</text>
        
        <rect x="880" y="130" width="200" height="140" rx="6" fill="rgba(251, 191, 36, 0.1)" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="980" y="148" fill="#fbbf24" font-size="11" font-weight="600" text-anchor="middle">Direction 1</text>
        <text x="980" y="170" fill="#94a3b8" font-size="8" text-anchor="middle">Excess Solar/Wind → GPU</text>
        <text x="980" y="190" fill="#94a3b8" font-size="8" text-anchor="middle">GPU 4h/day = 22.4 kWh</text>
        <text x="980" y="210" fill="#94a3b8" font-size="8" text-anchor="middle">GPU 8h/day = 26.4 kWh</text>
        <text x="980" y="230" fill="#94a3b8" font-size="8" text-anchor="middle">12-Panel Roof = 16.2 kWh</text>
        <text x="980" y="250" fill="#94a3b8" font-size="8" text-anchor="middle">Deployable Shutters = 4-6 kWh</text>

        <!-- SPOKE 3: PRICE-LED (RIGHT) -->
        <ellipse cx="980" cy="460" rx="150" ry="90" fill="rgba(251, 113, 133, 0.1)" stroke="#fb7185" stroke-width="1.5"/>
        <text x="980" y="395" fill="#fb7185" font-size="11" font-weight="600" text-anchor="middle">PRICE-LED (GRID ARBITRAGE)</text>
        
        <rect x="880" y="430" width="200" height="140" rx="6" fill="rgba(251, 113, 133, 0.1)" stroke="#fb7185" stroke-width="1.5"/>
        <text x="980" y="448" fill="#fb7185" font-size="11" font-weight="600" text-anchor="middle">Direction 2</text>
        <text x="980" y="470" fill="#94a3b8" font-size="8" text-anchor="middle">Cheap Grid Power → GPU</text>
        <text x="980" y="490" fill="#94a3b8" font-size="8" text-anchor="middle">Grid Price < $0.10/kWh</text>
        <text x="980" y="510" fill="#94a3b8" font-size="8" text-anchor="middle">GPU Revenue > $0.50/kWh</text>
        <text x="980" y="530" fill="#94a3b8" font-size="8" text-anchor="middle">Pedestal @ 0 Marginal Cost</text>
        <text x="980" y="550" fill="#94a3b8" font-size="8" text-anchor="middle">Zero Marginal kWh</text>

        <!-- SPOKE 4: FOUR CONDITIONS (BOTTOM-RIGHT) -->
        <ellipse cx="980" cy="660" rx="150" ry="90" fill="rgba(167, 139, 250, 0.1)" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="980" y="595" fill="#a78bfa" font-size="11" font-weight="600" text-anchor="middle">FOUR CONDITIONS</text>
        <text x="980" y="615" fill="#a78bfa" font-size="11" font-weight="600" text-anchor="middle">FOR NET POSITIVE</text>
        
        <rect x="880" y="630" width="200" height="140" rx="6" fill="rgba(167, 139, 250, 0.15)" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="980" y="650" fill="#94a3b8" font-size="8" text-anchor="middle">GPU Rev > Gen Cost (LCOE)</text>
        <text x="980" y="670" fill="#94a3b8" font-size="8" text-anchor="middle">GPU Rev > Grid Price</text>
        <text x="980" y="690" fill="#94a3b8" font-size="8" text-anchor="middle">Load Fits Gen Window</text>
        <text x="980" y="710" fill="#94a3b8" font-size="8" text-anchor="middle">No New GPU Hardware Debt</text>

        <!-- SPOKE 5: WORKLOAD TYPES (BOTTOM-LEFT) -->
        <ellipse cx="220" cy="660" rx="150" ry="90" fill="rgba(34, 211, 153, 0.1)" stroke="#34d399" stroke-width="1.5"/>
        <text x="220" y="595" fill="#34d399" font-size="11" font-weight="600" text-anchor="middle">WORKLOAD TYPES</text>
        <text x="220" y="615" fill="#34d399" font-size="11" font-weight="600" text-anchor="middle">& ECONOMICS</text>
        
        <rect x="120" y="630" width="200" height="140" rx="6" fill="rgba(34, 211, 153, 0.1)" stroke="#34d399" stroke-width="1.5"/>
        <text x="220" y="650" fill="#34d399" font-size="11" font-weight="600" text-anchor="middle">Training</text>
        <text x="220" y="670" fill="#94a3b8" font-size="8" text-anchor="middle">High $/kWh, Bursty</text>
        <text x="220" y="690" fill="#34d399" font-size="11" font-weight="600" text-anchor="middle">Rendering</text>
        <text x="220" y="710" fill="#94a3b8" font-size="8" text-anchor="middle">Steady, Deadline-Driven</text>
        <text x="220" y="730" fill="#34d399" font-size="11" font-weight="600" text-anchor="middle">Inference</text>
        <text x="220" y="750" fill="#94a3b8" font-size="8" text-anchor="middle">24/7, Latency SLA</text>
        <text x="220" y="770" fill="#34d399" font-size="11" font-weight="600" text-anchor="middle">Hashing</text>
        <text x="220" y="790" fill="#94a3b8" font-size="8" text-anchor="middle">Crypto, Commoditized</text>

        <!-- SPOKE 6: POWER LEDGER (LEFT) -->
        <ellipse cx="220" cy="460" rx="150" ry="90" fill="rgba(251, 113, 133, 0.1)" stroke="#fb7185" stroke-width="1.5"/>
        <text x="220" y="395" fill="#fb7185" font-size="11" font-weight="600" text-anchor="middle">POWER LEDGER</text>
        <text x="220" y="415" fill="#fb7185" font-size="11" font-weight="600" text-anchor="middle">REALITY CHECK</text>
        
        <rect x="120" y="430" width="200" height="140" rx="6" fill="rgba(251, 113, 133, 0.1)" stroke="#fb7185" stroke-width="1.5"/>
        <text x="220" y="448" fill="#fb7185" font-size="11" font-weight="600" text-anchor="middle">Baseline Idle = 14.4 kWh/day</text>
        <text x="220" y="470" fill="#94a3b8" font-size="8" text-anchor="middle">8×400W + Wind = 11.55 kWh/day</text>
        <text x="220" y="490" fill="#fb7185" font-size="8" text-anchor="middle">Structural Deficit at Every Cycle</text>
        <text x="220" y="510" fill="#94a3b8" font-size="8" text-anchor="middle">Viable Path: Full Roof 12×400W</text>
        <text x="220" y="530" fill="#94a3b8" font-size="8" text-anchor="middle">+ Deployables + Throttling</text>
        <text x="220" y="550" fill="#fb7185" font-size="8" text-anchor="middle">⚠ Income vs Hobby: UNPROVEN</text>
        <text x="220" y="570" fill="#a78bfa" font-size="8" text-anchor="middle">Naming It Changes Decisions</text>

        <!-- KEY INSIGHT (BOTTOM-CENTER) -->
        <ellipse cx="600" cy="680" rx="120" ry="50" fill="rgba(167, 139, 250, 0.15)" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="600" y="655" fill="#a78bfa" font-size="11" font-weight="600" text-anchor="middle">KEY INSIGHT</text>
        <text x="600" y="675" fill="#a78bfa" font-size="11" font-weight="600" text-anchor="middle">RECONCILIATION FAILURE</text>
        
        <rect x="500" y="690" width="200" height="80" rx="6" fill="rgba(167, 139, 250, 0.1)" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="600" y="710" fill="#94a3b8" font-size="8" text-anchor="middle">Transcript: ~5 kWh/day → 38.4 kWh/day</text>
        <text x="600" y="728" fill="#94a3b8" font-size="8" text-anchor="middle">Both Numbers Live & Unreconciled</text>
        <text x="600" y="746" fill="#94a3b8" font-size="8" text-anchor="middle">Hardware Still Sized to First Number</text>
        <text x="600" y="764" fill="#94a3b8" font-size="8" text-anchor="middle">Full Roof Utilization = Biggest Win</text>

        <!-- CONNECTING LINES FROM HUB TO SPOKES -->
        <path d="M 460 390 Q 340 275 280 160" stroke="#22d3ee" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>
        <path d="M 740 390 Q 860 275 920 160" stroke="#fbbf24" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>
        <path d="M 740 440 Q 860 440 920 460" stroke="#fb7185" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>
        <path d="M 740 440 Q 860 550 920 660" stroke="#a78bfa" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>
        <path d="M 460 440 Q 340 550 280 660" stroke="#34d399" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>
        <path d="M 460 440 Q 340 440 280 460" stroke="#fb7185" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>

      </svg>
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-header">
          <div class="card-dot cyan"></div>
          <h3>Quad-Stream Revenue</h3>
        </div>
        <ul>
          <li>GPU Compute Rack (RTX 4090, Vast.ai, Render Network)</li>
          <li>3D Printing (Formlabs Form 4, Medical Resin)</li>
          <li>Laser Fabrication (xTool P2, Leather, Acrylic)</li>
          <li>Vinil Graphics (Graphtec Cutter, Event Decals)</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-dot amber"></div>
          <h3>Generation-Led (Dump Load)</h3>
        </div>
        <ul>
          <li>Excess Solar/Wind → GPU Compute</li>
          <li>4h GPU = 22.4 kWh/day</li>
          <li>8h GPU = 26.4 kWh/day</li>
          <li>12-Panel Roof = 16.2 kWh/day</li>
          <li>Deployable Shutters = 4-6 kWh/day</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-dot rose"></div>
          <h3>Price-Led (Grid Arbitrage)</h3>
        </div>
        <ul>
          <li>Grid < $0.10/kWh → GPU > $0.50/kWh</li>
          <li>Pedestal @ 0 Marginal Cost</li>
          <li>Zero Marginal kWh (Battery as UPS)</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-dot violet"></div>
          <h3>Four Conditions for Net Positive</h3>
        </div>
        <ul>
          <li>GPU Revenue > Generation Cost (LCOE)</li>
          <li>GPU Revenue > Grid Price (if Arbitrage)</li>
          <li>Load Fits Generation Window</li>
          <li>No New Hardware Debt for GPU Work</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-dot emerald"></div>
          <h3>Workload Types & Economics</h3>
        </div>
        <ul>
          <li>Training — High $/kWh, Bursty</li>
          <li>Rendering — Steady, Deadline-Driven</li>
          <li>Inference — 24/7, Latency SLA</li>
          <li>Hashing — Crypto, Commoditized</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-dot rose"></div>
          <h3>Power Ledger Reality Check</h3>
        </div>
        <ul>
          <li>Baseline Idle = 14.4 kWh/day</li>
          <li>8×400W + Wind = 11.55 kWh/day avg</li>
          <li>Structural Deficit at Every Cycle</li>
          <li>Viable: Full Roof 12×400W + Deploy + Throttle</li>
          <li>⚠ Income vs Hobby: UNPROVEN</li>
          <li>Naming It Changes Decisions</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-dot violet"></div>
          <h3>Key Insight: Reconciliation Failure</h3>
        </div>
        <ul>
          <li>Transcript: ~5 kWh/day → 38.4 kWh/day</li>
          <li>Both Numbers Live & Unreconciled</li>
          <li>Hardware Still Sized to First Number</li>
          <li>Full Roof Utilization = Biggest Win</li>
        </ul>
      </div>
    </div>

    <div class="footer">
      Leviathan Wiki — Operation Leviathan | panic-responsibly.github.io/leviathan-wiki
    </div>
  </div>
</body>
</html>`;
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};