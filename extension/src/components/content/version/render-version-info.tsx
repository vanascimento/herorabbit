import { GetTailwindBackStyles } from '@/lib/tailwind-custom';
import { waitForElement } from '@/lib/wait-for-element';
import { createRoot } from 'react-dom/client';

export const VERSION_ELEMENT_ID = 'version-info';

export async function renderVersionInfo() {
  waitForElement('#main', async (_) => {
    let existingElement = document.getElementById(VERSION_ELEMENT_ID);
    if (existingElement) {
      return;
    }

    const latestReleaseRequest = await fetch('https://api.github.com/repos/vanascimento/herorabbit/releases/latest');
    let latestVersion = (await latestReleaseRequest.json())['tag_name'];
    const latestVersionWithoutV = latestVersion.replace('v', '');
    const root = document.createElement('div');
    root.id = VERSION_ELEMENT_ID;
    const container = document.getElementById('logo')!;
    let version = chrome.runtime.getManifest().version;

    container.appendChild(root);

    const shadowRoot = GetTailwindBackStyles(root);

    const componentToRender =
      latestVersionWithoutV == version ? (
        <></>
      ) : (
        <span className=" ext-text-xs  ext-bg-orange-500 ext-text-white ext-p-1 ext-rounded-md">
          Hero Rabbit alert! Your version is {version}, latest is {latestVersionWithoutV}
        </span>
      );

    createRoot(shadowRoot).render(componentToRender);
  });
  console.info('Queue dashboard rendered');
}
