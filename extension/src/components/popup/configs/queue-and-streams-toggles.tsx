import { renderQueueDashboard } from "@/components/content/queue-and-streams/render-queue-dashboard";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/hooks/useSettings";
import { GeneralSettings } from "@/lib/types";
import { BuildInterfaceMapperElements } from "@/lib/version-mapper-elements";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { BarChart3, Settings } from "lucide-react";

const QueueAndStreamsTogglesSchema = z.object({
  queue_chart: z.boolean(),
  download_messages: z.boolean(),
});

export type QueueAndStreamsToggles = z.infer<
  typeof QueueAndStreamsTogglesSchema
>;

export default function ConnectionToggles() {
  const { setSettings, settings } = useSettings();
  const [localSettingsState, setLocalSettingsState] =
    useState<GeneralSettings>(settings);
  const { t } = useTranslation();

  return (
    <div className="ext-w-full ext-space-y-3">
      {/* Dashboard Toggle */}
      <div className="ext-flex ext-w-full ext-flex-row ext-items-center ext-justify-between ext-border-gray-200 ext-p-3 ext-border ext-shadow-sm hover:ext-shadow-md ext-transition-all ext-duration-200 ext-rounded-sm">
        <div className="ext-flex ext-items-center ext-space-x-3 ext-flex-1">
          <div className="ext-w-10 ext-h-10 ext-bg-gradient-to-br ext-from-blue-500 ext-to-blue-600 ext-flex ext-items-center ext-justify-center ext-shadow-sm">
            <BarChart3 size={20} className="ext-text-white" />
          </div>
          <div className="ext-space-y-1">
            <div className="ext-font-semibold ext-text-gray-900 ext-text-sm dark:ext-text-white">
              {t("configurations.queues.title")}
            </div>
            <div className="ext-text-xs ext-text-gray-600 dark:ext-text-white ext-leading-relaxed">
              {t("configurations.queues.description")}
            </div>
          </div>
        </div>
        <Switch
          checked={localSettingsState.toggleSettings.queue_chart}
          onCheckedChange={async (value) => {
            let newSettingsValue = {
              ...settings,
              toggleSettings: {
                ...settings.toggleSettings,
                queue_chart: value,
              },
            };
            await setSettings(newSettingsValue);
            const adapter = await BuildInterfaceMapperElements(
              settings.credentials[0].management_version!
            );
            setLocalSettingsState(newSettingsValue);
            renderQueueDashboard(adapter);
          }}
          aria-readonly
        />
      </div>

      {/* Management Toggle */}
      <div className="ext-flex ext-w-full ext-flex-row ext-items-center ext-justify-between ext-p-3 ext-border ext-border-gray-200 dark:ext-bg-neutral-900 ext-shadow-sm hover:ext-shadow-md ext-transition-all ext-duration-200 ext-rounded-sm">
        <div className="ext-flex ext-items-center ext-space-x-3 ext-flex-1">
          <div className="ext-w-10 ext-h-10 ext-bg-gradient-to-br ext-from-green-500 ext-to-green-600 ext-flex ext-items-center ext-justify-center ext-shadow-sm">
            <Settings size={20} className="ext-text-white" />
          </div>
          <div className="ext-space-y-1">
            <div className="ext-font-semibold ext-text-gray-900 ext-text-sm">
              {t("configurations.queues.management.title")}
            </div>
            <div className="ext-text-xs ext-text-gray-600 ext-leading-relaxed">
              {t("configurations.queues.management.description")}
            </div>
          </div>
        </div>
        <Switch
          checked={localSettingsState.toggleSettings.download_messages}
          onCheckedChange={async (value) => {
            let newSettingsValue: GeneralSettings = {
              ...settings,
              toggleSettings: {
                ...settings.toggleSettings,
                download_messages: value,
              },
            };
            setSettings(newSettingsValue);
            setLocalSettingsState(newSettingsValue);
          }}
          aria-readonly
        />
      </div>
    </div>
  );
}
