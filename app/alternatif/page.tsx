"use client";
import { useEffect, useState } from "react";
import Axios from "@/lib/postgres";

export default function Alternatif() {
  const [addAlternativeModal, setAddAlternativeModal] = useState(false);
  const [editAlternativeModal, setEditAlternativeModal] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const alternative = await Axios.get(`/alternative`).then((res) =>
  //       res.data.map((item: any) => {
  //         return {
  //           ...item,
  //           check: false,
  //         };
  //       })
  //     );
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-5 bg-[#0F1729] pl-10 pr-10 py-10 overflow-y-scroll">
      <div className="w-full px-5 py-5 bg-[#05080F] flex flex-col justify-center items-start rounded-[15px]">
        <h2 className="font-bold text-xl text-[#C8CAD0]">Daftar Alternatif</h2>
        <h3 className="text-[#C8CAD0] mt-2">Daftar alternatif mouse gaming yang beredar di pasaran Indonesia.</h3>
      </div>
      <div className="w-full p-4 bg-[#05080F] flex flex-col justify-between items-start rounded-[15px]">
        <div className="w-full flex flex-col justify-center items-center ">
          <div className="w-full flex justify-between items-center">
            <p>Daftar Mouse Gaming</p>
            <button onClick={() => setAddAlternativeModal(true)} className="px-3 py-3 flex justify-center items-center bg-[#3ABFF8] rounded-lg">
              <p className="text-#FF9900">Tambah Alternatif</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
