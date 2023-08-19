"use client";

import { useEffect, useState } from "react";
import { Button, Card, Flex, Title } from "@tremor/react";

interface Props {
  criteriaData: any;
  mappingData: any;
  handleSubmit(data: any): void;
}

export const Matrix = ({ criteriaData, mappingData, handleSubmit }: Props) => {
  const [scale, setScale] = useState(mappingData);

  useEffect(() => {
    setScale(mappingData);
  }, [mappingData]);

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
                  const newNilaiData = scale;
                  const fixValue: number = Number(e.target.value) > 9.0 ? 9.0 : Number(e.target.value) < 0 ? 0 : Number(e.target.value);
                  newNilaiData[indexValue] = {
                    ...scale[indexValue],
                    value: fixValue,
                  };

                  newNilaiData[inverseIndexValue] = {
                    ...scale[inverseIndexValue],
                    value: Number((1.0 / fixValue).toFixed(2)),
                  };

                  setScale([...newNilaiData]);
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
        <div className={`w-full mt-5 py-3 flex justify-around items-center`}>
          <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-start">Criteria</p>
          {criteriaData.map((item: any) => (
            <p className="w-[60px] font-bold text-sm text-[#C8CAD0] text-center" key={item.id}>
              {item.name}
            </p>
          ))}
        </div>
        {criteriaData.map((data: any, row: number) => (
          <div className={`w-full py-4 flex justify-around items-center`} key={row}>
            {renderRowValue(row, data)}
          </div>
        ))}
      </Flex>
      <Flex flexDirection="row" justifyContent="center" alignItems="end" className="gap-5">
        <Button
          size="xs"
          onClick={() => {
            handleSubmit({
              scale,
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
