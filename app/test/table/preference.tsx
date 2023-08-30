"use client";

import { useState } from "react";
import { Button, Card, Flex, Title } from "@tremor/react";

interface Props {
  stateSetters: {
    setErgo: React.Dispatch<React.SetStateAction<number | undefined>>;
    setAmbi: React.Dispatch<React.SetStateAction<number | undefined>>;
    setWireless: React.Dispatch<React.SetStateAction<number | undefined>>;
    setWired: React.Dispatch<React.SetStateAction<number | undefined>>;
    setPalm: React.Dispatch<React.SetStateAction<number | undefined>>;
    setClaw: React.Dispatch<React.SetStateAction<number | undefined>>;
    setFingertip: React.Dispatch<React.SetStateAction<number | undefined>>;
    setPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  };
}

export const Preference = ({ stateSetters }: Props) => {
  const [ergo, setErgo] = useState<number>();
  const [ambi, setAmbi] = useState<number>();
  const [wireless, setWireless] = useState<number>();
  const [wired, setWired] = useState<number>();
  const [palm, setPalm] = useState<number>();
  const [claw, setClaw] = useState<number>();
  const [fingertip, setFingertip] = useState<number>();
  const [price, setPrice] = useState<number>();

  return (
    <Card className="w-1/3 h-[600px] bg-[#1D283A] rounded-[15px]">
      <Flex flexDirection="col" justifyContent="between" alignItems="center" className="w-full">
        <Flex justifyContent="between" alignItems="center" className="w-full">
          <Title className="font-bold text-[#C8CAD0] text-xl">Mouse Preference</Title>
        </Flex>
        <Flex flexDirection="col" justifyContent="start" alignItems="start" className="w-full mt-5 py-3">
          <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start">Shape</p>
          <Flex flexDirection="row" justifyContent="start" alignItems="start" className="w-full py-5 gap-3">
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={ergo}
              onChange={(e) => stateSetters.setErgo(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Ergonomic"
            ></input>
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={ambi}
              onChange={(e) => stateSetters.setAmbi(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Symmetrical"
            ></input>
          </Flex>
          <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start">Connectivity</p>
          <Flex flexDirection="row" justifyContent="start" alignItems="start" className="w-full py-5 gap-3">
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={wireless}
              onChange={(e) => stateSetters.setWireless(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Wireless"
            ></input>
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={wired}
              onChange={(e) => stateSetters.setWired(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Wired"
            ></input>
          </Flex>
          <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start">Grip</p>
          <Flex flexDirection="row" justifyContent="start" alignItems="start" className="w-full py-5 gap-3">
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={palm}
              onChange={(e) => stateSetters.setPalm(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Palm"
            ></input>
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={claw}
              onChange={(e) => stateSetters.setClaw(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Claw"
            ></input>
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={fingertip}
              onChange={(e) => stateSetters.setFingertip(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Fingertip"
            ></input>
          </Flex>
          <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start">Price</p>
          <Flex flexDirection="row" justifyContent="start" alignItems="start" className="w-full py-5 gap-3">
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={price}
              onChange={(e) => stateSetters.setPrice(Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Budget"
            ></input>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
