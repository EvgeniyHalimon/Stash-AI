'use client';
import {
  Calendar,
  StashTable,
  ChartByEachSpending,
  ChartByEachCategory,
  ChartByEachProductRemainingToBePostponed,
  MonthPicker,
  ChartByHistoryOfPostponement,
} from '@/components';

export default function Home() {
  return (
    <div className="home-wrapper">
      <MonthPicker />
      <Calendar />
      {/*       <div className="data-block">
        <div className="sub-block">
        </div>
        <div className="sub-block">
        </div>
      </div> */}
      <div className="chart-block">
        <ChartByEachSpending />
        <ChartByEachCategory />
        <ChartByEachProductRemainingToBePostponed />
      </div>
      <ChartByHistoryOfPostponement />
      <StashTable />
    </div>
  );
}
