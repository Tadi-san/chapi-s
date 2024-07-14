import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const WorkerSingle = () => {
  const [user, setUser] = useState()
  const {id} = useParams()
  const [field, setfield] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");

  function edit(){
    axios.post("/user/edit/"+id, { name, password, field }).then(({data})=>{
        console.log(data)
    })
  }
  function deleteWorker(){
    axios.delete("/user/delete/"+id).then(({data})=>{
        console.log(data)
    })
  }
  useEffect(()=>{
    axios.get('/user/'+id).then(({data})=>setUser(data))

  },[id])

  useEffect(()=>{
    setfield(user?.field)
    setname(user?.name)
    setpassword(user?.password)
  },[user])
  
    return (
    <div className="p-5 px-14 flex flex-col items-center text-black">
        <div className="flex items-baseline w-5/6 justify-between">
        <span className=" text-2xl font-semibold mb-8"> Name of the Guy</span>
        <div className=" flex ">
<button onClick={edit} className=" px-4 border rounded-3xl hover:bg-green-400 hover:text-white">Edit</button>
<button onClick={deleteWorker} className="hover:bg-red-500 hover:text-white px-4 border rounded-3xl ml-2">Delete</button>
        </div>
        </div>
        <div className=" flex flex-col mt-4 w-5/6  gap-4">
        <div className=" flex gap-4 w-full items-center">
            <span className=" text-lg font-semibold">Name:
                </span>  
        <input
        onChange={(ev) => {
            setname(ev.target.value);
          }}
          value={name}
        className=" bg-transparent p-2 border rounded-lg " 
        />
        </div>
        <div className=" flex gap-4 w-full items-center">
            <span className=" text-lg font-semibold">Password:
                </span>  
        <input
                        type="password"
                        onChange={(ev) => {
                          setpassword(ev.target.value);
                        }}
                        value={password}
        className=" bg-transparent p-2 border rounded-lg " 
        />
        </div>
        <div className=" flex gap-4 w-full items-center">
            <span className=" text-lg font-semibold">Field:
                </span>  
        <select className=" bg-transparent p-2 border rounded-lg " 
           value={field}
           onChange={(ev) => {
             setfield(ev.target.value);
           }}>
            <option>Waiter</option>
            <option>Cashier</option>
            <option>Chef</option>
            <option>Admin</option> 
        </select>
        </div>
        <div className=" flex gap-4 w-full items-center">
            <span className=" text-lg font-semibold">Items Sold:
                </span>  
        <span></span>
        </div>
        <div className=" flex gap-4 w-full items-center">
            <span className=" text-lg font-semibold">Money Involved
                </span>  
        <span></span>
        </div>
        </div>
    </div>
  )
}
