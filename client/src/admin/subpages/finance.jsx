import axios from "axios"
import { FinanceCard } from "../components/financeCard"
import { useEffect, useState } from "react"

export const Finance = () => {
    const [order, setOrder] = useState()
    
    function getAll(){
      axios.get('/order/all').then(({data})=>setOrder(data))
    }

    useEffect(()=>{
      getAll()
    },[])
  return (
    <div className="w-full ">
        <div className="flex flex-col w-full mt-8 ">
            <span className="text-3xl text-black font-semibold">All orders</span>
        </div>
        <div className="flex border-b-2 flex-col w-full mt-8 ">
        {order?.length > 0 ?order.map((ord)=>(      
          <FinanceCard key={ord._id} order={ord} />
        )):<div></div>}
        </div>
    </div>
  )
}
