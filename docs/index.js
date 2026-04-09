(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const sun = { "morning": "oklch(85% 0.12 85)", "noon": "oklch(95% 0.08 95)", "sunset": "oklch(65% 0.18 35)", "nadir": "oklch(15% 0.05 270)" };
const palette = {
  sun
};
const __lassScriptExpression = (v, indent = "") => {
  if (v == null || v === false) return "";
  if (Array.isArray(v)) {
    const a = v.flat(Infinity).map((x) => x == null || x === false ? "" : String(x)).filter((x) => x);
    const sep = a.some((x) => x.includes("\n")) ? "\n" : " ";
    return a.join(sep);
  }
  const s = String(v);
  if (!indent || !s.includes("\n")) return s;
  return s.split("\n").map((l, i) => i === 0 ? l : indent + l).join("\n");
};
`
/* Declare layer order - layers listed first have lower priority */
@layer reset, base, layout, components;

:root {
  ${__lassScriptExpression(Object.entries(palette.sun).map(([name, value]) => `--sun-${__lassScriptExpression(name)}: ${__lassScriptExpression(value)};`), "  ")}

  /* Semantic tokens — light mode (default) */
  --color-bg: oklch(99% 0.005 95);
  --color-text: oklch(20% 0.02 270);
  --color-text-muted: oklch(45% 0.02 270);
  --color-accent: var(--sun-sunset);
  --color-surface: oklch(97% 0.01 95);
  --color-border: oklch(88% 0.02 95);
  --color-code-bg: oklch(98% 0.005 95);
  --color-code-border: oklch(88% 0.02 95);

  /* Spacing scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;

  /* Typography */
  --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'SF Mono', 'Cascadia Code', 'Fira Code', monospace;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --font-size-hero: clamp(2.5rem, 5vw, 4rem);

  /* Layout */
  --content-width: 72rem;
  --content-padding: var(--space-lg);
}

/* Dark mode — override semantic tokens for dark backgrounds */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: oklch(16% 0.02 270);
    --color-text: oklch(90% 0.01 95);
    --color-text-muted: oklch(65% 0.02 270);
    --color-accent: var(--sun-morning);
    --color-surface: oklch(20% 0.02 270);
    --color-border: oklch(30% 0.02 270);
    --color-code-bg: oklch(18% 0.02 270);
    --color-code-border: oklch(28% 0.02 270);
  }
}
`;
