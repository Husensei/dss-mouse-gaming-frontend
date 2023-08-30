"use client";

import { useEffect, useState } from "react";
import { Button, Card, Flex, Title } from "@tremor/react";

interface Props {
  criteriaData: any;
  mappingData: any;
  scale: any;
  onScaleChange(newScale: any): void;
}

export const Matrix = ({ criteriaData, mappingData, scale, onScaleChange }: Props) => {
  const renderRowValue = (row: number, data: any) => {
    return (
      <>
        <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start my-auto">{data.name}</p>
        {criteriaData.map((item: any, index: number) => {
          const current = scale.filter((val: any) => val.row === data.id && val.column === item.id)[0];

          if (!current) return <></>;

          const indexValue = mappingData.findIndex((val: any) => val.row === data.id && val.column === item.id);

          const inverseIndexValue = mappingData.findIndex((val: any) => val.column === data.id && val.row === item.id);

          if (row == index) {
            return (
              <p className="w-[60px] text-sm text-[#C8CAD0] text-center my-auto" key={index}>
                {current ? current.value : ""}
              </p>
            );
          } else if (row > index) {
            return (
              <p className="w-[60px] text-sm text-[#C8CAD0] text-center my-auto" key={index}>
                {current ? current.value : ""}
              </p>
            );
          } else {
            return (
              <input
                className="w-[60px] h-10 border border-[#C8CAD0] rounded-[3px] text-center"
                type="number"
                value={scale[indexValue].value}
                onChange={(e) => {
                  const newScale = [...scale]; // Create a copy of the scale array
                  const fixValue: number = Math.min(Math.max(Number(e.target.value), 0), 9); // Clamp value between 0 and 9
                  newScale[indexValue] = {
                    ...newScale[indexValue],
                    value: fixValue,
                  };

                  newScale[inverseIndexValue] = {
                    ...newScale[inverseIndexValue],
                    value: Number((1.0 / fixValue).toFixed(2)),
                  };

                  onScaleChange(newScale);
                }}
                max={9.0}
                min={0}
                key={index}
              ></input>
            );
          }
        })}
      </>
    );
  };

  return (
    <Card className="w-2/3 h-[600px] bg-[#1D283A] rounded-[15px]">
      <Flex flexDirection="col" justifyContent="between" alignItems="start" className="w-full">
        <Flex justifyContent="between" alignItems="center" className="w-full">
          <Title className="font-bold text-[#C8CAD0] text-xl">Pairwise Comparison</Title>
        </Flex>
        <div className={`w-full mt-5 py-3 flex justify-between items-center`}>
          <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start">Criteria</p>
          {criteriaData.map((item: any) => (
            <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-center" key={item.id}>
              {item.name}
            </p>
          ))}
        </div>
        {criteriaData.map((data: any, row: number) => (
          <div className={`w-full py-4 flex justify-between items-center`} key={row}>
            {renderRowValue(row, data)}
          </div>
        ))}
      </Flex>
    </Card>
  );
};
