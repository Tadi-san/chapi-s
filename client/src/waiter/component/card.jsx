import { useState } from "react";

function Card({ food, onAdd, onRemove }) {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(food);
  };
  const handleDecrement = () => {
    setCount(count - 1);
    onRemove(food);
  };

  return (
    <div className=" flex-col flex bg-transparent w-fit bg-[#333]">

      <div className="flex relative justify-center w-[107px] bg-[#333] h-[100px]  items-center">
      <span className=" font-semibold text-[#fdcc87]">{food?.name}</span>
      <span className="absolute top-1 left-2 font-semibold text-[#d3ac75] "> {food?.price} birr </span>
      </div>

      <div className=" bg-transparent border-t-2 border-[#d3ac75] text-[#d3ac75] flex justify-center">
       
        {count !== 0 ? (
          <button className="  px-3 bg-[#333] text-red-400 font-semibold text-xl" onClick={handleDecrement} >-</button>
        ) : (
          ""
        )}
              <span
        className={`${count !== 0 ? "block bg-[#333] w-full  font-bold" : "hidden"}`+ ""}
      >
        {count}
      </span>
       
         <button className="  px-2 bg-[#333] text-green-400 font-semibold text-xl" onClick={handleIncrement} >+</button>
      </div>
    </div>
  );
}

export default Card;