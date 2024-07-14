import axios  from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function FinanceCard({order}){
  const [menu, setMenu] = useState([])

  const id = order?._id

  useEffect(()=>{
    axios.post('/order/get-food',{id}).then(
({data})=>{setMenu(data)}
    )

  },[id])
    
  return (
    <div className="bg-transparent relative">
        <Link
          to={"/Admin/single/"+id}
          className=" border-b-2 text-black bg-white flex gap-3 mt-4 p-2 items-center"
        >
                    {order?.served && (<span className='absolute top-0 right-0 text-red-500 '>ቀርቧል</span>)}
                    {order?.made && (<span className='absolute top-0 right-32 text-red-500 '>ተሰርቷል</span>)}
                    {order?.paid && (<span className='absolute top-0 right-64 text-red-500 '>ተሰርቷል</span>)}
          <div className={order?.paid? "flex relative rounded-full  justify-center items-center min-w-16 h-16 text bg-[#37FF4B]":"flex relative rounded-full  justify-center items-center min-w-16 h-16 text bg-red-500"}>
            <span className="text-white text-3xl">{order?.table}</span>
          </div>
          <div className=' text-black absolute top-1 left-20 w-20 rounded-md bg-gray-100 flex justify-start'>
            <span className='font-semibold'>{order?.waiter}</span>
          </div>
          <div className="flex flex-wrap gap-2 p-3 items-start">
            {menu?.length > 0 && (menu?.map((food)=>(
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

