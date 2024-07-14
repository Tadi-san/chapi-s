import axios from "axios";
import { useEffect, useState } from "react";
import { CasheirCard } from "./components/cacherCard";

export const Casheir = () => {
    const [picked1, setPicked1] = useState(false);
    const [picked2, setPicked2] = useState(true);
    const [user, setUser] = useState()
    const[yaldereseOrder, setYaldereseOrder] = useState()
    const [yederese, setYederese] = useState()
    const [order, setOrder] = useState()
    function getOrderNotPaid(){
        axios.get('/order/unpaid').then(({data})=> setYaldereseOrder(data))
      }
    
    function getOrderPaid(){
      axios.get('/order/paid').then(({data})=> setYederese(data))
    }

    function handleButton1() {
        setPicked1(true);
        setPicked2(false);
        setOrder(null)
        getOrderPaid()
      }
    
    function handleButton2() {
        setPicked2(true);
        setPicked1(false);
        setOrder(null)
        getOrderNotPaid()
      }

      function showAll(){
        axios.get('/order/all').then(({data})=>setOrder(data))
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
        getOrderNotPaid()
      },[])
  return (
    <div className={picked2?" flex flex-col relative bg-[url('/red-pose.svg')] bg-no-repeat  bg-center min-h-screen":" flex flex-col relative bg-[url('/green-pose.svg')] bg-no-repeat  bg-center min-h-screen"}>
     <div className=" sticky">
      <div className="min-h-8 justify-between flex gap-5 p-2 mb-2 bg-[#ee226b]  w-full items-start">
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
</svg>
        <span className="text-2xl font-semibold text-gray-100">
          {user?.name}
        </span>
        </div>
        <button 
        onClick={showAll}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
</svg>

        </button>
      </div>
      <nav className=" bg-transparent flex justify-center gap-8 p-1">
        <button
          onClick={handleButton2}
          className={
            picked2
              ? "bg-[#f54141] text-white rounded-full px-8 text-lg"
              : " bg-white text-black text-lg p-2 px-8 rounded-full"
          }
        >
          ያልተከፈለ
        </button>
        <button
          onClick={handleButton1}
          className={
            picked1
              ? "bg-[#37FF4B] text-white rounded-full px-8 text-lg"
              : " bg-white text-black text-lg p-2 px-8 rounded-full"
          }
        >
          የተከፈለ
        </button>
      </nav>
         </div>
         <div className="flex flex-col items-center w-full">
         <div className="p-2 w-4/6">
      {yaldereseOrder?.length > 0 && picked2?yaldereseOrder.map((order)=>(
        <CasheirCard key={order._id} order={order} />
      )):<div></div>}
      {yederese?.length > 0 && picked1?yederese.map((order)=>(
        <CasheirCard key={order._id} order={order} />
      )):<div></div>}
            {order?.length > 0 ?order.map((order)=>(
        <CasheirCard key={order._id} order={order} />
      )):<div></div>}
      </div>
         </div>

    </div>
  )
}
