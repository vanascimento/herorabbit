import mainCSS from '@/entryPoints/main.css?inline';
import contentCSS from '@/components/content/content.css?inline';

/**
 * Create a shadow root for the element and apply tailwind css styles.
 * @param element The element to apply the shadow root.
 * @returns The shadow root created.
 */
export const GetTailwindBackStyles = (element: HTMLElement) => {
  const shadowRoot = element.attachShadow({ mode: 'open' });
  shadowRoot.adoptedStyleSheets = [];

  // Use tailwind css only for this specific component.
  // This is to avoid conflicts with the main app styles of rabbitmq management plugin.
  if ('adoptedStyleSheets' in Document.prototype) {
    [mainCSS, contentCSS].forEach((styleSheetContent) => {
      const styleSheet = new CSSStyleSheet();
      styleSheet.replaceSync(styleSheetContent);
      shadowRoot.adoptedStyleSheets.push(styleSheet);
    });
  } else {
    // Fallback: Use <style> tags for older browsers
    [mainCSS, contentCSS].forEach((styleSheetContent) => {
      const styleElement = document.createElement('style');
      styleElement.textContent = styleSheetContent;
      shadowRoot.appendChild(styleElement);
    });
  }

  return shadowRoot;
};
