import { useEffect, useState } from "react";
import axios from 'axios'
import MenuCard from "../components/menuCard";

export const Menu = () => {
  const [category, setCategory] = useState("Food");
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [drinks, setDrinks] = useState();
  const [others, setOthers] = useState();
  const [foods, setFoods] = useState();
  const items = cartItems.map(({ _id, quantity }) => ({
    menuItem: _id,
    quantity,
  }));
    function handelClick(ev){
        ev.preventDefault()
        setShow(true)
    }
    function SubmitMenu(){
        console.log("yes")
        axios.post('/menu/add', {name, price, category}).then(handleClean)
    }
    function handleClean(){
        setCategory("Food")
        setprice(0)
        setname("")
        setShow(false)
    }
    function getDrink() {
      axios.get("/menu/drink").then(({ data }) => setDrinks(data));
    }
    function getOther() {
      axios.get("/menu/other").then(({ data }) => setOthers(data));
    }
    function getFood() {
      axios.get("/menu/food").then(({ data }) => setFoods(data));
    }
    useEffect(() => {
      getFood();
      getDrink();
      getOther();
    }, []);
  return (
    <div className="flex w-full relative text-gray-600">
      <div className= {show? "absolute flex justify-center w-full bg-transparent top-[30%]":"hidden"} >
      <div className="bg-white border relative w-4/6 p-5">
      <button className="text-black mb-4 absolute -top-4 -right-4" onClick={()=>setShow(false)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
      </button>
      <span>Are you sure you want to add this to Menu?</span>
      <div className="mt-16 flex flex-col gap-4 items-center">
      <div className=" flex gap-3 justify-between text-black w-full items-center text-xl">
          <span className="p-2 w-fit text-start bg-gray-100">Category:</span>
          <span className="p-2 w-full text-start bg-gray-100" >{category}</span>
        </div>
        <div className=" flex gap-3 justify-between text-black w-full items-center text-xl">
          <span className="p-2 w-fit text-start bg-gray-100">Name:</span>
          <span className="p-2 w-full text-start bg-gray-100" >{name}</span>
        </div>
        <div className=" flex gap-3 justify-between text-black w-full items-center text-xl">
          <span className="p-2 w-fit text-start bg-gray-100">price:</span>
          <span className="p-2 w-full text-start bg-gray-100" >{price}</span>
        </div>
        <div className="p-3  w-full ">
          <button
          onClick={SubmitMenu}
           className=" text-white p-2 px-12 rounded-full text-2xl font-semibold bg-[#ee226b] hover:text-white"
            >Yes</button>
        </div>
      </div>
      </div>
      </div>
      <div className="bg-transparent w-full p-10">
        <div className="p-2 flex flex-col items-center gap-10">
          <span className=" text-black text-2xl font-semibold">
            Add New Item To The Menu
          </span>
          <form className="gap-4 text-black text-lg flex flex-col  sm:w-fit p-4 rounded-md border">
            <div className=" flex items-center gap-4 m-0 p-0 w-[300px] sm:w-[350px] ">
              <span>Category:</span>
              <select
                className=" p-2 bg-transparent outline-none border-b-2 border-[#ee226b]"
                value={category}
                onChange={(ev) => {
                  setCategory(ev.target.value);
                }}
              >
                <option>Food</option>
                <option>Drink</option>
                <option>Other</option>
              </select>
            </div>
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
              <span>Price</span>
              <input
                className=" bg-transparent border p-1 rounded-md"
                type="number"
                onChange={(ev) => {
                  setprice(ev.target.value);
                }}
                value={price}
                required
              />
            </div>
            <button
              onClick={(ev) =>handelClick(ev)}
              className=" text-white p-2 px-12 rounded-full text-2xl font-semibold bg-[#ee226b] hover:text-white"
            >
              Submit
            </button>
          </form>
        </div>
        <div className=" flex flex-col items-center mb-14">
          <span className="text-black text-2xl font-semibold mt-14">My Menu</span>
          <span className="text-xl mt-8 font-semibold mb-4 text-start ">Foods</span>

<div className="bg-gray-200 p-2 mb-12 flex flex-wrap justify-center gap-4 rounded-md">
  {foods?.length > 0 &&
    foods.map((food) => (
      <MenuCard food={food} key={food.id}  />
    ))}
</div>
<span className="text-xl  font-semibold mb-4 text-start ">Drinks</span>
<div className="bg-gray-200 p-2 mb-12 flex flex-wrap justify-center gap-4 rounded-md">
  {drinks?.length > 0 &&
    drinks.map((drink) => (
      <MenuCard
        food={drink}
        key={drink.id}
       
      />
    ))}
</div>

<span className="text-xl font-semibold mb-4 text-start ">Others</span>
<div className="bg-gray-200 p-2 mb-20 flex flex-wrap justify-center gap-4 rounded-md">
  {others?.length > 0 &&
    others.map((other) => (
      <MenuCard
        food={other}
        key={other.id}
      
      />
    ))}
</div>
      </div>
      </div>
    </div>
  );
};
