import axios  from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Linup({order}){
  const [menu, setMenu] = useState()
  const id = order?._id
  useEffect(()=>{
    axios.post('/order/get-food',{id}).then(
({data})=>{setMenu(data)}
    )
  },[id])
    
  return (
    <div className="bg-transparent border relative">
        <Link
          to={"/waiter/single/"+id}
          className=" border  text-black bg-white flex gap-3  p-2 items-center"
        >
          {order?.served && (<span className='absolute top-0 right-0 text-red-500 '>ቀርቧል</span>)}
          <div className={order?.made? "flex justify-center items-center min-w-16 h-16 text rounded-full bg-[#37FF4B]":"flex justify-center items-center min-w-16 h-16 text rounded-full bg-red-500"}>
            <span className="text-white text-3xl">{order?.table}</span>
          </div>
          <div className="flex flex-wrap gap-2 items-start">
            {menu?.length > 0 && (menu.map((food)=>(
              <div className='flex' key={food?.menuItem?._id} >
              <span className='font-semibold'>{food?.quantity}</span>
              <span>{food?.menuItem?.name}, </span>
              </div>
            )))}
            
          </div>
        <span className='absolute bottom-0 right-0 text-xl font-semibold bg-white p-1 rounded-full'>{order?.total} birr</span>
        </Link>
      </div>
  )
}
