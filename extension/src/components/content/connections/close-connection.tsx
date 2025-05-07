import { useContext, useState } from 'react';
import { ConnectionDataContext } from './connection-data-provider';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ShieldCloseIcon, Trash2 } from 'lucide-react';

interface AlertMessage {
  type: 'success' | 'error';
  text: string;
}

export function CloseConnection() {
  const { t } = useTranslation();
  const { connectionsData, closeUserConnections } = useContext(ConnectionDataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertMessage | null>(null);

  // Get unique users from connections
  const users = Array.from(new Set(connectionsData.map((connection) => connection.user)));

  const handleCloseConnections = async () => {
    if (!selectedUser) return;

    setIsLoading(true);
    setAlert(null);
    try {
      await closeUserConnections(selectedUser);
      setAlert({
        type: 'success',
        text: t('pages.connections.close.success', { user: selectedUser }),
      });
    } catch (error) {
      setAlert({
        type: 'error',
        text: t('pages.connections.close.error'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button size="icon" onClick={() => setIsOpen(true)}>
        <Trash2 />
      </Button>
      {isOpen && (
        <>
          <div
            className="ext-fixed ext-inset-0 ext-bg-black ext-bg-opacity-50 ext-z-40"
            onClick={() => !isLoading && setIsOpen(false)}
          />
          <div className="ext-fixed ext-inset-0 ext-z-50 ext-overflow-y-auto">
            <div className="ext-flex ext-min-h-full ext-items-center ext-justify-center ext-p-4">
              <div
                className="ext-relative ext-bg-white ext-rounded-lg ext-shadow-xl ext-max-w-md ext-w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="ext-p-6">
                  <h3 className="ext-text-lg ext-font-medium ext-text-gray-900">
                    {t('pages.connections.close.title')}
                  </h3>
                  <p className="ext-mt-2 ext-text-sm ext-text-gray-500">{t('pages.connections.close.description')}</p>

                  <div className="ext-mt-4 ext-space-y-4">
                    <select
                      value={selectedUser || ''}
                      onChange={(e) => setSelectedUser(e.target.value || null)}
                      className="ext-w-full ext-p-2 ext-border ext-border-gray-300 ext-rounded-md ext-text-sm"
                      disabled={isLoading}
                    >
                      <option value="">{t('pages.connections.close.selectUser')}</option>
                      {users.map((user) => (
                        <option key={user} value={user}>
                          {user}
                        </option>
                      ))}
                    </select>

                    <div className="ext-bg-red-50 ext-p-4 ext-rounded-md">
                      <p className="ext-font-semibold ext-text-red-800">{t('pages.connections.close.warning')}</p>
                      <p className="ext-mt-1 ext-text-sm ext-text-red-700">
                        {t('pages.connections.close.warningDescription')}
                      </p>
                    </div>

                    {alert && (
                      <div
                        className={`ext-p-4 ext-rounded-md ext-border ${
                          alert.type === 'success'
                            ? 'ext-bg-green-50 ext-border-green-500 ext-text-green-700'
                            : 'ext-bg-red-50 ext-border-red-500 ext-text-red-700'
                        }`}
                      >
                        <p className="ext-text-sm">{alert.text}</p>
                      </div>
                    )}
                  </div>

                  <div className="ext-mt-6 ext-flex ext-justify-end ext-space-x-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="ext-px-4 ext-py-2 ext-bg-white ext-border ext-border-gray-300 ext-rounded-md ext-text-sm ext-font-medium ext-text-gray-700 hover:ext-bg-gray-50 focus:ext-outline-none focus:ext-ring-2 focus:ext-ring-offset-2 focus:ext-ring-indigo-500"
                      disabled={isLoading}
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      onClick={handleCloseConnections}
                      disabled={isLoading || !selectedUser}
                      className="ext-px-4 ext-py-2 ext-bg-red-600 ext-border ext-border-transparent ext-rounded-md ext-text-sm ext-font-medium ext-text-white hover:ext-bg-red-700 focus:ext-outline-none focus:ext-ring-2 focus:ext-ring-offset-2 focus:ext-ring-red-500 disabled:ext-opacity-50 disabled:ext-cursor-not-allowed"
                    >
                      {isLoading ? t('common.loading') : t('pages.connections.close.confirm')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
