import axios from "axios";
import { useEffect, useState } from "react";

export function BillLine({ id }) { // Destructure the 'id' prop
  const [menu, setMenu] = useState();

  useEffect(() => {
    axios.post('/order/get-food', { id }).then(({ data }) => {
      setMenu(data);
    });
  }, [id]);

  return (
    <div className="w-full ">
      {menu?.length > 0 && (
        menu.map((food) => (
          <div key={food?.menuItem?._id} className=" flex gap-3  mt-2 justify-between text-black  items-center text-xl">
            <span className="p-2 w-fit text-end bg-gray-100">{food?.quantity}</span>
            <span className="p-2 w-full text-start bg-gray-100">{food?.menuItem?.name}</span>
            <span className="p-2 w-fit text-start bg-gray-100">{food?.price * food?.quantity}</span>
          </div>
        ))
      )}
    </div>
  );
}