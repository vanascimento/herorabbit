export const GetTailwindBackStyles = (root: HTMLElement) => {
  const shadowRoot = root.attachShadow({ mode: 'open' });
  return shadowRoot;
};
