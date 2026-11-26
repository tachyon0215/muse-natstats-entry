// Nippon in Numbers — canvas chart helpers (line, bar and share charts).
// Everything is drawn from the site's own data files; no network is used.

const INK = "#1d2733", GRID = "#d8dee6", ACCENT = "#b03a2e", BLUE = "#205f8f";

function setup(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = "11px system-ui, sans-serif";
  return { ctx, w, h };
}

function bounds(series) {
  const vals = series.map(p => p.value);
  let min = Math.min(...vals), max = Math.max(...vals);
  if (min > 0) min = Math.min(0, min);
  const pad = (max - min) * 0.12 || 1;
  return { min: min - (min < 0 ? pad : 0), max: max + pad };
}

function axes(ctx, w, h, b, fmt) {
  const L = 52, R = 8, T = 8, B = 22;
  ctx.strokeStyle = GRID; ctx.fillStyle = INK; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const v = b.min + (b.max - b.min) * i / 4;
    const y = T + (h - T - B) * (1 - i / 4);
    ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(w - R, y); ctx.stroke();
    ctx.textAlign = "right"; ctx.fillText(fmt(v), L - 6, y + 4);
  }
  return { L, R, T, B };
}

export function lineChart(canvas, series, fmt = v => String(Math.round(v))) {
  if (!canvas || !series.length) return;
  const { ctx, w, h } = setup(canvas);
  const b = bounds(series);
  const { L, R, T, B } = axes(ctx, w, h, b, fmt);
  const x = i => L + (w - L - R) * i / (series.length - 1);
  const y = v => T + (h - T - B) * (1 - (v - b.min) / (b.max - b.min));
  ctx.strokeStyle = ACCENT; ctx.lineWidth = 2.5; ctx.beginPath();
  series.forEach((p, i) => i ? ctx.lineTo(x(i), y(p.value)) : ctx.moveTo(x(i), y(p.value)));
  ctx.stroke();
  ctx.fillStyle = ACCENT;
  series.forEach((p, i) => { ctx.beginPath(); ctx.arc(x(i), y(p.value), 3, 0, 7); ctx.fill(); });
  ctx.fillStyle = INK; ctx.textAlign = "center";
  series.forEach((p, i) => { if (i % Math.ceil(series.length / 6) === 0 || i === series.length - 1) ctx.fillText(String(p.year), x(i), h - 6); });
}

export function barChart(canvas, series, fmt = v => String(Math.round(v))) {
  if (!canvas || !series.length) return;
  const { ctx, w, h } = setup(canvas);
  const b = bounds(series);
  const { L, R, T, B } = axes(ctx, w, h, b, fmt);
  const slot = (w - L - R) / series.length;
  const y0 = T + (h - T - B) * (1 - (0 - b.min) / (b.max - b.min));
  ctx.fillStyle = BLUE;
  series.forEach((p, i) => {
    const yv = T + (h - T - B) * (1 - (p.value - b.min) / (b.max - b.min));
    ctx.fillRect(L + slot * i + 2, Math.min(yv, y0), slot - 4, Math.abs(y0 - yv));
  });
  ctx.fillStyle = INK; ctx.textAlign = "center";
  series.forEach((p, i) => { if (i % Math.ceil(series.length / 6) === 0 || i === series.length - 1) ctx.fillText(String(p.year), L + slot * (i + 0.5), h - 6); });
}

export function shareChart(canvas, parts) {
  // Horizontal stacked share bar with a legend drawn under it.
  if (!canvas || !parts.length) return;
  const { ctx, w, h } = setup(canvas);
  const colours = ["#205f8f", "#b03a2e", "#2e7d5b", "#c07a1a", "#5b4a8a", "#39737c", "#8a5a2e", "#666f7a", "#a03a6e", "#31572c"];
  const total = parts.reduce((s, p) => s + p.share, 0);
  let x = 0;
  parts.forEach((p, i) => {
    const pw = w * p.share / total;
    ctx.fillStyle = colours[i % colours.length];
    ctx.fillRect(x, 6, Math.max(pw - 1, 1), 30);
    x += pw;
  });
  ctx.fillStyle = INK; ctx.textAlign = "left";
  parts.forEach((p, i) => {
    const ly = 58 + i * 16;
    if (ly > h - 4) return;
    ctx.fillStyle = colours[i % colours.length]; ctx.fillRect(0, ly - 9, 10, 10);
    ctx.fillStyle = INK; ctx.fillText(`${p.label} — ${p.share}%`, 16, ly);
  });
}
