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
    <div className=" flex-col flex bg-transparent w-fit ">

      <div className="flex relative justify-center w-[107px] h-[100px] rounded-xl bg-white items-center">
      <span className=" font-semibold">{food?.name}</span>
      <span className="absolute top-1 left-2 font-semibold text-red-400 "> {food?.price} birr </span>
      </div>

      <div className=" bg-transparent mt-1 flex justify-center">
       
        {count !== 0 ? (
          <button className=" rounded-full px-2 bg-white text-red-400 font-semibold text-xl" onClick={handleDecrement} >-</button>
        ) : (
          ""
        )}
              <span
        className={`${count !== 0 ? "block bg-white w-full rounded-2xl font-bold" : "hidden"}`+ ""}
      >
        {count}
      </span>
         <button className=" rounded-full px-2 bg-white text-green-400 font-semibold text-xl" onClick={handleIncrement} >+</button>
      </div>
    </div>
  );
}

export default Card;