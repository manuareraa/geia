import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector } from "recharts";

export default function GeoblocsChart(props) {
  const data = [
    {
      name: "Available",
      value: parseInt(props.totalSupply) - parseInt(props.purchased),
    },
    { name: "Purchased", value: parseInt(props.purchased) },
  ];

  function formatNumber(number) {
    const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

    // Get the index of the appropriate symbol (e.g., k, M, etc.)
    let tier = (Math.log10(number) / 3) | 0;

    // Convert the number to the appropriate format
    let formattedNumber = number / Math.pow(1000, tier);

    // Manually handle the number formatting to four characters or less without rounding
    if (tier > 0 && formattedNumber < 1000) {
      const decimals = Math.max(0, 3 - Math.floor(Math.log10(formattedNumber)));
      formattedNumber = formattedNumber.toFixed(decimals);
    } else {
      formattedNumber = formattedNumber.toFixed(0);
    }

    // If the formatted number has more than 4 characters, remove the decimal and increment the tier
    if (formattedNumber.length > 4) {
      // formattedNumber = formattedNumber.replace(".", "");
      formattedNumber = parseInt(formattedNumber);
    }

    return formattedNumber + SI_SYMBOL[tier];
  }

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
          dy={18}
          textAnchor="middle"
          fill={fill}
          className="text-5xl font-bold"
        >
          {formatNumber(payload.value)}
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
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${formatNumberWithCommas(value)} Geoblocs`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#333"
        >
          {name}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={36}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
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
    <PieChart width={800} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={400}
        cy={200}
        innerRadius={70}
        outerRadius={140}
        fill="#0172AD"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}
