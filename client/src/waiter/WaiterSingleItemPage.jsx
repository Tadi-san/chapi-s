import axios  from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { BillLine } from "./component/billLine"
export const WaiterSingleItemPage = () => {
  const {id} = useParams()
  const [order, setOrder] = useState()
  const [show, setShow] = useState(false)
  const [redirect, setRedirect] = useState(false)
async function serv(){
  axios.post('/order/serve/'+id).then(({data})=>{setOrder(data)})
}  
async function unserv(){
  axios.post('/order/unserve/'+id).then(({data})=>{setOrder(data)})

} 
function deleteOrder(){
  axios.delete("/order/delete/"+id).then(({data})=>{
      console.log(data)
      setRedirect(true)
  })
}
  useEffect(()=>{
axios.get('/order/single/'+id).then(({data})=>{
setOrder(data)
    })
  },[id])

const tots = order?.total + (order?.total*15/100)
  if (redirect){
    return <Navigate to={'/waiter'} />
  }
  return (
    <div className=" p-5 text-black">
      <div className=" w-full flex justify-between items-center">
      <Link to={'/waiter'} className="text-black mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>
      </Link>
      <div className=" relative flex items-center">
      <Link to={'/waiter/edit/'+id} className=" ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
      </Link>
      <button onClick={()=>setShow(true)} 
      className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
      </button>
      {show && (      <div className=" absolute -top-2 bg-white z-10 w-56 right-4 h-32 flex flex-col items-center justify-center border rounded-xl p-2">
        <span className="text-xl font-semibold color" > Are you sure You want to <span className="text-red-500"> Delete </span></span>
        <div className=" mt-3 flex justify-between w-full p-2">
          <button onClick={()=>setShow(false)}
           className="px-4 p-2 rounded-full bg-gray-100 ">No</button> <button onClick={deleteOrder}
            className="px-4 p-2 rounded-full bg-red-500 text-white font-semibold ">Yes!</button>
        </div>
      </div>)}

      </div>
      </div>
      <div className="bg-gray-100 p-2 text-2xl text-black flex gap-2 justify-center relative mt-2">
        <span>ወንበር ቁጥር</span> <span>{order?.table}</span>
      </div>
      <div className="mt-16 flex flex-col gap-4 items-center max-h-[450px] p-2 overflow-y-scroll ov">
        
        <BillLine id={id} />
        <div className=" text-black text-lg mt-8 bg-gray-100 px-4">
          <span>without-Tax: </span> <span>{order?.total}</span>
        </div>
        <div className=" text-black text-2xl mt-1 bg-gray-100 p-4">
          <span>Total</span> <span>{tots}</span>
        </div>
        <div className="p-3  w-full absolute bottom-0">
        {order?.served == true? <span className="text-green-400 w-full p-4 text-2xl">
          ትዛዙ ቀርቧል
        </span>: 
          <span className="text-red-400 w-full p-4 text-2xl">ትዛዙ አልቀረበም</span>}

          {order?.served == true? 
          <button onClick={unserv} className="bg-red-400 w-full text-white p-4 text-2xl">አልቀረበም</button>:
          <button onClick={serv} className="bg-green-400 w-full text-white p-4 text-2xl">ቀርቧል</button>
          }
        </div>
      </div>
      </div>
  )
}
