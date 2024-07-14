
import axios from 'axios'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Workers = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [field, setfield] = useState("Waiter");
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [workers, setWorkers] = useState()
  
    function handelClick(ev){
        ev.preventDefault()
        setShowAdd(!showAdd)
    }
    function addWorker(ev){
        ev.preventDefault()
        axios.post('/user/add', {name, password, field}).then(()=>{
            setShowAdd(false)
            setname("")
            setpassword("")
            setfield("Waiter")
        })
    }
    useEffect(()=>{
        axios.get('/user/all').then(({data}) => setWorkers(data))
    },[showAdd])

  return (
    <div className="flex flex-col items-center w-full text-black">
      <div className="w-full sm:w-4/6 flex flex-col items-center ">
        <span className="text-2xl my-4 font-semibold ">My Workers</span>
        <button onClick={(ev)=>handelClick(ev)} className="flex justify-between gap-2 w-full text-gray-500 border p-1 rounded-lg hover:border-[#ee226b] mb-4 hover:text-[#ee226b]">
        <span>Add new worker</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>
        </button>
        <form className={showAdd?"my-2 gap-4 text-black text-lg flex flex-col sm:w-fit p-4 rounded-md border":"hidden"}>
            <div className=" flex items-center gap-4 m-0 p-0 w-[300px] sm:w-[350px] ">
              <span>Name</span>
              <input
                className=" bg-transparent border p-1 rounded-md"
                onChange={(ev) => {
                  setname(ev.target.value);
                }}
                value={name}
                required
              />
            </div>
            <div className=" flex items-center gap-4 m-0 p-0 w-[300px] sm:w-[350px] ">
              <span>password</span>
              <input
                className=" bg-transparent border p-1 rounded-md"
                type="password"
                onChange={(ev) => {
                  setpassword(ev.target.value);
                }}
                value={password}
                required
              />
            </div>
            <div className=" flex items-center gap-4 m-0 p-0 w-[300px] sm:w-[350px] ">
              <span>field:</span>
              <select
                className=" p-2 bg-transparent outline-none border-b-2 border-[#ee226b]"
                value={field}
                onChange={(ev) => {
                  setfield(ev.target.value);
                }}
              >
                <option>Waiter</option>
                <option>Cashier</option>
                <option>Chef</option>
                <option>Admin</option>
              </select>
            </div>
            <button
              onClick={(ev) =>addWorker(ev)}
              className=" text-white p-2 px-12 rounded-full text-2xl font-semibold bg-[#ee226b] hover:text-white"
            >
              Submit
            </button>
          </form>
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
  );
};
