import './options.css';
import { MessageCircleMore, PaintBucketIcon } from 'lucide-react';
import { Command, CommandItem, CommandList } from '@/components/ui/command.tsx';
import { useState } from 'react';

import { useSettings } from '@/hooks/useSettings.tsx';
import iconDark from '@/assets/images/icon-dark.png';
import iconLight from '@/assets/images/icon-light.png';
import SafeImage from '@/components/ui/safe-image';
import GeneralPageOption from './general-page';
import AppearancePageOption from './apperance-page';
import { Toaster } from '../ui/sonner';
import ContactMe from './contact-me';

type MenuItemTypes = 'General' | 'Appearance' | 'Contact';

export default function Options() {
  const { settings, setSettings } = useSettings();
  const [currentMenu, setCurrentMenu] = useState<MenuItemTypes>('Contact');
  const menuItemClass = 'ext-text-sm ext-py-2 ext-px-3 ext-rounded-sm ext-font-normal ext-mt-2 ext-cursor-pointer';

  function handleMenuClick(value: unknown) {
    setCurrentMenu(value as MenuItemTypes);
  }

  return (
    <div className="ext-w-full ext-h-svh ext-flex ext-flex-col ext-bg-background ext-text-foreground">
      <div className="ext-flex ext-w-[896px] ext-h-full ext-m-auto">
        <div className="ext-w-full ext-flex ext-flex-col ext-px-2">
          {/* HEADER */}
          <div className="ext-flex ext-flex-row ext-justify-between ext-py-7">
            <div className="ext-flex ext-flex-col ext-justify-start">
              <div className="ext-flex ext-flex-row ext-items-center ext-justify-center">
                <SafeImage className="ext-pr-3" width={45} src={settings.theme === 'dark' ? iconLight : iconDark} />
                <p
                  className={`ext-text-center  ext-justify-center ext-text-2xl ext-items-center  ext-font-black ${settings.theme === 'dark' ? 'ext-text-white' : 'ext-text-black'}`}
                >
                  Hero Rabbit
                </p>
              </div>

              <p className="ext-text-muted-foreground ext-mt-2">
                Improving your <span className="ext-text-orange-500 ">RabbitMQ</span>{' '}
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="ext-flex ext-flex-row ext-flex-1">
            {/* LEFT MENU */}
            <div className="ext-flex ext-w-56">
              <Command value={currentMenu}>
                <CommandList>
                  <CommandItem className={menuItemClass} value="Contact" onSelect={handleMenuClick}>
                    <MessageCircleMore /> <span>Contact Me</span>
                  </CommandItem>
                  <CommandItem className={menuItemClass} value="Appearance" onSelect={handleMenuClick}>
                    <PaintBucketIcon /> <span>Look and feel</span>
                  </CommandItem>
                </CommandList>
              </Command>
            </div>

            {/* RIGHT CONTENT */}
            <div className="ext-flex ext-flex-col ext-flex-1 ext-pl-9 ext-pr-3 ext-pt-2">
              <div className="ext-flex ext-flex-col ext-gap-3">
                {currentMenu === 'General' && (
                  <>
                    <GeneralPageOption
                      floatingButton={settings.hide_sidebar_button}
                      setFloatingButton={(value) => setSettings({ hide_sidebar_button: value })}
                    />
                  </>
                )}
                {currentMenu === 'Appearance' && (
                  <>
                    <AppearancePageOption
                      darkTheme={settings.theme === 'dark'}
                      setDarkTheme={(value) =>
                        setSettings({
                          theme: value ? 'dark' : 'light',
                        })
                      }
                    />
                  </>
                )}
                {currentMenu === 'Contact' && <ContactMe />}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="ext-flex ext-flex-col ext-justify-center ext-w-full ext-items-center ext-pt-4 ext-pb-14">
            <p className="ext-text-xs">Experiments from a lazy programmer</p>
            <p className="ext-text-xs">Version {chrome?.runtime?.getManifest().version}</p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
