"use client";

import { Button, Flex, Title } from "@tremor/react";
import { useState } from "react";

interface Props {
  alternativeData: any;
  criteriaData: any;
  setModal(state: boolean): void;
  handleSubmit(data: any): void;
}

export default function EditModal({ alternativeData, criteriaData, setModal, handleSubmit }: Props) {
  const initialValue = [];

  for (const [key, value] of Object.entries(alternativeData)) {
    if (!["id", "check", "name"].includes(key)) {
      initialValue.push({
        name: key,
        value: value,
      });
    }
  }

  const [name, setName] = useState(alternativeData.name);
  const [rating, setRating] = useState<any[]>(initialValue);

  console.log(rating);

  return (
    <Flex justifyContent="center" alignItems="center" className="fixed top-0 left-0 w-screen h-screen bg-[#2E2E2E] bg-opacity-60 z-[100]">
      <Flex flexDirection="col" justifyContent="center" alignItems="center" className="w-[500px] h-[450px] p-10 bg-[#1D283A] rounded-[15px] ">
        <Flex flexDirection="col" className="w-full">
          <Title className="font-bold text-[24px] text-[#C8CAD0]">Edit Mouse</Title>
          <Flex flexDirection="col" alignItems="start" className="mt-3">
            <p className="font-bold text-[#C8CAD0]">Mouse Name</p>
            <input className="mt-2 w-full h-10 px-2" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Flex>
          <div className="mt-2">
            <div className="grid grid-cols-3 mt-2 gap-x-4 gap-y-4">
              {rating.map((item: any) => (
                <div className="flex flex-col justify-start items-start" key={item.id}>
                  <p className="font-bold text-[#C8CAD0]">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                  <input
                    className="mt-2 w-32 h-10 px-2"
                    type={item.name == "weight" || item.name == "price" ? "number" : "string"}
                    value={rating[rating.findIndex((data) => data.name === item.name)].value}
                    onChange={(e) => {
                      const newRatingData = rating;
                      newRatingData[rating.findIndex((data) => data.name === item.name)].value = item.name == "weight" || item.name == "price" ? Number(e.target.value) : e.target.value;

                      setRating([...newRatingData]);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Flex>
        <Flex flexDirection="row" justifyContent="center" alignItems="center" className="w-full mt-5 gap-5">
          <Button
            size="xs"
            onClick={() => {
              handleSubmit({
                id: alternativeData.id,
                name: name,
                rating,
              });
              setName("");
            }}
            className="w-1/3 px-3 py-3 bg-[#0F1729] text-lg text-[#C8CAD0] border border-none rounded-lg"
          >
            Submit
          </Button>
          <Button size="xs" onClick={() => setModal(false)} className="w-1/3 px-3 py-3 bg-[#FB6F84] text-lg text-[#0F1729] border border-none rounded-lg">
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
