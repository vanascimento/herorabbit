import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import { useGetCurrentTabUrl } from '@/hooks/useCurrentTabUrl';

/**
 *  The children will only be rendered if the current URL ends exactly with the configured path.
 * @param path The path to be compared with the current URL.
 * @returns
 */
export function HeroRenderProtectedUrlPath({ children, path }: { children: React.ReactNode; path: string }) {
  const { currentCredentials } = useCurrentRabbitmqCredentials();
  const { url } = useGetCurrentTabUrl();

  let configuredHostWithPath = currentCredentials?.host + path;
  let componentShouldBeRendered = url == configuredHostWithPath;
  if (componentShouldBeRendered) {
    return <>{children}</>;
  } else {
    return null;
  }
}
