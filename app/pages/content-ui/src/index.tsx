import { createRoot } from 'react-dom/client';
import App from '@src/App';
import { QueueOverviewChart } from '@src/QueueOverviewChart';
// @ts-expect-error Because file doesn't exist before build
import tailwindcssOutput from '../dist/tailwind-output.css?inline';
import { waitForElement } from '@src/utils/wait-for-element';

waitForElement('#main', mainDiv => {
  const root = document.createElement('div');
  root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';
  const container = document.getElementById('main');
  if (container) {
    const secondChild = container?.children[1];
    container.insertBefore(root, secondChild!);
  }
  //document.body.append(root);

  const rootIntoShadow = document.createElement('div');
  rootIntoShadow.id = 'shadow-root';

  const shadowRoot = root.attachShadow({ mode: 'open' });

  const globalStyleSheet = new CSSStyleSheet();
  globalStyleSheet.replaceSync(tailwindcssOutput);
  shadowRoot.adoptedStyleSheets = [globalStyleSheet];

  shadowRoot.appendChild(rootIntoShadow);
  createRoot(rootIntoShadow).render(<QueueOverviewChart />);
});
