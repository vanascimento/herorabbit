import Popup from '@/components/popup';
import renderRoot from '@/entryPoints/render/render-root.tsx';
import '@/entryPoints/main.css';

// Renders popup.html
const element = document.getElementById('popup-root')!;
renderRoot(element, <Popup />);
