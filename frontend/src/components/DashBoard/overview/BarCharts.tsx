import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import MainHeading from "../../common/MainHeading";

interface ResultEntry {
  TOTAL_AMOUNT: number;
  date: string;
}
interface DataEntry {
  amount: number;
  date: string;
}
export default function BarCharts() {
  const reduxOrders = useSelector((state: RootState) => state.orders);

  const getData = () => {
    if (reduxOrders.data.length > 0) {
      const data: DataEntry[] = reduxOrders.data.map((item: any) => {
        return { amount: item.subTotal, date: item.createdAt.substring(0, 10) };
      });
      const result: ResultEntry[] = data.reduce(
        (acc: any, { amount, date }) => {
          const existingEntry = acc.find((entry: any) => entry.date === date);
          if (existingEntry) {
            existingEntry.TOTAL_AMOUNT += amount;
          } else {
            acc.push({ TOTAL_AMOUNT: amount, date });
          }
          return acc;
        },
        []
      );
      console.log(result);
      return result;
    }
  };
  
  return (
    <>
      <div>
        <MainHeading bgcolor="#ffffff">Sales Vs Date</MainHeading>
        <BarChart
          //width={data !== undefined ? 100 * data?.length : 100}
          width={800}
          height={300}
          data={getData()?.slice(0, 7)}
          margin={{
            top: 50,
            right: 50,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 6" />
          <XAxis dataKey="date" />
          <YAxis dataKey="TOTAL_AMOUNT" />
          <Tooltip />
          <Bar dataKey="TOTAL_AMOUNT" fill="#8884d8" barSize={60} />
        </BarChart>
      </div>
    </>
  );
}
