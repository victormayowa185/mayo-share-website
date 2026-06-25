export function initTheme() {
  const saved = localStorage.getItem("theme-mode") || "system";
  applyTheme(saved as any);
}

export function applyTheme(mode: "system" | "light" | "dark") {
  let themeToApply = mode;
  if (mode === "system") {
    themeToApply = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", themeToApply);
  localStorage.setItem("theme-mode", mode);
}

export function getTheme(): "system" | "light" | "dark" {
  return (localStorage.getItem("theme-mode") as any) || "system";
}