export default function Preferensi() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 bg-[#0F1729] pl-10 pr-10 py-10 overflow-y-scroll">
      <div className="w-full px-5 py-5 bg-[#05080F] flex flex-col justify-center items-start rounded-[15px]">
        <h2 className="font-bold text-xl text-[#C8CAD0]">Konfigurasi Preferensi</h2>
        <h3 className="text-[#C8CAD0] mt-2">Konfigurasi perhitungan sesuai dengan kriteria dan preferensi yang Anda inginkan.</h3>
      </div>
      <div className="w-full p-4 bg-[#05080F] flex flex-col justify-between items-start rounded-[15px]">
        <p>Body</p>
      </div>
    </div>
  );
}
