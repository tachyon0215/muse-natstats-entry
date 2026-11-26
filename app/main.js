// Nippon in Numbers — router and control wiring. Hash routes keep every page
// reachable by a link and usable from a single static file set, offline.

import { barChart, lineChart, shareChart } from "./charts.js";
import { HOUSEHOLD_SPENDING_2024, INDICATORS, POPULATION_TREND, PREFECTURES, VITALS } from "./data.js";
import {
  aboutView, economyView, explorerView, indicatorStats, labourView,
  overviewView, populationView, prefectureRows, regionsView,
} from "./views.js";

const app = document.getElementById("app");
const fmtInt = v => String(Math.round(v));

function wireOverview() {
  const draw = from => lineChart(document.getElementById("pop-chart"),
    POPULATION_TREND.filter(p => from === "all" || p.year >= Number(from)), v => `${Math.round(v)}m`);
  draw("all");
  document.querySelectorAll("[data-range]").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-range]").forEach(b => b.classList.toggle("on", b === btn));
    draw(btn.dataset.range);
  }));
}

function wirePopulation() {
  const draw = key => barChart(document.getElementById("vitals-chart"),
    VITALS.map(v => ({ year: v.year, value: v[key] })), v => fmtInt(v / 1000) + "k");
  draw("births");
  document.querySelectorAll("[data-vital]").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-vital]").forEach(b => b.classList.toggle("on", b === btn));
    draw(btn.dataset.vital);
  }));
}

function wireEconomy() {
  lineChart(document.getElementById("gdp-chart"), INDICATORS.gdp.series, v => `¥${Math.round(v)}T`);
  lineChart(document.getElementById("cpi-chart"), INDICATORS.cpi.series, v => `${v.toFixed(1)}%`);
  shareChart(document.getElementById("spend-chart"), HOUSEHOLD_SPENDING_2024);
}

function wireLabour() {
  lineChart(document.getElementById("unemp-chart"), INDICATORS.unemployment.series, v => `${v.toFixed(1)}%`);
}

function wireRegions() {
  const tbody = document.querySelector("#pref-table tbody");
  const count = document.getElementById("pref-count");
  const render = () => {
    const q = document.getElementById("pref-search").value.trim().toLowerCase();
    const region = document.getElementById("pref-region").value;
    const sort = document.getElementById("pref-sort").value;
    const dir = document.getElementById("pref-order").value === "asc" ? 1 : -1;
    const list = PREFECTURES
      .filter(p => (region === "All regions" || p.region === region) && p.name.toLowerCase().includes(q))
      .sort((a, b) => sort === "name" ? dir * a.name.localeCompare(b.name) : dir * (a[sort] - b[sort]));
    tbody.innerHTML = prefectureRows(list) || `<tr><td colspan="5">No prefecture matches that search.</td></tr>`;
    count.textContent = `Showing ${list.length} of 47 prefectures.`;
  };
  ["pref-search", "pref-region", "pref-sort", "pref-order"].forEach(id =>
    document.getElementById(id).addEventListener("input", render));
  render();
}

function wireExplorer() {
  let type = "line";
  const draw = () => {
    const key = document.getElementById("ind-select").value;
    const st = indicatorStats(key);
    const drawFn = type === "line" ? lineChart : barChart;
    drawFn(document.getElementById("ind-chart"), st.ind.series, v => fmtInt(v));
    document.querySelector("#ind-stats tbody").innerHTML = `
      <tr><td>First value (${st.first.year})</td><td>${fmtInt(st.first.value)} ${st.ind.unit}</td></tr>
      <tr><td>Latest value (${st.last.year})</td><td>${fmtInt(st.last.value)} ${st.ind.unit}</td></tr>
      <tr><td>Highest</td><td>${fmtInt(st.hi.value)} in ${st.hi.year}</td></tr>
      <tr><td>Lowest</td><td>${fmtInt(st.lo.value)} in ${st.lo.year}</td></tr>
      <tr><td>Change, first to latest</td><td>${st.change > 0 ? "+" : ""}${fmtInt(st.change)} (${st.pct}%)</td></tr>`;
    document.getElementById("ind-source").textContent = `Source: ${st.ind.source}.`;
  };
  document.getElementById("ind-select").addEventListener("input", draw);
  document.querySelectorAll("[data-ctype]").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-ctype]").forEach(b => b.classList.toggle("on", b === btn));
    type = btn.dataset.ctype; draw();
  }));
  draw();
}

function wireAbout() {
  const grid = document.getElementById("gloss-grid");
  const count = document.getElementById("gloss-count");
  const cards = [...grid.children];
  document.getElementById("gloss-search").addEventListener("input", e => {
    const q = e.target.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach(c => {
      const hit = c.textContent.toLowerCase().includes(q);
      c.style.display = hit ? "" : "none"; if (hit) shown++;
    });
    count.textContent = q ? `${shown} of ${cards.length} terms match.` : "";
  });
}

const ROUTES = {
  "/": [overviewView, wireOverview],
  "/population": [populationView, wirePopulation],
  "/economy": [economyView, wireEconomy],
  "/labour": [labourView, wireLabour],
  "/regions": [regionsView, wireRegions],
  "/explorer": [explorerView, wireExplorer],
  "/about": [aboutView, wireAbout],
};

function render() {
  const path = location.hash.replace(/^#/, "") || "/";
  const [view, wire] = ROUTES[path] || ROUTES["/"];
  app.innerHTML = view();
  document.querySelectorAll("nav a").forEach(a =>
    a.classList.toggle("on", a.getAttribute("href") === `#${path}`));
  wire();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
window.addEventListener("resize", () => render());
render();
