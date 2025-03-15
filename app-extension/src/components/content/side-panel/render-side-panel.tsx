import Content from '@/components/content';
import renderRoot from '@/entryPoints/render/render-root.tsx';

import mainCSS from '@/entryPoints/main.css?inline';
import contentCSS from '@/components/content/content.css?inline';

function createShadow() {
  // Inside content page html, will create a custom entry tag <ext-boilerplate-entry>
  const sidebarTagName = 'ext-boilerplate-entry';
  const sidebarElement = document.createElement(sidebarTagName);
  document.documentElement.appendChild(sidebarElement);

  const shadowRoot = sidebarElement.attachShadow({ mode: 'open' });
  shadowRoot.adoptedStyleSheets = [];

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
}
export function renderSidePanel() {
  renderRoot(createShadow(), <Content />);
}
