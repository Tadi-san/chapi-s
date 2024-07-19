import axios  from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Linup } from "./component/linup";
import notificationSound from '../assets/sounds/not.mp3'
export default function WaiterFrontPage() {
  const [picked1, setPicked1] = useState(false);
  const [picked2, setPicked2] = useState(true);
  const [picked3, setPicked3] = useState(false)
  const [redirect, setRedirect] = useState(false);
  const [order, setOrder] = useState()
  const[tzaz, settzaz] = useState()
  const [yekerebe, setyekerebe] = useState()
  const [user, setUser] = useState()
  const [yetekefele, setyetekefele] = useState()
  const [name, setName] = useState()

  function handleButton1() {
    setPicked1(true);
    setPicked2(false);
    setPicked3(false)
    setyetekefele(null)
    settzaz(null)
    getyekerebe()
  }
  function handleButton3() {
    setPicked1(false);
    setPicked2(false);
    setPicked3(true)
    setyekerebe(null)
    settzaz(null)
    getYetekefele()
  }
  function handleButton2() {
    setPicked2(true);
    setPicked1(false);
    setPicked3(false)
    setyekerebe(null)
    setyetekefele(null)
    gettzaz()
  }
  async function getUser(){
    const tk = localStorage.getItem('token');
      axios.get('/user/', {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      }).then(({data})=>{setUser(data.user)
        setName(data.user.name)
      })
  }
  function gettzaz(){
    axios.get('/orders/unpaid-unserved').then(({data})=> setOrder(data))
  }
  function getYetekefele(){
    axios.get('/order/yetekefele').then(({data})=> setOrder(data))
  }
  function showAll(){
    axios.get('/order/all').then(({data})=>setOrder(data))
      }
function getyekerebe(){
  axios.post('/order/yekerebe', {name}).then(({data})=> setyekerebe(data))
}
  useEffect(()=>{
    getUser()
    gettzaz()
  },[])

  if (redirect) {
    return <Navigate to={"/waiter/addis"} />;
  }
  return (
    <div className={" flex flex-col relative bg-[url('/brown.svg')] bg-no-repeat bg-[#111]  bg-center min-h-screen"}>
     <div className=" sticky">
      <div className="min-h-8 flex justify-between gap-5 p-2 mb-2 bg-[#111]  w-full items-start">
        <div className="flex justify-center">
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
        <span className="text-2xl font-semibold text-[#d3ac75]">
          {user?.name}
        </span>
        </div>
        <button 
        onClick={showAll}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 text-[#d3ac75]">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
</svg>

        </button>
      </div>
      <nav className=" bg-transparent  flex justify-center gap-8 p-1">
        <button
          onClick={handleButton2}
          className={
            picked2
              ? "bg-[#d3ac75] relative text-white rounded-full px-7 text-lg"
              : " bg-[#222]  relative text-white text-lg p-2 px-7 rounded-full"
          }
        >
          ትዛዝ
          
        </button>
        
        <button
          onClick={handleButton1}
          className={
            picked1
              ? "bg-[#d3ac75] text-white rounded-full relative px-7 text-lg"
              : " bg-[#222]  relative text-white text-lg p-2 px-7 rounded-full"
          }
        >
          የቀረበ      
        </button>

        <button
          onClick={handleButton3}
          className={
            picked3
              ? "bg-[#d3ac75] text-white rounded-full relative px-7 text-lg"
              : " bg-[#222]  relative text-white text-lg p-2 px-7 rounded-full"
          }
        >
          የተከፈለ
          
          {/* {user?.notification &&(
          <div className="h-3 w-3 rounded-full bg-red-500 -top-1 right-1  absolute ">
            
          </div>
          )} */}

{/* {user?.notification && (
  <audio src={notificationSound} autoPlay />
)} */}
        </button>
      </nav>
      </div>
      <div className=" max-h-[80%] overflow-scroll">
      {tzaz?.length && picked2 ?tzaz.map((order)=>(
        <Linup key={order._id} order={order} />
      )):<div></div>}
      {yekerebe?.length && picked1?yekerebe.map((order)=>(
        <Linup key={order._id} order={order} />
      )):<div></div>}
      {order?.length ?order.map((order)=>(
        <Linup key={order._id} order={order} />
      )):<div></div>}
          {yetekefele?.length && picked3 ?yetekefele.map((order)=>(
        <Linup key={order._id} order={order} />
      )):<div></div>}
      </div>
      <div className=" bg-transparent w-full h-3 mt-14">
      </div>
      <div className=" fixed bg-transparent top-[90%] p-4 text-center w-full">
        <button
          onClick={() => setRedirect(true)}
          className="bg-[#d3ac75]  text-2xl rounded-3xl w-full p-2 text-[#fff]"
        >
          አዲስ ትዛዝ
        </button>
      </div>
    </div>
  );
}
