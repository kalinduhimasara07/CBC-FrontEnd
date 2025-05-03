import { useState } from "react";
export default function TestPage() {
  
  const [count, setCount] = useState(0);
  return (
    <div className="w-full h-screen  flex justify-center items-center">
      <div className="w-[450px] h-[250px] shadow flex justify-center items-center">
        <button className="bg-blue-600 text-white font-bold w-[50px] h-[60px] text-5xl cursor-pointer"
        onClick={() => setCount(count - 1)}>
          -
        </button>
        <span className="text-5xl mx-5">{count}</span>
        <button className="bg-blue-600 text-white font-bold w-[50px] h-[60px] text-5xl cursor-pointer "
        onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>
    </div>
  );
}
