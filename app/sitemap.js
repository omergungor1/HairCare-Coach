const routes = ["", "/privacy", "/terms", "/methodology", "/contact"];

export default function sitemap() {
  return routes.map((path) => ({
    url: `https://haircarecoach.app${path}`,
    lastModified: new Date("2026-10-17"),
    changeFrequency: path === "" ? "weekly" : "yearly",
    priority: path === "" ? 1 : 0.4,
  }));
}
