import * as fs from 'node:fs';
import * as path from 'node:path';

// https://github.com/crxjs/chrome-extension-tools/issues/918#issuecomment-2417036333
export const fixViteContentScript = () => {
  const manifestPath = path.resolve('dist/manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  const webAccessibleResources = manifest.web_accessible_resources;

  manifest.web_accessible_resources = webAccessibleResources.map((resource) => {
    if (resource.use_dynamic_url) {
      return {
        ...resource,
        use_dynamic_url: false,
      };
    }
    return resource;
  });

  const json = JSON.stringify(manifest, null, 2);
  fs.writeFileSync(manifestPath, json, 'utf8');
};
