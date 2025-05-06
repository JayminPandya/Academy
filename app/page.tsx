
export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center space-y-11">
      <div className="flex flex-col justify-center items-center space-y-2">
        <p className="uppercase font-normal text-[#ffffff]/50">Welcome to</p>
        <h1 className="text-[#ffffff] text-5xl uppercase font-bold tracking-tight">Ashutosh chess academy</h1>
      </div>
      <button className="px-6 py-2 bg-[#ffffff] rounded-lg text-xl font-normal border border-[#000000]/30 border-b-4 hover:border-b-2 text-black">Get Started</button>
    </div>
  );
}
