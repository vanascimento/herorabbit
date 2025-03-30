import { useRef, useState } from 'react';
import { ChevronsRight, CircleX, GithubIcon, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import CardSwitch from '@/components/ui/card-switch';
import NativeCard from '@/components/ui/native-card';
import { useSettings } from '@/hooks/useSettings.tsx';
import { MESSAGE_TYPES } from '@/lib/types.ts';
import SafeImage from '@/components/ui/safe-image';
import iconLight from '@/assets/images/icon-light.png';
import iconDark from '@/assets/images/icon-dark.png';
import icon from '@/assets/images/icon128.png';

export default function SidePanel() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { settings, setSettings } = useSettings();

  function handleClose() {
    const closeConfirmed = window.confirm('You can enable it again in settings.');
    if (closeConfirmed) {
      setSettings({ hide_sidebar_button: true });
    }
  }

  return (
    <>
      {!settings.hide_sidebar_button && (
        <div
          className={`${isOpen && 'ext-hidden'} ext-bg-background ext-text-foreground ext-shadow-lg ext-flex ext-items-center ext-group ext-fixed ext-right-0 ext-top-1/2 ext-border-secondary-2 ext-border-2 ext-rounded-l-full ext-px-2 ext-py-1 hover:ext-rounded-full`}
        >
          <button className="" onClick={() => setIsOpen(!isOpen)}>
            <SafeImage width={29} src={icon} />
          </button>
          <button className="ext-cursor-default ext-hidden group-hover:ext-block ext-pl-2" onClick={handleClose}>
            <CircleX className="ext-text-red-500" size={16} />
          </button>
        </div>
      )}

      {/* SIDEBAR */}
      <div
        ref={sidebarRef}
        className={`${isOpen ? 'ext-shadow-2xl' : '-ext-mr-72'}  ext-w-72 ext-p-4 ext-fixed ext-right-0 ext-top-0 ext-h-full ext-transform ext-transition-all ext-duration-200 ext-ease-in-out ext-bg-background ext-overflow-hidden ext-flex ext-rounded-l-2xl`}
      >
        <div className="ext-w-full ext-h-full ext-text-foreground ext-flex ext-flex-col ext-justify-between">
          {/* HEADER */}
          <div className="ext-flex ext-flex-row ext-justify-between ext-items-center">
            <div className="ext-flex">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => chrome?.runtime?.sendMessage({ type: MESSAGE_TYPES.OPEN_OPTIONS })}
              >
                <Settings size={12} />
              </Button>
            </div>
            <div className="ext-flex">
              <div className="ext-flex ext-flex-row ext-items-center">
                <SafeImage className="ext-pl-3" width={32} src={settings.theme === 'dark' ? iconLight : iconDark} />
                <p
                  className={`ext-text-center ext-text ext-ml-2 ext-font-black ${settings.theme === 'dark' ? 'ext-text-white' : 'ext-text-black'}`}
                >
                  Extension
                </p>
              </div>
            </div>
            <div className="ext-flex">
              <Button size="sm" variant="ghost" onClick={() => setIsOpen(!isOpen)}>
                <ChevronsRight size={12} />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="ext-flex ext-flex-col ext-gap-3 ext-flex-1 ext-overflow-y-auto ext-my-10">
            <CardSwitch
              title={'Dark Mode'}
              checked={settings.theme === 'dark'}
              onChecked={(checked: boolean) => setSettings({ theme: checked ? 'dark' : 'light' })}
              subtitle={'Switch between dark mode applied to all extension modules.'}
            />

            <NativeCard>
              <p className="ext-text-xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived not only five centuries.
              </p>
            </NativeCard>
          </div>

          {/* FOOTER */}
          <div className="ext-flex">
            <div className="ext-flex ext-flex-row ext-justify-between ext-items-center ext-w-full">
              <Button size="sm" variant="ghost">
                <GithubIcon size={16} />
              </Button>
              <Button></Button>
              <p className="ext-text-xs">Version 0.0.1</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
