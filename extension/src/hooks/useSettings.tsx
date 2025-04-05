import React, { createContext, useContext, useEffect, useState } from 'react';
import { GENERAL_SETTINGS_KEY, GeneralSettings, MESSAGE_TYPES, Theme } from '@/lib/types.ts';
import { ROOT_CONTAINER_ID } from '@/lib/constants.ts';
import useMessage from '@/hooks/useMessage.tsx';

type SettingsProviderProps = {
  children: React.ReactNode;
  shadowRoot?: ShadowRoot;
  defaultTheme?: Theme;
};

type SettingsProviderState = {
  settings: GeneralSettings;
  setSettings: (updatedSettings: Partial<GeneralSettings>) => void;
  refreshSettings: () => Promise<GeneralSettings>;
};

const initialSettingsState: SettingsProviderState = {
  settings: {
    theme: 'light',
    hide_sidebar_button: false,
    credentials: [],
    toggleSettings: {
      download_messages: true,
      queue_chart: true,
    },
    language: 'en',
  },
  setSettings: () => null,
  refreshSettings: () => Promise.resolve(initialSettingsState.settings),
};

const SettingsProviderContext = createContext<SettingsProviderState>(initialSettingsState);

export function SettingsProvider({
  children,
  defaultTheme = initialSettingsState.settings.theme,
  shadowRoot,
  ...props
}: SettingsProviderProps) {
  const messageData = useMessage();
  const [settings, setSettings] = useState<GeneralSettings>({
    ...initialSettingsState.settings,
    ...(defaultTheme && { theme: defaultTheme }),
  });

  const fetchSettings: () => Promise<GeneralSettings> = () => {
    return new Promise<GeneralSettings>((resolve, reject) => {
      chrome?.storage?.sync.get().then((items) => {
        if (items && items[GENERAL_SETTINGS_KEY]) {
          let newSettings = { ...settings, ...items[GENERAL_SETTINGS_KEY] };
          setSettings(newSettings);
          resolve(newSettings);
        } else {
          reject(null);
        }
      });
    });
  };
  // Read persisted settings from chrome.storage
  useEffect(() => {
    fetchSettings();
  }, []);

  // If settings updated globally from any component
  useEffect(() => {
    if (messageData?.type === MESSAGE_TYPES.GENERAL_SETTINGS_UPDATED && messageData?.data) {
      setSettings({ ...settings, ...(messageData.data as GeneralSettings) });
    }
  }, [messageData]);

  // Handles settings related changes
  useEffect(() => {
    function updateTheme() {
      const root = shadowRoot
        ? shadowRoot.getElementById(ROOT_CONTAINER_ID)
        : document.getElementById(ROOT_CONTAINER_ID);

      if (!root) {
        //console.error(`No root with id "${ROOT_CONTAINER_ID}" found to toggle theme.`);
        return;
      }

      root.classList.remove('light', 'dark');
      root.classList.add(settings.theme);
    }

    updateTheme();
  }, [settings]);

  const value = {
    settings,
    refreshSettings: fetchSettings,
    setSettings: async (updatedSettings: Partial<GeneralSettings>) => {
      const newSettings = { ...settings, ...updatedSettings };
      setSettings(newSettings);
      await chrome?.storage?.sync
        .set({ [GENERAL_SETTINGS_KEY]: newSettings })
        .then(() => console.log('[useSettings.js] UPDATE_GENERAL_SETTINGS'));
    },
  };

  return (
    <SettingsProviderContext.Provider {...props} value={value}>
      {children}
    </SettingsProviderContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsProviderContext);

  if (context === undefined) throw new Error('useSettings must be used within a SettingsProvider');

  return context;
};

export async function GetGeneralSettings(): Promise<GeneralSettings | null> {
  let items = await chrome?.storage?.sync.get();
  if (items && items[GENERAL_SETTINGS_KEY]) {
    return items[GENERAL_SETTINGS_KEY] as GeneralSettings;
  }
  return null;
}
