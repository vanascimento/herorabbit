const fontList = import.meta.glob('@/assets/fonts/*/**/*.css', { eager: true, query: '?raw', import: 'default' });

// The font files path copied by viteStaticCopy in vite.config.ts > viteStaticCopy > "dest" > "assets/fonts"
// Make sure to include in public/manifest.json > web_accessible_resources > resources  > "assets/fonts/*"
const FONT_OUT_DIR = 'assets/fonts';

// Update font-face url to chrome.extension.getURL to get extension absolute path
function createFontFace(css: string) {
  const fontCss = css.replace(/url\(["']?(.*?)["']?\)/g, (_match: unknown, p1: string) => {
    // Wrap each found URL with chrome.runtime.getURL
    const fontFileName = p1.split('/').pop();
    const fontPath = `${FONT_OUT_DIR}/${fontFileName}`;
    return `url("${chrome?.runtime ? chrome.runtime.getURL(fontPath) : fontPath}")`;
  });

  const fontFaceStyle = document.createElement('style');
  fontFaceStyle.textContent = fontCss;
  return fontFaceStyle;
}

export function renderFonts() {
  Object.keys(fontList).forEach((fontKey) => {
    const cssContent = fontList[fontKey];
    if (typeof cssContent !== 'string') {
      return;
    }

    const fontFaceStyleElement = createFontFace(cssContent);
    document.head.appendChild(fontFaceStyleElement);
  });
}
