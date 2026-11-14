// Full, static Tailwind class strings only — Tailwind cannot compile class names
// built at runtime (e.g. `bg-[${color}]`), so every look ships complete classes.
export const COLOR_MAP: Record<
  "brown",
  { solid: string; outline: string; bgClass: string }
> = {
  brown: {
    // Solid: black background + white text (always readable)
    solid:
      "border-transparent bg-black text-white hover:bg-neutral-800 hover:text-white",
    // Outline: white background + black border + black text
    outline:
      "border-black bg-white text-black hover:bg-neutral-100 hover:text-black dark:border-black dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:text-black",
    bgClass: "data-[state=active]:bg-black",
  },
};