import axios  from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Linup({order}){
  const [menu, setMenu] = useState()
  const id = order?.id
  useEffect(()=>{
    axios.post('/menu/find',{id}).then(
({data})=>{setMenu(data)}
    )
  },[id])
    
  return (
    <div className="bg-transparent border-b-2 border-b-[#d3ac75] relative">
        <Link
          to={"/waiter/single/"+id}
          className=" text-white bg-[#111] flex gap-3  p-2 items-center"
        >
          {order?.served && (<span className='absolute top-0 right-0 text-green-400  '>ቀርቧል</span>)}
          <div className={order?.made? "flex justify-center items-center min-w-16 h-16 text rounded-full bg-[#d3ac75]":"flex justify-center items-center min-w-16 h-16 text rounded-full bg-[#222]"}>
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
        <span className='absolute bottom-0 right-0 text-xl font-semibold bg-[#111] p-1 rounded-full text-[#d3ac75]'>{order?.total} birr</span>
        </Link>
      </div>
  )
}
