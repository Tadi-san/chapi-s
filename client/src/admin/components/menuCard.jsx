import { Link } from "react-router-dom";

function MenuCard({ food }) {


  return (
    <div className=" flex-col flex bg-transparent w-fit ">

      <Link to={'/Admin/menu/'+food?._id} className="flex relative justify-center w-[107px] h-[100px] rounded-xl bg-white items-center">
      <span className=" font-semibold">{food?.name}</span>
      <span className="absolute top-1 left-2 font-semibold text-red-400 "> {food?.price} birr </span>
      </Link>


    </div>
  );
}

export default MenuCard;