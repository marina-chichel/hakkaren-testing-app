import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { User } from "./hooks/useAPI";
import { Typography } from "@mui/material";

interface UserGraphProps {
  users: User[];
}

const UserGraph: React.FC<UserGraphProps> = ({ users }) => {
  const factor = "rate";

  const userCount: { [factor: string]: number } = {};
  users.forEach((user) => {
    userCount[user[factor]] = (userCount[user[factor]] || 0) + 1;
  });

  const data = Object.keys(userCount).map((factor) => ({
    factor,
    "Hourly rate": userCount[factor],
  }));
  const xAxisTicks = [data[0].factor, data[data.length - 1].factor];
  return (
    <>
      <Typography variant="body1">Hourly rate</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="factor" ticks={xAxisTicks} />
          <Tooltip />
          <Bar dataKey="Hourly rate" fill="#59d36b" />{" "}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default UserGraph;
