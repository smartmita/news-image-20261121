import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const OUT_DIR = resolve(import.meta.dirname);
const HTML_PATH = join(OUT_DIR, 'poster.html');
const PNG_PATH = join(OUT_DIR, 'entry.png');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1024px;
    height: 1024px;
    overflow: hidden;
    background: #F4EFE4;
    color: #141A23;
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 18px 20px 14px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background:
      radial-gradient(circle at 12% 8%, rgba(200, 125, 24, 0.06), transparent 40%),
      radial-gradient(circle at 88% 92%, rgba(31, 78, 121, 0.06), transparent 40%),
      #F4EFE4;
    border: 4px solid #141A23;
  }
  .masthead {
    border-bottom: 3px double #141A23;
    padding-bottom: 8px;
  }
  .mast-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: #4A525D;
    margin-bottom: 4px;
  }
  .date-pill {
    background: #B82921;
    color: #FFFFFF;
    padding: 3px 12px;
    border-radius: 3px;
    letter-spacing: 1.8px;
  }
  .mast-title-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .mast-title {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 44px;
    font-weight: 900;
    letter-spacing: -0.5px;
    line-height: 1.02;
    color: #10161F;
  }
  .mast-sub {
    font-size: 16px;
    font-weight: 700;
    color: #2E3744;
    text-align: right;
  }

  .grid-row-1 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    height: 332px;
  }
  .grid-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    height: 274px;
  }
  .grid-row-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    height: 238px;
  }

  .card {
    background: #FBF8F1;
    border: 2px solid #1E2631;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 3px 3px 0 #1E2631;
  }
  .grid-row-1 .card-art {
    height: 222px;
    flex: 0 0 222px;
  }
  .grid-row-2 .card-art {
    height: 170px;
    flex: 0 0 170px;
  }
  .grid-row-3 .card-art {
    height: 140px;
    flex: 0 0 140px;
  }
  .card-art {
    width: 100%;
    border-bottom: 1.5px solid #1E2631;
    position: relative;
    overflow: hidden;
  }
  .card-art svg {
    width: 100%;
    height: 100%;
    display: block;
  }
  .tag {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 3px 9px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #FFFFFF;
    border-radius: 2px;
    box-shadow: 1px 1px 0 rgba(0,0,0,0.4);
  }
  .tag-climate { background: #196B5E; }
  .tag-diplomacy { background: #1E4D7B; }
  .tag-europe { background: #B82921; }
  .tag-mideast { background: #9C4E12; }
  .tag-americas { background: #5B2C6F; }
  .tag-asia { background: #1E6B8A; }
  .tag-global { background: #2D3748; }

  .card-body {
    padding: 8px 11px 9px 11px;
    background: #FBF8F1;
  }
  .card-body h2 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 22px;
    font-weight: 900;
    line-height: 1.12;
    color: #10161F;
    margin-bottom: 3px;
  }
  .grid-row-3 .card-body h2 {
    font-size: 18.5px;
  }
  .card-body p {
    font-size: 14.5px;
    font-weight: 600;
    line-height: 1.24;
    color: #2B3440;
  }
  .grid-row-3 .card-body p {
    font-size: 13.5px;
    line-height: 1.22;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #141A23;
    padding-top: 5px;
    font-size: 12.5px;
    font-weight: 800;
    letter-spacing: 0.9px;
    color: #374151;
    text-transform: uppercase;
  }
</style>
</head>
<body>
<div class="page">
  <header class="masthead">
    <div class="mast-top">
      <span>Global Illustrated Broadsheet</span>
      <span class="date-pill">Saturday, 21 November 2026</span>
      <span>Climate · Diplomacy · Security · Markets</span>
    </div>
    <div class="mast-title-row">
      <div class="mast-title">WORLD NEWS IN REVIEW</div>
      <div class="mast-sub">International Edition · 21 Nov 2026</div>
    </div>
  </header>

  <!-- ROW 1: HERO STORIES -->
  <section class="grid-row-1">
    <!-- COP31 OVERTIME -->
    <article class="card">
      <div class="card-art">
        <span class="tag tag-climate">Climate · Antalya, Turkey</span>
        <svg viewBox="0 0 480 222" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyCop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#113834"/>
              <stop offset="55%" stop-color="#25544C"/>
              <stop offset="100%" stop-color="#8A3727"/>
            </linearGradient>
          </defs>
          <rect width="480" height="222" fill="url(#skyCop)"/>
          <!-- Sun/Heat glow -->
          <circle cx="240" cy="112" r="78" fill="#E8A838" opacity="0.18"/>
          <circle cx="240" cy="112" r="56" fill="#FBF8F1" stroke="#141A23" stroke-width="3"/>
          <text x="240" y="92" text-anchor="middle" fill="#196B5E" font-size="13" font-weight="900" letter-spacing="1">COP31</text>
          <!-- Clock face: past deadline -->
          <line x1="240" y1="62" x2="240" y2="69" stroke="#141A23" stroke-width="3"/>
          <line x1="240" y1="155" x2="240" y2="162" stroke="#141A23" stroke-width="3"/>
          <line x1="190" y1="112" x2="197" y2="112" stroke="#141A23" stroke-width="3"/>
          <line x1="283" y1="112" x2="290" y2="112" stroke="#141A23" stroke-width="3"/>
          <line x1="240" y1="112" x2="240" y2="76" stroke="#141A23" stroke-width="4" stroke-linecap="round"/>
          <line x1="240" y1="112" x2="274" y2="128" stroke="#C83228" stroke-width="5" stroke-linecap="round"/>
          <circle cx="240" cy="112" r="5.5" fill="#C83228"/>
          <!-- Overtime badge on clock -->
          <rect x="176" y="172" width="128" height="26" rx="4" fill="#B82921" stroke="#141A23" stroke-width="2"/>
          <text x="240" y="190" text-anchor="middle" fill="#FFF" font-size="14" font-weight="900" letter-spacing="1.2">OVERTIME</text>
          <!-- Left side: Wind turbines -->
          <g stroke="#E2F1ED" stroke-width="3.2" stroke-linecap="round" fill="none">
            <line x1="78" y1="222" x2="78" y2="116"/>
            <line x1="78" y1="116" x2="50" y2="96"/>
            <line x1="78" y1="116" x2="108" y2="104"/>
            <line x1="78" y1="116" x2="74" y2="152"/>
            <line x1="134" y1="222" x2="134" y2="146"/>
            <line x1="134" y1="146" x2="115" y2="132"/>
            <line x1="134" y1="146" x2="154" y2="138"/>
            <line x1="134" y1="146" x2="132" y2="170"/>
          </g>
          <circle cx="78" cy="116" r="4.5" fill="#E2F1ED"/>
          <circle cx="134" cy="146" r="3.5" fill="#E2F1ED"/>
          <!-- Protest sign on left -->
          <g transform="translate(22, 166)">
            <line x1="22" y1="28" x2="22" y2="56" stroke="#FBF8F1" stroke-width="2.5"/>
            <rect width="74" height="28" rx="3" fill="#FDE68A" stroke="#141A23" stroke-width="2"/>
            <text x="37" y="19" text-anchor="middle" fill="#141A23" font-size="12" font-weight="900">"NO DEAL?"</text>
          </g>
          <!-- Right side: Smokestacks & crossed-out text -->
          <rect x="352" y="132" width="24" height="90" fill="#232931" stroke="#0F141A" stroke-width="2"/>
          <rect x="390" y="114" width="28" height="108" fill="#232931" stroke="#0F141A" stroke-width="2"/>
          <path d="M364,126 Q356,96 380,84 Q399,70 419,76" fill="none" stroke="#CBD5E1" stroke-width="10" stroke-linecap="round" opacity="0.55"/>
          <path d="M404,108 Q412,80 436,70 Q454,62 466,66" fill="none" stroke="#CBD5E1" stroke-width="12" stroke-linecap="round" opacity="0.65"/>
          <!-- Draft paper with crossed out FOSSIL FUEL -->
          <g transform="translate(324, 18)">
            <rect width="142" height="46" rx="4" fill="#FBF8F1" stroke="#141A23" stroke-width="2"/>
            <text x="71" y="19" text-anchor="middle" fill="#141A23" font-size="11.5" font-weight="900">DRAFT TEXT:</text>
            <text x="71" y="37" text-anchor="middle" fill="#B82921" font-size="13" font-weight="900" text-decoration="line-through">FOSSIL PHASEOUT</text>
          </g>
        </svg>
      </div>
      <div class="card-body">
        <h2>COP31 Climate Talks Stall in Overtime</h2>
        <p>Antalya summit deadlocked past deadline after fossil-fuel phaseout cut from draft; EU &amp; Panama warn "no deal."</p>
      </div>
    </article>

    <!-- TRUMP XI PUTIN SUMMIT -->
    <article class="card">
      <div class="card-art">
        <span class="tag tag-diplomacy">Diplomacy · Shenzhen, China</span>
        <svg viewBox="0 0 480 222" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyDip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#132B47"/>
              <stop offset="100%" stop-color="#274E78"/>
            </linearGradient>
          </defs>
          <rect width="480" height="222" fill="url(#skyDip)"/>
          <!-- Stylized Shenzhen skyline silhouette -->
          <path d="M0,222 L0,165 L26,165 L26,130 L52,130 L52,175 L76,175 L76,108 L94,82 L112,108 L112,170 L146,170 L146,142 L176,142 L176,222 Z" fill="#0E2036"/>
          <path d="M310,222 L310,150 L340,150 L340,115 L365,115 L365,165 L392,165 L392,92 L416,92 L416,145 L448,145 L448,125 L480,125 L480,222 Z" fill="#0E2036"/>
          <!-- Three Flag Pillars: US, China, Russia -->
          <g transform="translate(88, 52)">
            <rect width="74" height="46" fill="#FFFFFF" stroke="#141A23" stroke-width="2"/>
            <rect y="0" width="74" height="7" fill="#B82921"/>
            <rect y="14" width="74" height="7" fill="#B82921"/>
            <rect y="28" width="74" height="7" fill="#B82921"/>
            <rect y="40" width="74" height="6" fill="#B82921"/>
            <rect width="34" height="26" fill="#1B3B6F"/>
            <text x="37" y="65" text-anchor="middle" fill="#F1F5F9" font-size="13.5" font-weight="900">TRUMP</text>
          </g>
          <g transform="translate(203, 38)">
            <rect width="74" height="46" fill="#C82820" stroke="#141A23" stroke-width="2"/>
            <polygon points="15,10 17,16 23,16 18,20 20,26 15,22 10,26 12,20 7,16 13,16" fill="#F4C430"/>
            <text x="37" y="65" text-anchor="middle" fill="#FDE68A" font-size="13.5" font-weight="900">XI</text>
          </g>
          <g transform="translate(318, 52)">
            <rect width="74" height="46" fill="#FFFFFF" stroke="#141A23" stroke-width="2"/>
            <rect y="15" width="74" height="16" fill="#1D4ED8"/>
            <rect y="31" width="74" height="15" fill="#B82921"/>
            <text x="37" y="65" text-anchor="middle" fill="#F1F5F9" font-size="13.5" font-weight="900">PUTIN</text>
          </g>
          <!-- Wide Crisp Summit Declaration Card -->
          <rect x="28" y="138" width="424" height="62" rx="8" fill="#FBF8F1" stroke="#141A23" stroke-width="3"/>
          <text x="240" y="164" text-anchor="middle" fill="#10161F" font-size="17" font-weight="900" letter-spacing="0.5">"DECLARATION TOWARD PEACE"</text>
          <text x="240" y="186" text-anchor="middle" fill="#1E4D7B" font-size="13" font-weight="800">NUCLEAR DIALOGUE · UN REFORM · NO UKRAINE TRUCE</text>
        </svg>
      </div>
      <div class="card-body">
        <h2>Trump, Xi &amp; Putin Issue Peace Pact</h2>
        <p>Shenzhen APEC trilateral talks yield "Declaration toward Peace" on nuclear risk; no Ukraine or Mideast truce.</p>
      </div>
    </article>
  </section>

  <!-- ROW 2: SECURITY STORIES -->
  <section class="grid-row-2">
    <!-- BALTIC SHIP SPARTA II -->
    <article class="card">
      <div class="card-art">
        <span class="tag tag-europe">Europe · Baltic Sea</span>
        <svg viewBox="0 0 480 170" xmlns="http://www.w3.org/2000/svg">
          <rect width="480" height="170" fill="#1A354D"/>
          <!-- Baltic Coastline shapes: Finland top, Estonia bottom -->
          <path d="M0,0 L480,0 L480,38 Q390,48 310,32 Q220,22 140,42 Q60,52 0,34 Z" fill="#2F4D3F" stroke="#141A23" stroke-width="2"/>
          <path d="M0,170 L0,136 Q95,126 185,142 Q265,152 340,138 L480,145 L480,170 Z" fill="#3B5342" stroke="#141A23" stroke-width="2"/>
          <text x="355" y="25" text-anchor="middle" fill="#E2EFE8" font-size="12.5" font-weight="900" letter-spacing="1">FINLAND (OFF LOVIISA)</text>
          <text x="90" y="159" fill="#E2EFE8" font-size="12.5" font-weight="900" letter-spacing="1">ESTONIA EEZ</text>
          <!-- Cargo Ship Sparta II -->
          <g transform="translate(120, 62)">
            <polygon points="10,48 155,48 175,30 0,30" fill="#2A313B" stroke="#0F141A" stroke-width="2"/>
            <rect x="20" y="14" width="38" height="16" fill="#D9DFE7" stroke="#0F141A" stroke-width="2"/>
            <rect x="65" y="20" width="72" height="10" fill="#8B3A2B" stroke="#0F141A" stroke-width="1.5"/>
            <text x="86" y="43" text-anchor="middle" fill="#FFF" font-size="11" font-weight="900" letter-spacing="1">SPARTA II</text>
            <circle cx="48" cy="14" r="13" fill="#F97316"/>
            <circle cx="44" cy="10" r="8" fill="#FACC15"/>
            <path d="M48,4 Q64,-16 92,-14 Q118,-18 142,-6" fill="none" stroke="#94A3B8" stroke-width="11" stroke-linecap="round" opacity="0.75"/>
          </g>
          <!-- Drone strike arc -->
          <path d="M352,58 Q285,36 196,74" fill="none" stroke="#F87171" stroke-width="2.5" stroke-dasharray="6,4"/>
          <polygon points="354,58 372,52 368,64" fill="#FCA5A5"/>
          <text x="380" y="64" fill="#FCA5A5" font-size="12.5" font-weight="900">DRONES</text>
          <!-- Kryvyi Rih inset tag -->
          <rect x="296" y="96" width="172" height="36" rx="4" fill="#141A23" opacity="0.92" stroke="#FCA5A5" stroke-width="1.5"/>
          <text x="382" y="111" text-anchor="middle" fill="#FCA5A5" font-size="11" font-weight="800">UKRAINE STRIKE:</text>
          <text x="382" y="126" text-anchor="middle" fill="#FFFFFF" font-size="11.5" font-weight="700">Missile hits Kryvyi Rih</text>
        </svg>
      </div>
      <div class="card-body">
        <h2>Drones Strike Russian Ship Sparta II</h2>
        <p>Sanctioned military-linked vessel catches fire off Estonia and drifts into Finnish waters; 16 crew evacuated.</p>
      </div>
    </article>

    <!-- RIYADH MISSILES -->
    <article class="card">
      <div class="card-art">
        <span class="tag tag-mideast">Middle East · Riyadh</span>
        <svg viewBox="0 0 480 170" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nightRiyadh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#171326"/>
              <stop offset="100%" stop-color="#3E2538"/>
            </linearGradient>
          </defs>
          <rect width="480" height="170" fill="url(#nightRiyadh)"/>
          <!-- Riyadh Skyline -->
          <path d="M0,170 L0,132 L38,132 L38,112 L68,112 L68,138 L108,138 L108,92 L134,74 L160,92 L160,135 L208,135 L208,52 L222,42 L236,52 L236,135 L286,135 L286,102 L322,102 L322,138 L372,138 L372,110 L405,110 L405,135 L480,135 L480,170 Z" fill="#100E1B"/>
          <!-- Kingdom Centre inverted arch cutout -->
          <path d="M214,48 Q222,74 230,48 Z" fill="#2A1B33"/>
          <!-- 3 incoming ballistic missile arcs (red) -->
          <path d="M40,22 Q110,20 165,54" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="6,4"/>
          <path d="M120,10 Q190,15 245,44" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="6,4"/>
          <path d="M395,18 Q340,24 295,52" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="6,4"/>
          <!-- Air defense interceptors (cyan/gold) -->
          <path d="M125,135 L165,54" stroke="#38BDF8" stroke-width="2.5"/>
          <path d="M225,135 L245,44" stroke="#38BDF8" stroke-width="2.5"/>
          <path d="M335,135 L295,52" stroke="#38BDF8" stroke-width="2.5"/>
          <!-- Intercept bursts -->
          <g fill="#FACC15" stroke="#FFF" stroke-width="1.5">
            <polygon points="165,42 169,51 178,50 171,57 175,65 166,60 158,65 161,56 153,51 162,51"/>
            <polygon points="245,32 249,41 258,40 251,47 255,55 246,50 238,55 241,46 233,41 242,41"/>
            <polygon points="295,40 299,49 308,48 301,55 305,63 296,58 288,63 291,54 283,49 292,49"/>
          </g>
          <rect x="320" y="88" width="144" height="30" rx="4" fill="#141A23" opacity="0.9" stroke="#FACC15" stroke-width="1.5"/>
          <text x="392" y="108" text-anchor="middle" fill="#FACC15" font-size="12.5" font-weight="900">3 INTERCEPTED</text>
          <text x="64" y="156" fill="#CBD5E1" font-size="11.5" font-weight="900" letter-spacing="1.5">RIYADH SKYLINE</text>
        </svg>
      </div>
      <div class="card-body">
        <h2>Houthi Missiles Downed Over Riyadh</h2>
        <p>Saudi air defenses intercept three ballistic missiles early Saturday, days after strike on PIF tower.</p>
      </div>
    </article>
  </section>

  <!-- ROW 3: 3 COMPACT GLOBAL STORIES -->
  <section class="grid-row-3">
    <!-- MEXICO CARTEL RAID -->
    <article class="card">
      <div class="card-art">
        <span class="tag tag-americas">Americas · Mexico</span>
        <svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="140" fill="#24192E"/>
          <!-- Stylized Mexico/Sinaloa coast outline -->
          <path d="M36,24 L118,24 L156,64 L224,96 L252,140 L146,140 L94,88 L36,48 Z" fill="#463259" stroke="#C4B5FD" stroke-width="2"/>
          <text x="108" y="114" text-anchor="middle" fill="#DDD6FE" font-size="11" font-weight="900" letter-spacing="1">SINALOA</text>
          <!-- Target reticle in Sinaloa -->
          <circle cx="102" cy="60" r="17" fill="none" stroke="#F87171" stroke-width="2.5"/>
          <circle cx="102" cy="60" r="4.5" fill="#F87171"/>
          <line x1="79" y1="60" x2="125" y2="60" stroke="#F87171" stroke-width="2"/>
          <line x1="102" y1="37" x2="102" y2="83" stroke="#F87171" stroke-width="2"/>
          <!-- Spotlight beam + helicopter -->
          <polygon points="222,38 112,126 170,126" fill="#FDE68A" opacity="0.22"/>
          <rect x="208" y="26" width="38" height="14" rx="6" fill="#E2E8F0"/>
          <line x1="196" y1="22" x2="258" y2="22" stroke="#E2E8F0" stroke-width="3"/>
          <rect x="172" y="76" width="134" height="40" rx="4" fill="#141A23" opacity="0.92" stroke="#C4B5FD" stroke-width="1.5"/>
          <text x="239" y="93" text-anchor="middle" fill="#FDE68A" font-size="11.5" font-weight="900">GUASAVE RAID</text>
          <text x="239" y="108" text-anchor="middle" fill="#FFF" font-size="10.5" font-weight="700">FBI TOP-10 FUGITIVE</text>
        </svg>
      </div>
      <div class="card-body">
        <h2>Cartel Boss Seized in Sinaloa</h2>
        <p>"El Chapo Isidro" captured in raid; retaliatory clashes kill 11+.</p>
      </div>
    </article>

    <!-- CYCLONE AKVAN INDIA -->
    <article class="card">
      <div class="card-art">
        <span class="tag tag-asia">South Asia · India</span>
        <svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="140" fill="#13384A"/>
          <!-- East India coast (Odisha / Andhra Pradesh) -->
          <path d="M0,0 L165,0 L145,45 L118,90 L108,140 L0,140 Z" fill="#3B5D4F" stroke="#A7F3D0" stroke-width="2"/>
          <text x="58" y="68" text-anchor="middle" fill="#ECFDF5" font-size="12" font-weight="900">ODISHA</text>
          <text x="54" y="112" text-anchor="middle" fill="#ECFDF5" font-size="11" font-weight="800">ANDHRA</text>
          <!-- Cyclone spiral -->
          <g transform="translate(204, 72)">
            <circle r="50" fill="none" stroke="#38BDF8" stroke-width="3" stroke-dasharray="28,12" opacity="0.7"/>
            <circle r="35" fill="none" stroke="#7DD3FC" stroke-width="4" stroke-dasharray="22,10"/>
            <circle r="20" fill="none" stroke="#BAE6FD" stroke-width="4" stroke-dasharray="14,7"/>
            <circle r="7.5" fill="#F4EFE4" stroke="#0284C7" stroke-width="2.5"/>
          </g>
          <path d="M204,72 L138,58" stroke="#F87171" stroke-width="3" stroke-dasharray="5,3"/>
          <polygon points="134,57 144,53 142,63" fill="#F87171"/>
        </svg>
      </div>
      <div class="card-body">
        <h2>Cyclone Akvan Hits East India</h2>
        <p>Storm weakens after Odisha landfall; hundreds of thousands evacuated.</p>
      </div>
    </article>

    <!-- UN KILLER ROBOTS + BITCOIN -->
    <article class="card">
      <div class="card-art">
        <span class="tag tag-global">Geneva &amp; Markets</span>
        <svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="160" height="140" fill="#232B38"/>
          <rect x="160" y="0" width="160" height="140" fill="#132A22"/>
          <line x1="160" y1="0" x2="160" y2="140" stroke="#F4EFE4" stroke-width="2"/>
          <!-- Left: Autonomous drone + No Treaty -->
          <circle cx="80" cy="68" r="32" fill="#1E293B" stroke="#94A3B8" stroke-width="2"/>
          <rect x="64" y="58" width="32" height="16" rx="4" fill="#CBD5E1"/>
          <circle cx="74" cy="66" r="3" fill="#EF4444"/>
          <circle cx="86" cy="66" r="3" fill="#EF4444"/>
          <line x1="54" y1="52" x2="106" y2="52" stroke="#CBD5E1" stroke-width="3"/>
          <rect x="24" y="108" width="112" height="22" rx="3" fill="#B82921"/>
          <text x="80" y="123" text-anchor="middle" fill="#FFF" font-size="10.5" font-weight="900">NO TREATY · 2028</text>
          <!-- Right: BTC Rebound chart -->
          <text x="240" y="34" text-anchor="middle" fill="#FACC15" font-size="14" font-weight="900">BTC $60,200+</text>
          <polyline points="178,100 200,108 220,94 245,80 268,60 298,48" fill="none" stroke="#22C55E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="298" cy="48" r="4.5" fill="#22C55E"/>
          <text x="240" y="123" text-anchor="middle" fill="#86EFAC" font-size="10.5" font-weight="800">CRYPTO REBOUNDS</text>
        </svg>
      </div>
      <div class="card-body">
        <h2>AI Arms Stall · BTC Tops $60K</h2>
        <p>UN delays killer-robot pact to 2028; Bitcoin rebounds past $60,200.</p>
      </div>
    </article>
  </section>

  <footer class="footer">
    <span>Dateline: Saturday, 21 November 2026</span>
    <span>Antalya · Shenzhen · Gulf of Finland · Riyadh · Sinaloa · Odisha · Geneva</span>
  </footer>
</div>
</body>
</html>
`;

writeFileSync(HTML_PATH, html, 'utf8');

const browserCandidates = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const browser = browserCandidates.find((p) => existsSync(p));
if (!browser) {
  throw new Error('No Chromium/Edge binary found to render poster.html');
}

const fileUrl = 'file:///' + HTML_PATH.replace(/\\/g, '/');
execFileSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--window-size=1024,1024',
  `--screenshot=${PNG_PATH}`,
  fileUrl,
], { stdio: 'inherit' });

const stat = statSync(PNG_PATH);
const header = readFileSync(PNG_PATH).subarray(0, 24);
const w = header.readUInt32BE(16);
const h = header.readUInt32BE(20);
console.log(`Rendered ${PNG_PATH}: ${w}x${h}, ${stat.size} bytes`);
if (w !== 1024 || h !== 1024 || stat.size > 1048576) {
  throw new Error(`Invalid dimensions or size: ${w}x${h}, ${stat.size} bytes`);
}
