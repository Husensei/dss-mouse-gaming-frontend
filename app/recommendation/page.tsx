"use client";

import { useEffect, useState } from "react";
import { Card, Flex, Title } from "@tremor/react";
import { useGlobalContext } from "../context/context";
import Axios from "@/postgres";

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
    <Card className="col-span-8 h-screen bg-[#0F1729] px-5 py-5 ">
      <Flex flexDirection="col" justifyContent="between" alignItems="center" className="gap-5">
        <Card className="w-full h-full bg-[#1D283A] rounded-[15px]">
          <Flex flexDirection="col" justifyContent="center" alignItems="center">
            <Flex justifyContent="between" alignItems="center" className="w-full">
              <Title className="font-bold text-[#C8CAD0] text-xl">Result</Title>
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
        <Card className="w-full h-full bg-[#1D283A] rounded-[15px]">
          <Flex flexDirection="col" justifyContent="center" alignItems="center">
            <Flex justifyContent="between" alignItems="center" className="w-full">
              <Title className="font-bold text-[#C8CAD0] text-xl">Recommendation List</Title>
            </Flex>
            <Flex flexDirection="row" justifyContent="start" alignItems="center" className="mt-5 py-3">
              <p className="w-[100px] font-bold text-sm text-[#C8CAD0] text-start">Rank</p>
              <p className="w-1/3 font-bold text-sm text-[#C8CAD0] text-start">Mouse Name</p>
              <p className="w-1/3 font-bold text-sm text-[#C8CAD0] text-start">Rating</p>
            </Flex>
            {recommendation.map((item: any, index: number) => (
              <Flex flexDirection="row" justifyContent="start" alignItems="center" className="py-4" key={index}>
                <p className="w-[100px] font-bold text-sm text-[#C8CAD0] text-start">{index + 1}</p>
                <p className="w-1/3 font-bold text-sm text-[#C8CAD0] text-start">{item.name}</p>
                <p className="w-1/3 font-bold text-sm text-[#C8CAD0] text-start">{item.rating}</p>
              </Flex>
            ))}
          </Flex>
        </Card>
      </Flex>
    </Card>
  );
}
