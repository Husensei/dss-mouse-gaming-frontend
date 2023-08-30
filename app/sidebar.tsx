"use client";

import { AiOutlineUnorderedList, AiOutlineSetting, AiOutlineCalculator } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Sidebar = () => {
  const path = usePathname();
  return (
    <div className="h-screen col-span-2 bg-[#05080F] px-[25px] py-[25px]">
      <div className="h-full flex flex-col items-start">
        <div className="flex flex-col justify-center items-start">
          <Link href={"/"}>
            <div className="flex justify-center items-center">
              <div className="w-10 h-10 bg-[#C8CAD0]"></div>
              <p className="ml-5 font-bold text-xl text-[#C8CAD0]">AIMZ</p>
            </div>
          </Link>
          <div className="flex flex-col justify-start items-start mt-10 mb-2">
            <Link href={"/alternative"} className={`flex justify-start items-center w-full gap-2 mt-3 px-3 py-3 ${path === "/alternative" ? "bg-[#1D283A] text-[#C8CAD0] rounded-lg" : "text-[#75787D]"}`}>
              <AiOutlineUnorderedList color={path === "/alternative" ? "#C8CAD0" : "#75787D"} />
              <p className="font-bold">Choose Alternatives</p>
            </Link>
            <Link href={"/preference"} className={`flex justify-start items-center w-full gap-2 mt-3 px-3 py-3 ${path === "/preference" ? "bg-[#1D283A] text-[#C8CAD0] rounded-lg" : "text-[#75787D]"}`}>
              <AiOutlineSetting color={path === "/preference" ? "#C8CAD0" : "#75787D"} />
              <p className="font-bold">Preference Configuration</p>
            </Link>
            <Link href={"/recommendation"} className={`flex justify-start items-center w-full gap-2 mt-3 px-3 py-3 ${path === "/recommendation" ? "bg-[#1D283A] text-[#C8CAD0] rounded-lg" : "text-[#75787D]"}`}>
              <AiOutlineCalculator color={path === "/recommendation" ? "#C8CAD0" : "#75787D"} />
              <p className="font-bold">Calculation Result</p>
            </Link>
            <Link href={"/rank"} className={`flex justify-start items-center w-full gap-2 mt-3 px-3 py-3 ${path === "/rank" ? "bg-[#1D283A] text-[#C8CAD0] rounded-lg" : "text-[#75787D]"}`}>
              <AiOutlineCalculator color={path === "/rank" ? "#C8CAD0" : "#75787D"} />
              <p className="font-bold">Recommendation Result</p>
            </Link>
            {/* <Link href={"/test"} className={`flex justify-start items-center w-full gap-2 mt-3 px-3 py-3 ${path === "/test" ? "bg-[#1D283A] text-[#C8CAD0] rounded-lg" : "text-[#75787D]"}`}>
              <AiOutlineCalculator color={path === "/test" ? "#C8CAD0" : "#75787D"} />
              <p className="font-bold">Test</p>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};
