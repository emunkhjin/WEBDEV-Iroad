import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const siteVisit = [
  { name: "1", thisYear: 0, lastYear: 0 },
  { name: "2", thisYear: 0, lastYear: 1 },
  { name: "3", thisYear: 5, lastYear: 2 },
  { name: "4", thisYear: 10, lastYear: 0 },
  { name: "5", thisYear: 4, lastYear: 1 },
  { name: "6", thisYear: 16, lastYear: 3 },
  { name: "7", thisYear: 5, lastYear: 1 },
  { name: "8", thisYear: 11, lastYear: 5 },
  { name: "9", thisYear: 6, lastYear: 2 },
  { name: "10", thisYear: 11, lastYear: 3 },
  { name: "11", thisYear: 30, lastYear: 2 },
  { name: "12", thisYear: 10, lastYear: 1 },
  { name: "13", thisYear: 13, lastYear: 0 },
  { name: "14", thisYear: 4, lastYear: 2 },
  { name: "15", thisYear: 3, lastYear: 8 },
  { name: "16", thisYear: 1, lastYear: 0 },
  { name: "17", thisYear: 0, lastYear: 0 }
];

const SiteVisit = () => (
  <div className="gx-site-dash gx-pr-xl-5 gx-pt-3 gx-pt-xl-0 gx-pt-xl-2">
    <h6 className="gx-text-uppercase gx-mb-2 gx-mb-xl-4">Site Visits</h6>
    <ResponsiveContainer width="100%" height={140}>
      <AreaChart
        data={siteVisit}
        margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
      >
        <Tooltip />
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <Area
          type="monotone"
          dataKey="thisYear"
          fillOpacity={1}
          stroke="#038FDE"
          fill="#038FDE"
        />
        <Area
          type="monotone"
          dataKey="lastYear"
          fillOpacity={1}
          stroke="#FE9E15"
          fill="#FE9E15"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default SiteVisit;
