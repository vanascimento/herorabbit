import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useContext, useState } from 'react';
import { getRandomColor } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { QueueAndStreamDataContext } from './queue-and-streams-data-provider';
import { useTranslation } from 'react-i18next';

const DEFAULT_TOP_ITEMS = 10;
export function QueuePizzaOverviewChart() {
  const [topItems, setTopItems] = useState<number>(DEFAULT_TOP_ITEMS);
  const { queuesData } = useContext(QueueAndStreamDataContext);
  const [queueNameFilter, setQueueNameFilter] = useState<string | undefined>(undefined);
  const { t } = useTranslation();

  const orderedQueueData = queuesData.sort((a, b) => b.messages - a.messages);
  const firstFiveQueues = orderedQueueData.slice(0, topItems);

  const firstFiveQueuesWithFillColor = firstFiveQueues
    .map((item) => ({ ...item, fill: getRandomColor(item.name) }))
    .filter((item) => !queueNameFilter || item.name.includes(queueNameFilter))
    .filter((item) => item.messages > 0);
  const allQueues = [...firstFiveQueuesWithFillColor];

  return (
    <Card className="flex flex-col ext-w-1/2 m-2 rounded-sm">
      <CardHeader>
        <div className=" ext-flex ext-flex-row ext-justify-between ">
          <div>
            <CardTitle>{t('pages.queue.chart.title')}</CardTitle>
            <CardDescription>
              {t('pages.queue.chart.description', {
                top: topItems,
              })}
            </CardDescription>
          </div>
          <div className="ext-flex ext-flex-row ext-self-end ext-space-x-4">
            <Input
              placeholder={t('pages.queue.chart.filter')}
              value={queueNameFilter}
              onChange={(value) => setQueueNameFilter(value.target.value)}
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
        <ChartContainer config={{}} className="ext-mx-auto ext-aspect-square ext-max-h-[500px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie data={allQueues} dataKey="messages">
              <LabelList dataKey="messages" fontSize={12} color="white" />
            </Pie>
            <ChartLegend name="Legenda" orientation="vertical" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
