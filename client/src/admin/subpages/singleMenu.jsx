import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const MenuSingle = () => {
  const [menu, setmenu] = useState()
  const {id} = useParams()
  const [category, setcategory] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");

  function edit(){
    axios.post("/menu/edit/"+id, { name, price, category }).then(({data})=>{
        console.log(data)
    })
  }
  function deleteMenu(){
    axios.delete("/menu/delete/"+id).then(({data})=>{
        console.log(data)
    })
  }
  useEffect(()=>{
    axios.get('/menu/'+id).then(({data})=>setmenu(data))

  },[id])

  useEffect(()=>{
    setcategory(menu?.category)
    setname(menu?.name)
    setprice(menu?.price)
  },[menu])
  
    return (
    <div className="p-5 px-14 flex flex-col items-center text-black">
        <div className="flex items-baseline w-5/6 justify-between">
        <span className=" text-2xl font-semibold mb-8"> Name of the Guy</span>
        <div className=" flex ">
<button onClick={edit} className=" px-4 border rounded-3xl hover:bg-green-400 hover:text-white">Edit</button>
<button onClick={deleteMenu} className="hover:bg-red-500 hover:text-white px-4 border rounded-3xl ml-2">Delete</button>
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
            <span className=" text-lg font-semibold">price:
                </span>  
        <input
                        type="number"
                        onChange={(ev) => {
                          setprice(ev.target.value);
                        }}
                        value={price}
        className=" bg-transparent p-2 border rounded-lg " 
        />
        </div>
        <div className=" flex gap-4 w-full items-center">
            <span className=" text-lg font-semibold">category:
                </span>  
        <select className=" bg-transparent p-2 border rounded-lg " 
           value={category}
           onChange={(ev) => {
             setcategory(ev.target.value);
           }}>
            <option>Food</option>
            <option>Drink</option>
            <option>Other</option>
        </select>
        </div>
        </div>
    </div>
  )
}
