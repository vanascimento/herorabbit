import { GetTailwindBackStyles } from '@/lib/tailwind-custom';
import { waitForElement } from '@/lib/wait-for-element';
import { createRoot } from 'react-dom/client';

export const VERSION_ELEMENT_ID = 'version-info';

export async function renderVersionInfo() {
  try {
    await waitForElement('#main', async (_) => {
      let existingElement = document.getElementById(VERSION_ELEMENT_ID);
      if (existingElement) {
        return;
      }

      try {
        const latestReleaseRequest = await fetch(
          'https://api.github.com/repos/vanascimento/herorabbit/releases/latest',
        );
        const releaseData = await latestReleaseRequest.json();
        let latestVersion = releaseData['tag_name'] || '';
        const latestVersionWithoutV = latestVersion.replace('v', '');
        const root = document.createElement('div');
        root.id = VERSION_ELEMENT_ID;
        const container = document.getElementById('logo');

        if (!container) {
          console.error('Container element not found');
          return;
        }

        const existingVersionInfo = document.getElementById('version-info');
        if (existingVersionInfo) {
          console.info('Version info element already exists in the document');
          return;
        }

        let version = chrome.runtime.getManifest().version;

        container.appendChild(root);

        const shadowRoot = GetTailwindBackStyles(root);

        const componentToRender =
          latestVersionWithoutV == version ? (
            <></>
          ) : (
            <span id="version-info" className="ext-text-xs ext-bg-orange-500 ext-text-white ext-p-1 ext-rounded-md">
              Hero Rabbit alert! Your version is {version}, latest is {latestVersionWithoutV}
            </span>
          );

        createRoot(shadowRoot).render(componentToRender);
      } catch (error) {
        console.error('Error fetching version info:', error);
      }
    });
  } catch (error) {
    console.error('Error in renderVersionInfo:', error);
  }
  console.info('Queue dashboard rendered');
}
