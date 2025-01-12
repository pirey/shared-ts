type ElementSelector = string;
export function scrollIntoTarget(
  target: HTMLElement | ElementSelector,
  options?: {
    container?: HTMLElement | ElementSelector;
    offset?: number;
  },
) {
  const targetElement =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target;

  const containerElement =
    typeof options?.container === "string"
      ? document.querySelector<HTMLElement>(options.container)
      : options?.container;

  if (!targetElement) {
    return;
  }

  const parent = containerElement ?? window;

  parent.scrollTo({
    behavior: "smooth",
    top:
      targetElement.getBoundingClientRect().top +
      window.scrollY -
      (options?.offset ?? 0),
  });
}
