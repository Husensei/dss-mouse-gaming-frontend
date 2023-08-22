"use client";

import { useEffect, useState } from "react";
import { Button, Card, Flex } from "@tremor/react";
import { useGlobalContext } from "../context/context";
import { Matrix } from "./table/matrix";
import { Preference } from "./table/preference";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Axios from "@/postgres";
import "react-toastify/dist/ReactToastify.css";

export default function Preferensi() {
  const { criteria, setCriteria } = useGlobalContext();
  const [isConsistent, setIsConsistent] = useState(true);

  const mappingCriteria: any[] = [];
  // const [mappingCriteria, setMappingCriteria] = useState<any>([]);

  criteria.map((criteria1: any) => {
    criteria.map((criteria2: any) => {
      mappingCriteria.push({
        row: criteria1.id,
        column: criteria2.id,
        value: criteria1.id === criteria2.id ? 1.0 : 1.0,
      });
    });
  });

  const handleMatrix = async (data: any) => {
    const matrix = await Axios.post(`/matrix`, data).then((res) => res.data);

    if (matrix.status !== 201) return;

    const ahpResult = await Axios.get(`/criteria/ahp`).then((res) => res.data);

    const crResult = await Axios.get(`/criteria/cr`).then((res) => res.data);

    if (crResult > 0.1) {
      toast.error("Matrix is not consistent!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setIsConsistent(false);
    }
  };

  const handlePreference = async (formData: any) => {
    const form = {
      ergo_pref: formData.ergo,
      ambi_pref: formData.ambi,
      wireless_pref: formData.wireless,
      wired_pref: formData.wired,
      palm_pref: formData.palm,
      claw_pref: formData.claw,
      fingertip_pref: formData.fingertip,
      price_pref: formData.price,
    };

    const res = await Axios.post(`/preference`, form).then((res) => res.data);

    if (res.status !== 201) return;
  };

  return (
    <Card className="col-span-8 h-screen bg-[#0F1729] px-5 py-5 ">
      <Flex flexDirection="col" justifyContent="between" alignItems="center">
        <Flex flexDirection="row" justifyContent="between" alignItems="start" className="gap-5">
          <Matrix criteriaData={criteria} mappingData={mappingCriteria} handleSubmit={handleMatrix} />
          <Preference handleSubmit={handlePreference} />
        </Flex>
        <Link href={"/recommendation"}>
          <Button size="xs" disabled={isConsistent} className="w-[120px] px-3 py-3 bg-[#1D283A] text-lg text-[#C8CAD0] border border-none rounded-lg mt-5">
            Calculate
          </Button>
          <ToastContainer />
        </Link>
      </Flex>
    </Card>
  );
}
