export const toggleTheme = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add("dark");
    window.localStorage.setItem("color-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    window.localStorage.setItem("color-theme", "light");
  }
};
