import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { RootState } from "../../../redux/store";

const COLORS = [
  "#0088FE", // Blue
  "#00C49F", // Green
  "#7F6B00", // Dark Brown (replacing Yellow)
  "#FF5A00", // Bright Orange (replacing Orange)
  "#9C5CE5", // Purple
  "#F5A623", // Orange
  "#7ED321", // Green
  "#50E3C2", // Cyan
  "#FF3B30", // Red
  "#4A90E2", // Blue
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return value !== undefined ? ( // Check if value is not zero
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: "12px" }}
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  ) : null;
};

const countOccurrences = (arr: string[]) => {
  const countMap: { [key: string]: number } = {};

  arr.forEach((item: string) => {
    if (Object.prototype.hasOwnProperty.call(countMap, item)) {
      countMap[item]++;
    } else {
      countMap[item] = 1;
    }
  });

  return countMap;
};

const PieCharts = (prop: any) => {
  const type = prop;
  const [orderStatus, setOrderStatus] = useState<string[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<any>({});
  const orderCount: any = useRef();
  const ordersFromRedux = useSelector((state: RootState) => state.orders);
  const handleOrderStatus = () => {
    if (type.type === "OrderStatus") {
      const data = ordersFromRedux.data || [];
      if (data.length > 0) {
        setOrderStatus(() => [
          ...data.map((item: any) => item.trackingId.OrderStatus),
        ]);
      } else {
        console.log("No data returned from getAllOrders()");
      }
    }
  };

  useEffect(() => {
    ordersFromRedux.data.length > 0 && handleOrderStatus();
  }, [ordersFromRedux]);

  useEffect(() => {
    if (type.type === "OrderStatus") {
      orderCount.current = countOccurrences(orderStatus);
      setOrderStatusData([
        { name: "Delivered", value: orderCount.current?.delivered },
        { name: "ordered", value: orderCount.current?.ordered },
        {
          name: " Out for delivery",
          value: orderCount.current?.Out_for_delivery,
        },
        {
          name: "shipped",
          value: orderCount.current?.shipped,
        },
        {
          name: "packing",
          value: orderCount.current?.packing,
        },
        {
          name: "cancelled",
          value: orderCount.current?.cancelled,
        },
        {
          name: "return",
          value: orderCount.current?.return,
        },
        {
          name: "return approved",
          value: orderCount.current?.returnApproved,
        },
        {
          name: "pickup",
          value: orderCount.current?.pickup,
        },
        {
          name: "refund",
          value: orderCount.current?.refund,
        },
      ]);
    }
  }, [orderStatus]);

  return (
    <div>
      {/* <h3 style={{ paddingLeft: 40, paddingBottom: 30 }}>{type.type}</h3> */}

      <PieChart width={250} height={400}>
        <Pie
          data={orderStatusData}
          cx={100}
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {orderStatus.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieCharts;
