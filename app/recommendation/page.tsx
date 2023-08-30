"use client";

import { useEffect, useState } from "react";
import { Button, Card, Flex, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Title } from "@tremor/react";
import { useGlobalContext } from "../context/context";
import Axios from "@/postgres";
import Link from "next/link";

export default function Rekomendasi() {
  const { criteria, setCriteria } = useGlobalContext();
  const [ahp, setAhp] = useState([]);
  const [recommendation, setRecommendation] = useState<any[]>([]);
  const [lambda, setLambda] = useState(0);
  const [ci, setCi] = useState(0);
  const [cr, setCr] = useState(0);

  const handleCalculation = async () => {
    const storedData = localStorage.getItem("alternative");
    if (storedData !== null) {
      const parsedData = JSON.parse(storedData).filter((item: any) => item.check);

      const result = await Axios.post(`/recommendation`, parsedData).then((res) => res.data);
      if (result.status !== 201) return;
    }
  };

  const handleRecommendation = async () => {
    const recommendation = await Axios.get(`/recommendation`).then((res) => res.data);

    setRecommendation([...recommendation]);
  };

  useEffect(() => {
    const getDataCalculation = async () => {
      const ahpResult = await Axios.get(`/criteria/ahp`).then((res) => res.data);

      const lambdaResult = await Axios.get(`/criteria/lambdamax`).then((res) => res.data.lambda_max);

      const ciResult = await Axios.get(`/criteria/ci`).then((res) => res.data);

      const crResult = await Axios.get(`/criteria/cr`).then((res) => res.data);

      setAhp(ahpResult);
      setLambda(lambdaResult);
      setCi(ciResult);
      setCr(crResult);
    };
    getDataCalculation();
    handleRecommendation();
  }, []);

  return (
    <Card className="col-span-8 h-screen bg-[#0F1729] px-5 py-5 flex flex-col gap-5">
      <Flex flexDirection="col" justifyContent="center" alignItems="center" className="gap-5">
        <Card className="w-full bg-[#1D283A] rounded-[15px]">
          <Flex flexDirection="col" justifyContent="center" alignItems="center">
            <Flex justifyContent="between" alignItems="center" className="w-full">
              <Title className="font-bold text-[#C8CAD0] text-xl">Criteria Weight Result</Title>
              <Flex justifyContent="end" alignItems="center" className="w-1/3 gap-3">
                <p className="font-bold text-[#C8CAD0] text-sm">Lambda Max : {Number(lambda.toFixed(6))}</p>
                <p className="font-bold text-[#C8CAD0] text-sm">CI : {Number(ci.toFixed(6))}</p>
                <p className="font-bold text-[#C8CAD0] text-sm">CR : {Number(cr.toFixed(6))}</p>
              </Flex>
            </Flex>
            <Flex flexDirection="row" justifyContent="between" alignItems="center" className="mt-5 py-3">
              <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start">Criteria</p>
              {criteria.map((item: any, index: number) => (
                <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-center" key={index}>
                  {item.name}
                </p>
              ))}
            </Flex>
            <Flex flexDirection="row" justifyContent="between" alignItems="center" className="py-4">
              <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start"> Weight</p>
              {ahp.map((item: any) => (
                <p className={`w-[60px] font-bold text-sm text-[#C8CAD0] text-center`} key={item.id_criteria}>
                  {Number(item.weight.toFixed(6))}
                </p>
              ))}
            </Flex>
          </Flex>
        </Card>
        <Card className="w-full h-[420px] bg-[#1D283A] rounded-[15px]">
          <Flex flexDirection="col" justifyContent="center" alignItems="center">
            <Flex justifyContent="between" alignItems="center" className="w-full">
              <Title className="font-bold text-[#C8CAD0] text-xl">Profile Matching Result</Title>
            </Flex>
            <div className=" w-full h-[320px] overflow-y-auto mt-5">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Mouse Name</TableHeaderCell>
                    <TableHeaderCell>Shape</TableHeaderCell>
                    <TableHeaderCell>Connectivity</TableHeaderCell>
                    <TableHeaderCell>Grip</TableHeaderCell>
                    <TableHeaderCell>Weight</TableHeaderCell>
                    <TableHeaderCell>Sensor</TableHeaderCell>
                    <TableHeaderCell>Price</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody className="mt-10">
                  {recommendation.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.shape}</TableCell>
                      <TableCell>{item.connectivity}</TableCell>
                      <TableCell>{item.grip}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.sensor}</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Flex>
        </Card>
        <Link href={"/rank"}>
          <Button size="sm" className="w-[200px] px-3 py-3 bg-[#1D283A] text-xl text-[#C8CAD0] border border-none rounded-lg">
            Recommendation Result
          </Button>
        </Link>
      </Flex>
    </Card>
  );
}
