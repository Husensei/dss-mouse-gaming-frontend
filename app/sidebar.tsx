"use client";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineCalculator } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const path = usePathname();
  return (
    <div className="h-screen w-1/4 bg-[#05080F] px-[25px] py-[25px]">
      <div className="h-full flex flex-col items-start">
        <div className="flex flex-col justify-center items-start">
          <Link href={"/"}>
            <div className="flex justify-center items-center">
              <div className="w-10 h-10 bg-[#C8CAD0]"></div>
              <p className="ml-5 font-bold text-xl text-[#C8CAD0]">AIMZ</p>
            </div>
          </Link>
          <div className="flex flex-col justify-start items-start mt-10 mb-2">
            <Link href={"/alternatif"} className={`flex justify-start items-center w-full gap-2 mt-3 px-3 py-3 ${path === "/alternatif" ? "bg-[#1D283A] text-[#C8CAD0]" : "text-[#606572]"}`}>
              <AiOutlineUnorderedList color={path === "/alternatif" ? "#C8CAD0" : "#606572"} />
              <p className="font-bold">Daftar Alternatif</p>
            </Link>
            <Link href={"/preferensi"} className={`flex justify-start items-center w-full gap-2 mt-3 px-3 py-3 ${path === "/preferensi" ? "bg-[#1D283A] text-[#C8CAD0]" : "text-[#606572]"}`}>
              <AiOutlineSetting color={path === "/preferensi" ? "#C8CAD0" : "#606572"} />
              <p className="font-bold">Konfigurasi Preferensi</p>
            </Link>
            <Link href={"/rekomendasi"} className={`flex justify-start items-center w-full gap-2 mt-3 px-3 py-3 ${path === "/rekomendasi" ? "bg-[#1D283A] text-[#C8CAD0]" : "text-[#606572]"}`}>
              <AiOutlineCalculator color={path === "/rekomendasi" ? "#C8CAD0" : "#606572"} />
              <p className="font-bold">Hasil Perhitungan</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
