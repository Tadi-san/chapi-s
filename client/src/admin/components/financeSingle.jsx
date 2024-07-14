import axios  from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BillLine } from "../../waiter/component/billLine"
export const FinanceSingle = () => {
  const {id} = useParams()
  const [order, setOrder] = useState()
  const [user, setUser] = useState()
  function pay(){
    axios.post('/order/pay/'+id, {name:user.user.name}).then(({data})=>{
        setOrder(data)
    })
  } 
  function getUser(){
    axios.get('/user').then(({data})=>setUser(data))
  }
  function make(){
    axios.post('/order/make/'+id, {name:user.user.name}).then(({data})=>{
        setOrder(data)
    })
  } 
  function unmake(){
    axios.post('/order/unmake/'+id).then(({data})=>{
      setOrder(data)
    })
  }
  
  useEffect(()=>{
    getUser()
    axios.get('/order/single/'+id).then(({data})=>{
    setOrder(data)
    })
  },[id])


  return (
    <div className=" p-5 text-black px-24">
      <div className=" flex justify-between items-center">
      <Link to={'/Admin'} className="text-black mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>
      </Link>
    
      </div>
      <div className="bg-gray-100 p-2 flex-col items-start text-2xl text-black flex gap-2 justify-center relative mt-2">
        <div>
        <span>ወንበር ቁጥር </span> <span className=" font-semibold ">{order?.table}</span>

        </div>
        <div>
        <span>የአስተናጋጅ ስም</span> <span  className=" font-semibold ">{order?.waiter}</span> 
        </div>
        <div>
            {order?.chef &&(<span>የሼፍ ስም <span  className=" font-semibold ">{order?.chef}</span></span>)}
        </div>
        <div>
            {order?.cashier &&(<span>የካሸር ስም <span  className=" font-semibold ">{order?.cashier}</span></span>)}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4 items-center max-h-[450px] p-2 overflow-y-scroll ov">
        
        <BillLine id={id} />
    <div className=" text-black text-2xl mb-40 mt-8 bg-gray-100 p-4">
          <span>Total</span> <span>{order?.total}</span>
        </div>
        <div className="p-3 flex gap-2 w-full absolute bottom-0">
            {/* { order?.paid == true? 
          <span className="text-2xl text-green-500 mb-2">ትዛዙ ተከፍሏል</span>:
          <span className="text-2xl text-red-500 mb-2">ትዛዙ አልተከፈለም </span>} */}

          {order?.paid == true? 
          <button onClick={unpay}
           className="bg-red-400 w-full p-4 text-3xl mt-4 text-white rounded-full ">ክፍያ ሰርዝ</button>
           :

            <button onClick={pay}
             className="bg-green-400 w-full p-4 text-3xl mt-4 text-white rounded-full ">ክፈል</button>}

{order?.made == true? 
          <button onClick={unmake}
           className="bg-red-400 w-full p-4 text-3xl mt-4 text-white rounded-full ">አልሰራሁትም</button>
           :
            <button onClick={make}
             className="bg-green-400 w-full p-4 text-3xl mt-4 text-white rounded-full ">ሰርቼዋለው</button>}

{order?.made == true? <button className="bg-green-400 w-full p-4 text-2xl">ደርሷል</button>: 
<button className="bg-red-400 w-full p-4 text-2xl">አልቀረበም</button>}
        </div>
      </div>
      </div>
  )
}
