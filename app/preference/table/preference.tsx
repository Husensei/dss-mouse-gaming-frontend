"use client";

import { useState } from "react";
import { Button, Card, Flex, Title } from "@tremor/react";

interface Props {
  criteriaData: any;
  handleSubmit(data: any): void;
}

export const Preference = ({ criteriaData, handleSubmit }: Props) => {
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
              onChange={(e) => setErgo(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Ergonomic"
            ></input>
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={ambi}
              onChange={(e) => setAmbi(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Symmetrical"
            ></input>
          </Flex>
          <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start">Connectivity</p>
          <Flex flexDirection="row" justifyContent="start" alignItems="start" className="w-full py-5 gap-3">
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={wireless}
              onChange={(e) => setWireless(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Wireless"
            ></input>
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={wired}
              onChange={(e) => setWired(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Wired"
            ></input>
          </Flex>
          <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start">Grip</p>
          <Flex flexDirection="row" justifyContent="start" alignItems="start" className="w-full py-5 gap-3">
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={palm}
              onChange={(e) => setPalm(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Palm"
            ></input>
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={claw}
              onChange={(e) => setClaw(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Claw"
            ></input>
            <input
              className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
              type="number"
              value={fingertip}
              onChange={(e) => setFingertip(Number(e.target.value) > 10.0 ? 10.0 : Number(e.target.value) < 1 ? 1 : Number(e.target.value))}
              placeholder="Fingertip"
            ></input>
          </Flex>
          <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start">Price</p>
          <Flex flexDirection="row" justifyContent="start" alignItems="start" className="w-full py-5 gap-3">
            <input className="w-[110px] h-10 border border-[#C8CAD0] rounded-[3px] text-center" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value) < 1 ? 1 : Number(e.target.value))} placeholder="Budget"></input>
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDirection="col" justifyContent="end" alignItems="center" className="mt-8">
        <Button
          size="xs"
          onClick={() => {
            handleSubmit({
              ergo,
              ambi,
              wireless,
              wired,
              palm,
              claw,
              fingertip,
              price,
            });
          }}
          className="w-[120px] px-3 py-3 bg-[#0F1729] text-lg text-[#C8CAD0] border border-none rounded-lg"
        >
          Submit
        </Button>
      </Flex>
    </Card>
  );
};
