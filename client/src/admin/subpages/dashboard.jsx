import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Dashboard = () => {
  const [totalMoney, setTotalMoney] = useState(0)
  const [totalSale, setTotalSale] = useState(0)
    const [workers, setWorkers] = useState()
    useEffect(()=>{
        axios.get('/user/all').then(({data}) => setWorkers(data))
    },[])

function calculate(workers){
 workers?.forEach(element => {
  setTotalMoney(totalMoney + element.MoneyMade)
  setTotalSale(totalSale +element.itemsSoled)
  console.log(totalMoney)
});
}
    useEffect(() => {
  workers?.forEach(element => {
    setTotalMoney(prevTotalMoney => prevTotalMoney + element?.MoneyMade);
    setTotalSale(prevTotalSale => prevTotalSale + element?.itemsSoled);
  });
}, [workers]);
    return (
    <div className='w-full flex flex-col items-center'>
        <div className=' flex flex-wrap justify-between mt-16 w-5/6' >
<div className=' w-48 h-48 flex flex-col items-center '>
    <span className=' text-black text-xl font-semibold mb-4'>Total Item Sale</span>
    <div className=' w-full h-full border flex justify-center items-center text-black font-extrabold rounded-2xl hover:border-[#ee226b]'>
        <span>{totalSale}</span>
    </div>
</div> 
<div className=' w-48 h-48 flex flex-col items-center '>
    <span className=' text-black text-xl font-semibold mb-4'>Total Money Sale</span>
    <div className=' w-full h-full border flex justify-center items-center text-black font-extrabold rounded-2xl hover:border-[#ee226b]'>
        <span>{totalMoney}birr</span>
    </div>
</div> 
<div className=' w-48 h-48 flex flex-col items-center '>
    <span className=' text-black text-xl font-semibold mb-4'>Total Workers</span>
    <div className=' w-full h-full border flex justify-center items-center text-black font-extrabold rounded-2xl hover:border-[#ee226b]'>
        <span>{workers?.length -1 }</span>
    </div>
</div>             
        </div>
        <div className='flex rounded-2xl items-center flex-col w-full border mt-24 p-3'> 
           <span  className=' text-black text-xl font-semibold mb-4'>My Employees</span>
           {workers?.length >0 && [...workers].reverse().map(worker=>(
        <Link to={'/Admin/worker/'+worker._id} key={worker._id} className="w-full mt-2 justify-between flex gap-2 text-gray-500 border-b-2">
          <Link className=" hover:text-black">{worker.name}</Link>
          <span>{worker.field}</span>
          <div className="flex gap-2 ">
            <div className=" hover:text-black ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
            <div className="hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </div>
        </Link>

        ))}
        </div>
    </div>
  )
}
