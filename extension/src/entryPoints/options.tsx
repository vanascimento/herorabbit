import Options from '@/components/options';
import renderRoot from '@/entryPoints/render/render-root.tsx';
import '@/entryPoints/main.css';

// Renders options.html
const element = document.getElementById('options-root')!;
renderRoot(element, <Options />);
