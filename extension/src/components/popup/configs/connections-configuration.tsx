import { renderConnectionDashboard } from '@/components/content/connections/render-connection-dashboard';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/hooks/useSettings';
import { GeneralSettings } from '@/lib/types';
import { BuildInterfaceMapperElements } from '@/lib/version-mapper-elements';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';
import { Network } from 'lucide-react';

const ConnectionsConfigurationSchema = z.object({
  connections_dashboard: z.boolean(),
});

export type ConnectionsConfiguration = z.infer<typeof ConnectionsConfigurationSchema>;

export default function ConnectionsConfiguration() {
  const { setSettings, settings } = useSettings();
  const [localSettingsState, setLocalSettingsState] = useState<GeneralSettings>(settings);
  const { t } = useTranslation();

  return (
    <div className="ext-w-full ext-space-y-3">
      <div className="ext-flex ext-w-full ext-flex-row ext-items-center ext-justify-between ext-p-3 ext-border ext-border-gray-200 ext-bg-white ext-shadow-sm hover:ext-shadow-md ext-transition-all ext-duration-200 ext-rounded-sm">
        <div className="ext-flex ext-items-center ext-space-x-3 ext-flex-1">
          <div className="ext-w-10 ext-h-10 ext-bg-gradient-to-br ext-from-indigo-500 ext-to-indigo-600 ext-flex ext-items-center ext-justify-center ext-shadow-sm">
            <Network size={20} className="ext-text-white" />
          </div>
          <div className="ext-space-y-1">
            <div className="ext-font-semibold ext-text-gray-900 ext-text-sm">
              {t('configurations.connections.title')}
            </div>
            <div className="ext-text-xs ext-text-gray-600 ext-leading-relaxed">
              {t('configurations.connections.description')}
            </div>
          </div>
        </div>
        <Switch
          checked={localSettingsState.connectionsSettings.connections_dashboard}
          onCheckedChange={async (value) => {
            let newSettingsValue = {
              ...settings,
              connectionsSettings: {
                ...settings.connectionsSettings,
                connections_dashboard: value,
              },
            };
            setLocalSettingsState(newSettingsValue);
            await setSettings(newSettingsValue);
            const adapter = await BuildInterfaceMapperElements(settings.credentials[0].management_version!);
            await renderConnectionDashboard(adapter);
            toast.success(t('configurations.connections.toast'));
          }}
          aria-readonly
        />
      </div>
    </div>
  );
}
