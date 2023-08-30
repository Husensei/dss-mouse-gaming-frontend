"use client";

import { useEffect, useState } from "react";
import { Button, Card, Flex } from "@tremor/react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/context";
import { Matrix } from "./table/matrix";
import { Preference } from "./table/preference";
import Axios from "@/postgres";
import "react-toastify/dist/ReactToastify.css";

export default function Test() {
  const { push } = useRouter();
  const { criteria } = useGlobalContext();
  const [isConsistent, setIsConsistent] = useState(true);

  const mappingCriteria: any[] = [];

  criteria.map((criteria1: any) => {
    criteria.map((criteria2: any) => {
      mappingCriteria.push({
        row: criteria1.id,
        column: criteria2.id,
        value: criteria1.id === criteria2.id ? 1.0 : 1.0,
      });
    });
  });

  const [scale, setScale] = useState(mappingCriteria);

  const handleMatrixChange = (newScale: any) => {
    setScale(newScale);
  };

  const [ergo, setErgo] = useState<number>();
  const [ambi, setAmbi] = useState<number>();
  const [wireless, setWireless] = useState<number>();
  const [wired, setWired] = useState<number>();
  const [palm, setPalm] = useState<number>();
  const [claw, setClaw] = useState<number>();
  const [fingertip, setFingertip] = useState<number>();
  const [price, setPrice] = useState<number>();

  const stateSetters = {
    setErgo,
    setAmbi,
    setWireless,
    setWired,
    setPalm,
    setClaw,
    setFingertip,
    setPrice,
  };

  const formPref = {
    ergo_pref: ergo,
    ambi_pref: ambi,
    wireless_pref: wireless,
    wired_pref: wired,
    palm_pref: palm,
    claw_pref: claw,
    fingertip_pref: fingertip,
    price_pref: price,
  };

  const handleCalculate = async () => {
    const matrix = await Axios.post(`/matrix`, scale).then((res) => res.data);
    if (matrix.status !== 201) return;

    const ahpResult = await Axios.get(`/criteria/ahp`).then((res) => res.data);
    const lambdaResult = await Axios.get(`/criteria/lambdamax`).then((res) => res.data.lambda_max);
    const ciResult = await Axios.get(`/criteria/ci`).then((res) => res.data);
    const crResult = await Axios.get(`/criteria/cr`).then((res) => res.data);

    const res = await Axios.post(`/preference`, formPref).then((res) => res.data);
    if (res.status !== 201) return;

    if (crResult > 0.1) {
      toast.error("Matrix is not consistent!");
    } else {
      const storedData = localStorage.getItem("alternative");
      if (storedData == null) return;
      const parsedData = JSON.parse(storedData).filter((item: any) => item.check);
      const result = await Axios.post(`/recommendation`, parsedData).then((res) => res.data);
      if (result.status !== 201) return;
      push("/recommendation");
    }
  };

  return (
    <>
      <Card className="col-span-8 h-screen bg-[#0F1729] px-5 py-5 ">
        <Flex flexDirection="col" justifyContent="between" alignItems="center">
          <Flex flexDirection="row" justifyContent="between" alignItems="start" className="gap-5">
            <Matrix criteriaData={criteria} mappingData={mappingCriteria} scale={scale} onScaleChange={handleMatrixChange} />
            <Preference stateSetters={stateSetters} />
          </Flex>
          <Button onClick={handleCalculate} size="xs" className="w-[120px] px-3 py-3 bg-[#1D283A] text-lg text-[#C8CAD0] border border-none rounded-lg mt-5">
            Calculate
          </Button>
        </Flex>
      </Card>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  );
}
