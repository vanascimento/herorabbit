/**
 * Recovery of interface elements of RabbitMQ HTML pages
 * for different versions of RabbitMQ management plugin.
 */
export class VersionMapperElements {
  public Mapper: Map<string, string>;
  constructor(elementsKeyValues: Map<string, string>) {
    this.Mapper = elementsKeyValues;
  }

  GetNodeToRenderQueueDashboard(document: Document): HTMLElement | null {
    let queue_overview = document.getElementById(this.Mapper.get('QUEUE_OVERVIEW_CHART_ID')!);
    return queue_overview;
  }

  GetNodeOfConnectionsTab(document: Document): HTMLElement | null {
    let connection_overview = document.getElementById(this.Mapper.get('CONNECTIONS_TAB_ID')!);
    if (connection_overview && connection_overview.firstElementChild?.classList.contains('selected')) {
      return connection_overview;
    }

    const tabs = document.getElementById('tabs');
    if (tabs) {
      const liElements = tabs.getElementsByTagName('li');
      for (let i = 0; i < liElements.length; i++) {
        const li = liElements[i];
        const a = li.getElementsByTagName('a')[0];
        if (a && a.getAttribute('href')?.includes('#/connections') && a.classList.contains('selected')) {
          connection_overview = a;
          return connection_overview;
        }
      }
    }

    return null;
  }

  GetNodeOfConnectionsMainContainer(document: Document): HTMLElement | null {
    let connection_overview = document.getElementById(this.Mapper.get('CONNECTIONS_MAIN_CONTAINER_ID')!);
    return connection_overview;
  }

  GetNodeToRenderChannelDashboard(document: Document): HTMLElement | null {
    let channels_overview = document.getElementById(this.Mapper.get('CHANNELS_OVERVIEW_CHART_ID')!);
    return channels_overview;
  }

  GetNodeToRenderQueueTableList(document: Document): HTMLElement | null {
    let queue_table_list = document.getElementById(this.Mapper.get('CONNECTIOS_TAB_ID')!);
    return queue_table_list;
  }

  GetNodeOfQueuesTabIfisSelected(document: Document): HTMLElement | null {
    let queuesTab = document.getElementById(this.Mapper.get('QUEUES_TAB_ID')!);
    if (queuesTab && queuesTab.firstElementChild?.classList.contains('selected')) {
      return queuesTab;
    }
    const tabs = document.getElementById('tabs');
    if (tabs) {
      const liElements = tabs.getElementsByTagName('li');
      for (let i = 0; i < liElements.length; i++) {
        const li = liElements[i];
        const a = li.getElementsByTagName('a')[0];
        if (a && a.getAttribute('href')?.includes('#/queues') && a.classList.contains('selected')) {
          queuesTab = a;
          return queuesTab;
          break;
        }
      }
    }
    return null;
  }

  GetNodeOfChannelsTab(document: Document): HTMLElement | null {
    let channelsTab = document.getElementById(this.Mapper.get('CHANNELS_TAB_ID')!);
    if (channelsTab && channelsTab.firstElementChild?.classList.contains('selected')) {
      return channelsTab;
    }
    const tabs = document.getElementById('tabs');
    if (tabs) {
      const liElements = tabs.getElementsByTagName('li');
      for (let i = 0; i < liElements.length; i++) {
        const li = liElements[i];
        const a = li.getElementsByTagName('a')[0];
        if (a && a.getAttribute('href')?.includes('#/channels') && a.classList.contains('selected')) {
          channelsTab = a;
          return channelsTab;
        }
      }
    }

    return channelsTab;
  }
}

export async function BuildInterfaceMapperElements(version: string): Promise<VersionMapperElements> {
  try {
    let fileData = await import(`../assets/json/${version}.json`);
    let versionJson: Map<string, string> = new Map<string, string>(
      Object.entries(fileData).map(([key, value]) => [key, String(value)]),
    );
    return new VersionMapperElements(versionJson);
  } catch (error) {
    return BuildInterfaceMapperElements('default');
  }
}
