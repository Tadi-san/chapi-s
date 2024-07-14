import axios from "axios";
import { useEffect, useState } from "react";
import { ChefCard } from "./controllers/chefCard";

export const Chef = () => {
    const [picked1, setPicked1] = useState(false);
    const [picked2, setPicked2] = useState(true);
    const [user, setUser] = useState()
    const[yaldereseOrder, setYaldereseOrder] = useState()
    const [yederese, setYederese] = useState()
    function getOrderNotMade(){
        axios.get('/order/unmade').then(({data})=> setYaldereseOrder(data))
      }
    
    function getOrderMade(){
      axios.get('/order/made').then(({data})=> setYederese(data))
    }

    function handleButton1() {
        setPicked1(true);
        setPicked2(false);
        getOrderMade()
      }
    
    function handleButton2() {
        setPicked2(true);
        setPicked1(false);
        getOrderNotMade()
      }
    
      async function getUser(){
        const tk = localStorage.getItem('token');
          axios.get('/user/', {
            headers: {
              Authorization: `Bearer ${tk}`
            }
          }).then(({data})=>{setUser(data.user)})
      }

      useEffect(()=>{
        getUser()
        getOrderNotMade()
      },[])
  return (
    <div className={picked2?" flex flex-col relative bg-[url('/chef-red.svg')] bg-no-repeat  bg-center min-h-screen":" flex flex-col relative bg-[url('/chef-green.svg')] bg-no-repeat  bg-center min-h-screen"}>
     <div className=" fixed top-0 w-full">
      <div className="min-h-8  flex gap-5 p-2 mb-2 bg-[#ee226b]  w-full items-start">
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

        </div>
        <span className="text-2xl font-semibold text-gray-100">
          {user?.name}
        </span>
      </div>
      <nav className=" bg-transparent flex justify-center gap-8 p-1">
        <button
          onClick={handleButton2}
          className={
            picked2
              ? "bg-[#f54141] text-white rounded-full px-8 text-lg"
              : " bg-white text-black border  text-lg p-2 px-8 rounded-full"
          }
        >
          ያልተሰራ ትዛዝ
        </button>
        <button
          onClick={handleButton1}
          className={
            picked1
              ? "bg-[#37FF4B] text-white rounded-full px-8 text-lg"
              : " bg-white text-black border  text-lg p-2 px-8 rounded-full"
          }
        >
          የተሰራ ትዛዝ
        </button>
      </nav>
         </div>
         <div className="p-2 mt-24">
      {yaldereseOrder?.length > 0 && picked2?yaldereseOrder.map((order)=>(
        <ChefCard key={order._id} order={order} />
      )):<div></div>}
      {yederese?.length > 0 && picked1?yederese.map((order)=>(
        <ChefCard key={order._id} order={order} />
      )):<div></div>}
      </div>

    </div>
  )
}
