export function track(name, props = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("hcc:analytics", {
      detail: { name, props, at: new Date().toISOString() },
    }),
  );
}
