"use client";

import { useEffect, useState } from "react";
import { Button, Card, Flex, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Title } from "@tremor/react";
import Axios from "@/postgres";

export default function Rank() {
  const [rank, setRank] = useState<any[]>([]);

  const handleRank = async () => {
    const rank = await Axios.get(`/rank`).then((res) => res.data);

    setRank([...rank]);
  };

  useEffect(() => {
    handleRank();
  });

  return (
    <Card className="col-span-8 h-screen bg-[#0F1729] px-5 py-5 flex flex-col gap-5">
      <Card className="w-full bg-[#1D283A] rounded-[15px]">
        <Flex flexDirection="col" justifyContent="center" alignItems="center">
          <Flex justifyContent="between" alignItems="center" className="w-full">
            <Title className="font-bold text-[#C8CAD0] text-xl">Recommendation Result</Title>
          </Flex>
          <div className=" w-full h-auto overflow-y-auto mt-5">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Rank</TableHeaderCell>
                  <TableHeaderCell>Mouse Name</TableHeaderCell>
                  <TableHeaderCell>Shape</TableHeaderCell>
                  <TableHeaderCell>Connectivity</TableHeaderCell>
                  <TableHeaderCell>Grip</TableHeaderCell>
                  <TableHeaderCell>Weight</TableHeaderCell>
                  <TableHeaderCell>Sensor</TableHeaderCell>
                  <TableHeaderCell>Price</TableHeaderCell>
                  <TableHeaderCell>Rating</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody className="mt-10">
                {rank.map((item: any, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.shape}</TableCell>
                    <TableCell>{item.connectivity}</TableCell>
                    <TableCell>{item.grip}</TableCell>
                    <TableCell>{item.weight}g</TableCell>
                    <TableCell>{item.sensor}</TableCell>
                    <TableCell>Rp{item.price}</TableCell>
                    <TableCell>{item.rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Flex>
      </Card>
    </Card>
  );
}
