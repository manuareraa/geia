import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";

export default function StatusChart(props) {
  const data = [
    { name: "Completed", value: parseInt(props.completed) },
    { name: "In Progress", value: parseInt(props.inProgress) },
  ];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
      name,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={10}
          textAnchor="middle"
          fill={fill}
          className="text-3xl font-black"
        >
          {payload.value}%
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        {/* <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
          className="hidden lg:block"
        />
        <circle
          cx={ex}
          cy={ey}
          r={2}
          fill={fill}
          stroke="none"
          className="hidden lg:block"
        /> */}
        {/* <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Status`}</text> */}
        {/* <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
          className="hidden lg:block"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
          className="hidden lg:block"
        >
          {name}
        </text> */}
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={400} height={270}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={200}
        cy={130}
        innerRadius={60}
        outerRadius={100}
        fill="#000000"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}
