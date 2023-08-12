"use client";

import { Card, Flex } from "@tremor/react";
import { useState } from "react";

interface Props {
  criteriaData: any;
  setModal(state: boolean): void;
  handleSubmit(data: any): void;
}

export default function AddModal({ criteriaData, setModal, handleSubmit }: Props) {
  const initialValue = criteriaData.map((item: any) => {
    return {
      name: item.name,
      value: item.name == "Weight" || item.name == "Price" ? 0 : "",
    };
  });

  console.log(criteriaData);

  const [name, setName] = useState("");
  const [rating, setRating] = useState<any[]>(initialValue);

  console.log(rating);

  return (
    <Flex justifyContent="center" alignItems="center" className="absolute top-0 left-0 w-screen h-screen bg-[#9A4757] bg-opacity-60 z-[100]">
      <Flex flexDirection="col" justifyContent="between" alignItems="center" className="w-[820px] h-[630px] p-10 bg-white rounded-[18px] ">
        <Flex flexDirection="col" className="w-full">
          <p className="font-bold text-[28px] text-black">Add Alternative</p>
          <div className="w-full mt-8">
            <p className="font-bold text-black">Mouse Name</p>
            <input className="mt-2 w-full h-10 border border-[#E1E1E1] px-2" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mt-10">
            <p className="font-bold text-black">Kriteria</p>
            <div className="grid grid-cols-3 mt-8 gap-y-4">
              {criteriaData.map((item: any) => (
                <div className="flex flex-col justify-start items-start" key={item.id}>
                  <p className="font-bold text-black">{item.name}</p>
                  <input
                    className="mt-2 w-32 h-10 border border-[#E1E1E1] px-2"
                    type={item.name == "Weight" || item.name == "Price" ? "number" : "string"}
                    value={rating[rating.findIndex((rtng) => rtng.name === item.name)].value}
                    onChange={(e) => {
                      const newRatingData = rating;
                      newRatingData[rating.findIndex((rtng) => rtng.name === item.name)].value = item.name == "Weight" || item.name == "Price" ? Number(e.target.value) : e.target.value;

                      setRating([...newRatingData]);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Flex>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <button
            onClick={() => {
              handleSubmit({
                name,
                rating,
              });
              setName("");
            }}
            className="w-full flex justify-center items-center py-3.5 bg-[#56AAB1] text-white rounded-[4px]"
          >
            Submit
          </button>
          <button onClick={() => setModal(false)} className="w-full flex justify-center items-center py-3.5 bg-white text-[#F96A61] border border-[#F96A61] rounded-[4px]">
            Cancel
          </button>
        </div>
      </Flex>
    </Flex>
  );
}
