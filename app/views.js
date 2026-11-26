// Nippon in Numbers — page views. Each view returns HTML for one route;
// main.js wires the controls after the HTML is in the page.

import {
  AGE_GROUPS_2024, GLOSSARY, HEADLINES, HOUSEHOLD_SPENDING_2024,
  INDICATORS, LIFE_EXPECTANCY, POPULATION_TREND, PREFECTURES, VITALS,
} from "./data.js";

const num = n => n.toLocaleString("en-GB");

export function overviewView() {
  const cards = HEADLINES.map(hd => `
    <article class="card"><h3>${hd.label}</h3><p class="big">${hd.value}</p><p>${hd.note}</p></article>`).join("");
  return `
  <section class="hero">
    <h2>Japan, counted.</h2>
    <p class="lede">The official numbers of a country of 123.8 million people — population, births and
    deaths, prices, jobs, incomes and all 47 prefectures — gathered in one place, each figure with
    its source and year. Start with the headlines, then dig into any section.</p>
  </section>
  <section class="grid" aria-label="Headline statistics">${cards}</section>
  <section class="panel">
    <div class="panel-head"><h3>Total population, 1970–2024</h3>
      <div class="seg" role="group" aria-label="Chart range">
        <button data-range="all" class="on">All years</button><button data-range="1990">Since 1990</button><button data-range="2010">Since 2010</button>
      </div></div>
    <canvas id="pop-chart" class="chart" height="240" aria-label="Line chart of Japan's population"></canvas>
    <p class="src">Source: Population Census (to 2020) and Population Estimates (2024), Statistics Bureau of Japan. Population peaked at 128.06 million in 2010.</p>
  </section>
  <section class="grid links">
    <a class="card link" href="#/population"><h3>Population &amp; families →</h3><p>Age groups, births, deaths, marriages and the falling fertility rate.</p></a>
    <a class="card link" href="#/economy"><h3>Economy &amp; prices →</h3><p>GDP of ¥609 trillion, consumer prices and what households actually spend on.</p></a>
    <a class="card link" href="#/labour"><h3>Work &amp; life →</h3><p>Unemployment at 2.5%, a labour force of 69.57 million, life expectancy of 87 years for women.</p></a>
    <a class="card link" href="#/regions"><h3>All 47 prefectures →</h3><p>Search, filter by region and sort every prefecture by population, area or density.</p></a>
    <a class="card link" href="#/explorer"><h3>Indicator explorer →</h3><p>Pick a series, switch between line and bar charts, and read its key facts.</p></a>
    <a class="card link" href="#/about"><h3>About the numbers →</h3><p>Where each figure comes from, what the terms mean, and how the surveys are run.</p></a>
  </section>`;
}

export function populationView() {
  const rows = VITALS.map(v => `<tr><td>${v.year}</td><td>${num(v.births)}</td><td>${num(v.deaths)}</td><td>${num(v.deaths - v.births)}</td><td>${num(v.marriages)}</td></tr>`).join("");
  const ages = AGE_GROUPS_2024.map(a => `<tr><td>${a.label}</td><td>${a.value.toFixed(2)} million</td><td>${a.share}%</td></tr>`).join("");
  return `
  <h2>Population &amp; families</h2>
  <p class="lede">Japan's population has fallen every year since 2011. In 2024 there were 720,988 births
  against 1,618,426 deaths — a natural decrease of almost 900,000 people in a single year.</p>
  <section class="panel"><h3>Births and deaths by year</h3>
    <canvas id="vitals-chart" class="chart" height="240" aria-label="Bar chart of yearly births"></canvas>
    <div class="seg" role="group" aria-label="Which vital statistic">
      <button data-vital="births" class="on">Births</button><button data-vital="deaths">Deaths</button><button data-vital="marriages">Marriages</button>
    </div>
    <p class="src">Source: Vital Statistics, Ministry of Health, Labour and Welfare.</p></section>
  <section class="panel"><h3>Who lives in Japan — age groups, October 2024</h3>
    <table><thead><tr><th>Age group</th><th>People</th><th>Share</th></tr></thead><tbody>${ages}</tbody></table>
    <p class="src">Source: Population Estimates, Statistics Bureau of Japan. One person in three is 60 or over; the median age is about 49.</p></section>
  <section class="panel"><h3>Births, deaths and marriages</h3>
    <table><thead><tr><th>Year</th><th>Births</th><th>Deaths</th><th>Deaths minus births</th><th>Marriages</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="src">The total fertility rate was 1.20 children per woman in 2023 and 1.15 in 2024 — far below the 2.07 needed to hold the population steady.</p></section>`;
}

export function economyView() {
  return `
  <h2>Economy &amp; prices</h2>
  <p class="lede">Nominal GDP reached about ¥609 trillion in 2024. After three decades of near-zero
  inflation, consumer prices have risen more than 2% a year since 2022.</p>
  <section class="panel"><h3>Nominal GDP, trillion yen</h3>
    <canvas id="gdp-chart" class="chart" height="240" aria-label="Chart of nominal GDP"></canvas>
    <p class="src">Source: National Accounts, Cabinet Office (rounded to the nearest trillion yen).</p></section>
  <section class="panel"><h3>Consumer prices, annual change %</h3>
    <canvas id="cpi-chart" class="chart" height="240" aria-label="Chart of consumer price inflation"></canvas>
    <p class="src">Source: Consumer Price Index, Statistics Bureau of Japan. The Bank of Japan's 2% target was met for a third straight year in 2024.</p></section>
  <section class="panel"><h3>What households spend on — 2024</h3>
    <canvas id="spend-chart" class="chart tall" height="220" aria-label="Share chart of household spending"></canvas>
    <p class="src">Shares of the average monthly spending of ¥300,243 by households of two or more people. Source: Family Income and Expenditure Survey (rounded shares).</p></section>`;
}

export function labourView() {
  const le = LIFE_EXPECTANCY.map(r => `<tr><td>${r.year}</td><td>${r.men.toFixed(2)}</td><td>${r.women.toFixed(2)}</td></tr>`).join("");
  return `
  <h2>Work &amp; life</h2>
  <p class="lede">Japan works: 67.81 million people were employed in 2024 and unemployment averaged 2.5%.
  People also live long — a girl born in 2023 can expect 87.1 years.</p>
  <section class="panel"><h3>Unemployment rate, %</h3>
    <canvas id="unemp-chart" class="chart" height="240" aria-label="Chart of the unemployment rate"></canvas>
    <p class="src">Source: Labour Force Survey, annual averages, Statistics Bureau of Japan.</p></section>
  <section class="panel"><h3>Life expectancy at birth, years</h3>
    <table><thead><tr><th>Year</th><th>Men</th><th>Women</th></tr></thead><tbody>${le}</tbody></table>
    <p class="src">Source: Abridged Life Tables, Ministry of Health, Labour and Welfare. Healthy life expectancy in 2022 was 72.6 years for men and 75.5 for women.</p></section>
  <section class="panel"><h3>The working picture, 2024</h3>
    <table><tbody>
      <tr><td>Labour force</td><td>69.57 million</td></tr>
      <tr><td>Employed</td><td>67.81 million</td></tr>
      <tr><td>Unemployed</td><td>1.76 million</td></tr>
      <tr><td>Employment rate, ages 15–64</td><td>79.0%</td></tr>
      <tr><td>Women in the labour force</td><td>31.44 million — a record high</td></tr>
      <tr><td>Non-regular employees</td><td>About 37% of all employees</td></tr>
    </tbody></table>
    <p class="src">Source: Labour Force Survey, annual averages 2024, Statistics Bureau of Japan.</p></section>`;
}

export function regionsView() {
  const regions = ["All regions", ...new Set(PREFECTURES.map(p => p.region))];
  const opts = regions.map(r => `<option>${r}</option>`).join("");
  return `
  <h2>All 47 prefectures</h2>
  <p class="lede">Population from the 2020 Census, land area, and the density that follows from the two.
  Tokyo holds 14.0 million people in 2,194 km²; Hokkaido is 38 times larger with a third as many people.</p>
  <section class="panel">
    <div class="controls">
      <label>Search <input id="pref-search" type="search" placeholder="e.g. Kyoto" autocomplete="off"></label>
      <label>Region <select id="pref-region">${opts}</select></label>
      <label>Sort by <select id="pref-sort">
        <option value="population">Population</option><option value="area">Area</option>
        <option value="density">Density</option><option value="name">Name</option></select></label>
      <label>Order <select id="pref-order"><option value="desc">Largest first</option><option value="asc">Smallest first</option></select></label>
    </div>
    <p id="pref-count" class="src" role="status"></p>
    <table id="pref-table"><thead><tr><th>Prefecture</th><th>Region</th><th>Population (2020)</th><th>Area (km²)</th><th>People per km²</th></tr></thead><tbody></tbody></table>
    <p class="src">Source: 2020 Population Census and Geospatial Information Authority area figures (rounded).</p></section>`;
}

export function explorerView() {
  const opts = Object.entries(INDICATORS).map(([k, v]) => `<option value="${k}">${v.title}</option>`).join("");
  return `
  <h2>Indicator explorer</h2>
  <p class="lede">Choose any headline series and see it as a line or a bar chart, with the facts that
  describe it: its first and latest values, its high and low, and how much it has changed.</p>
  <section class="panel">
    <div class="controls">
      <label>Indicator <select id="ind-select">${opts}</select></label>
      <div class="seg" role="group" aria-label="Chart type">
        <button data-ctype="line" class="on">Line</button><button data-ctype="bar">Bars</button>
      </div>
    </div>
    <canvas id="ind-chart" class="chart" height="260" aria-label="Chart of the chosen indicator"></canvas>
    <table id="ind-stats"><tbody></tbody></table>
    <p class="src" id="ind-source"></p></section>`;
}

export function aboutView() {
  const gl = GLOSSARY.map(g => `<article class="card gloss"><h3>${g.term}</h3><p>${g.text}</p></article>`).join("");
  return `
  <h2>About the numbers</h2>
  <p class="lede">Every figure on this site comes from a published Japanese official source. The census
  counts everyone; the monthly surveys sample households and businesses and are revised as fuller data arrives.</p>
  <section class="panel"><h3>Main sources</h3><table><tbody>
    <tr><td>Population Census &amp; Estimates</td><td>Statistics Bureau of Japan — population, households, age structure.</td></tr>
    <tr><td>Vital Statistics</td><td>Ministry of Health, Labour and Welfare — births, deaths, marriages, life tables.</td></tr>
    <tr><td>National Accounts</td><td>Cabinet Office — GDP and its components.</td></tr>
    <tr><td>Consumer Price Index</td><td>Statistics Bureau — prices of a fixed basket, base year 2020 = 100.</td></tr>
    <tr><td>Labour Force Survey</td><td>Statistics Bureau — employment and unemployment, about 40,000 households sampled.</td></tr>
    <tr><td>Family Income &amp; Expenditure Survey</td><td>Statistics Bureau — what households earn and spend.</td></tr>
  </tbody></table></section>
  <section class="panel"><h3>Find a term</h3>
    <div class="controls"><label>Search the glossary <input id="gloss-search" type="search" placeholder="e.g. fertility" autocomplete="off"></label></div>
    <div class="grid" id="gloss-grid">${gl}</div>
    <p class="src" id="gloss-count" role="status"></p></section>`;
}

export function prefectureRows(list) {
  return list.map(p => `<tr><td>${p.name}</td><td>${p.region}</td><td>${num(p.population)}</td><td>${num(p.area)}</td><td>${num(p.density)}</td></tr>`).join("");
}

export function indicatorStats(key) {
  const ind = INDICATORS[key];
  const s = ind.series, first = s[0], last = s[s.length - 1];
  const hi = s.reduce((a, b) => b.value > a.value ? b : a);
  const lo = s.reduce((a, b) => b.value < a.value ? b : a);
  const change = last.value - first.value;
  const pct = first.value !== 0 ? (change / Math.abs(first.value) * 100).toFixed(1) : "—";
  return { ind, first, last, hi, lo, change, pct };
}

export { POPULATION_TREND };
