import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useContext, useState } from 'react';
import { getRandomColor } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ChannelDataContext } from './channel-data-provider';

const DEFAULT_TOP_ITEMS = 10;

export function ChannelByConnectionNameBarChart() {
  const [topItems, setTopItems] = useState<number>(DEFAULT_TOP_ITEMS);
  const [connectionName, setConnectionNameFilter] = useState<string | undefined>(undefined);

  const { channelsData } = useContext(ChannelDataContext);

  const connectionNameChannel = new Map<string, number>();

  channelsData.forEach((channel) => {
    const { connection_details } = channel;
    if (connectionNameChannel.has(connection_details.name)) {
      connectionNameChannel.set(connection_details.name, connectionNameChannel.get(connection_details.name)! + 1);
    } else {
      connectionNameChannel.set(connection_details.name, 1);
    }
  });

  const connectionNameChannelsList: { connectionName: string; channels: number; fill: string }[] = [];
  connectionNameChannel.forEach((value, key) => {
    connectionNameChannelsList.push({ connectionName: key, channels: value, fill: getRandomColor() });
  });

  let topConnectionNameChannelsList = connectionNameChannelsList
    .sort((a, b) => b.channels - a.channels)
    .filter((item) => !connectionName || item.connectionName.includes(connectionName))
    .slice(0, topItems)
    .filter((item) => item.channels > 0);

  return (
    <Card className="flex flex-col ext-w-1/2 m-2 rounded-sm">
      {JSON.stringify(connectionNameChannel)}
      <CardHeader>
        <div className=" ext-flex ext-flex-row ext-justify-between ">
          <div>
            <CardTitle>Channels by Connection</CardTitle>
            <CardDescription>Current top {topItems} total channels by Connection</CardDescription>
          </div>
          <div className="ext-flex ext-flex-row ext-self-end ext-space-x-4">
            <Input
              placeholder="Filter by ConnectionName"
              value={connectionName}
              onChange={(value) => setConnectionNameFilter(value.target.value)}
              onWheel={(e) => e.preventDefault()}
              className=" ext-text-center ext-rounded-sm"
              type="text"
            />
            <Input
              onChange={(value) => setTopItems(Number(value.target.value))}
              onWheel={(e) => e.preventDefault()}
              className=" ext-text-center ext-rounded-sm"
              value={topItems}
              type="number"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="ext-flex-1 ext-pb-0">
        <ChartContainer config={{}} className=" ext-max-h-[500px]">
          <BarChart accessibilityLayer data={topConnectionNameChannelsList} layout="vertical" margin={{ right: 16 }}>
            <YAxis dataKey="connectionName" type="category" tickLine={false} tickMargin={10} axisLine={false} hide />
            <XAxis dataKey="connections" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="connections" layout="vertical" radius={4}>
              <LabelList
                dataKey="connectionName"
                position="center"
                className="ext-fill-white ext-font-semibold "
                offset={8}
              />
              <LabelList dataKey="connections" position="right" offset={8} fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
