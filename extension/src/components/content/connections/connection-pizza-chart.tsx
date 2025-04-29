import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useContext, useState } from 'react';
import { getRandomColor } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ConnectionDataContext } from './connection-data-provider';
import { useTranslation } from 'react-i18next';

const DEFAULT_TOP_ITEMS = 10;

export function ConnectionPizzaOverviewChart() {
  const [topItems, setTopItems] = useState<number>(DEFAULT_TOP_ITEMS);
  const { connectionsData } = useContext(ConnectionDataContext);
  const [userFilter, setUserFilter] = useState<string | undefined>(undefined);
  const { t } = useTranslation();
  const userConnectionsMap = new Map<string, number>();

  connectionsData.forEach((connection) => {
    const { user } = connection;
    if (userConnectionsMap.has(user)) {
      userConnectionsMap.set(user, userConnectionsMap.get(user)! + 1);
    } else {
      userConnectionsMap.set(user, 1);
    }
  });

  const userConnectionsList: { name: string; connections: number; fill: string }[] = [];
  userConnectionsMap.forEach((value, key) => {
    userConnectionsList.push({ name: key, connections: value, fill: getRandomColor(key) });
  });

  let topUserConnectionsList = userConnectionsList
    .sort((a, b) => b.connections - a.connections)
    .filter((item) => !userFilter || item.name.includes(userFilter))
    .slice(0, topItems)
    .filter((item) => item.connections > 0);

  return (
    <Card className="flex flex-col  m-2 rounded-sm">
      <CardHeader>
        {JSON.stringify(connectionsData[0])}
        <div className=" ext-flex ext-flex-row ext-justify-between ">
          <div>
            <CardTitle>{t('pages.connections.chart.title')}</CardTitle>
            <CardDescription>
              {t('pages.connections.chart.description', {
                top: topItems,
              })}
            </CardDescription>
          </div>
          <div className="ext-flex ext-flex-row ext-self-end ext-space-x-4">
            <Input
              placeholder={t('pages.connections.chart.filter')}
              value={userFilter}
              onChange={(value) => setUserFilter(value.target.value)}
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
        <ChartContainer config={{}} className=" ext-aspect-square ext-max-h-[500px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie data={topUserConnectionsList} dataKey="connections">
              <LabelList dataKey="connections" fontSize={12} color="white" />
            </Pie>
            <ChartLegend orientation="vertical" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
