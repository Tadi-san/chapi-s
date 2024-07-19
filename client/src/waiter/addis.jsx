import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Card from "./component/card";
export const Addis = () => {
  const [foods, setFoods] = useState();
  const [showFood, setShowFood] = useState(false)
  const [showDrink, setShowDrink] = useState(false)
  const [showOther, setShowOther] = useState(false)
  const [table, setTable] = useState();
  const [drinks, setDrinks] = useState();
  const [others, setOthers] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState();
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);
  const total = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const items = cartItems.map(({ id, quantity }) => ({
    menuItem: id,
    quantity,
  }));
  function getMenu() {
    axios.get("/menu/")
      .then(({ data }) => {
        // Filter the data to get the "Food" category items
        const foodItems = data.filter(item => item.category === "Food");
        const drinkItems = data.filter(item => item.category === "Drink");
        const othersItems = data.filter(item => item.category === "Other");
        setFoods(foodItems);
        setDrinks(drinkItems);
        setOthers(othersItems);
      })
      .catch(error => {
        console.error("Error fetching menu:", error);
      });
  }
  async function getUser(){
    const tk = localStorage.getItem('token');
      axios.get('/user/', {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      }).then(({data})=>{setUser(data.user)})
  }
  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (!exist) {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  function showHandler(ev) {
    ev.preventDefault();
    setShow(true);
    console.log(show);
  }
  const Submit = (ev) => {
    ev.preventDefault();
    axios.post("/orders/create", {
      waiter: user?.name || "chala",
      table: parseInt(table),
      items: items,
      total: parseFloat(total),
    })
    .then(() => setRedirect(true));
  }
  useEffect(() => {
    getUser();
    getMenu();
  }, []);

  if (redirect) {
    return <Navigate to={"/waiter"} />;
  }
  return (
    <div className=" text-White p-2 relative flex flex-col bg-[#111]">
      <span className="fixed top-4 right-1 z-10 text-lg text-[#d3ac75] font-bold">
        Total: {total} birr
      </span>
      <Link to={"/waiter"} className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="mt-2 w-8 h-8 text-[#d3ac75]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </Link>
      <form
        onSubmit={(ev) => showHandler(ev)}
        className=" w-full mb-12 items-center flex gap-3  mt-4"
      >
        <span className="text-xl text-[#d3ac75]">ወንበር ቁጥር፡</span>
        <input
          required
          className="bg-transparent border border-[#d3ac75] font-semibold rounded text-xl p-2 text-[#d3ac75]"
          type="number"
          value={table}
          onChange={(ev) => setTable(ev.target.value)}
        />
        <button
          type="submit"
          className=" border z-10 w-full p-2  bottom-2 left-0 fixed bg-[#d3ac75] text-white text-2xl rounded-full"
        >
          እዘዝ
        </button>
      </form>
      <button onClick={()=>setShowFood(!showFood)} className="w-full border flex border-[#d3ac75] text-[#d3ac75] mb-4 p-1 rounded-md justify-between items-center">
      <span className=" text-xl font-semibold text-start ">Foods</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 border-[#d3ac75]">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
      </button >
{showFood&& (
  <div className="bg-[#222] p-2 mb-12 flex flex-wrap justify-center gap-4 rounded-md">
  {foods?.length > 0 &&
    foods.map((food) => (
      <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
    ))}
</div>
)}
      
      <button onClick={()=>setShowDrink(!showDrink)} className="w-full border flex mb-4 p-1 rounded-md border-[#d3ac75] text-[#d3ac75] justify-between items-center">
      <span className=" text-xl font-semibold text-start ">Drinks</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
      </button >
      {showDrink&& (
        <div className="bg-[#222] p-2 mb-12 flex flex-wrap justify-center gap-4 rounded-md">
        {drinks?.length > 0 &&
          drinks.map((drink) => (
            <Card
              food={drink}
              key={drink.id}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          ))}
      </div>

      )}
      <button onClick={()=>setShowOther(!showOther)} className="w-full border flex mb-4 p-1 rounded-md border-[#d3ac75] text-[#d3ac75] justify-between items-center">
      <span className=" text-xl font-semibold text-start ">Others</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
      </button >

      {showOther&&(
        <div className="bg-[#222] p-2 mb-20 flex flex-wrap justify-center gap-4 rounded-md">
        {others?.length > 0 &&
          others.map((other) => (
            <Card
              food={other}
              key={other.id}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          ))}
      </div>
      )}
      

      {show ? (
        <div className=" z-20 fixed p-5 top-0 left-0 w-full bg-[#111] min-h-screen ">
          <button onClick={() => setShow(false)} className="text-[#d3ac75] mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="bg-[#222] p-2 text-2xl text-white flex flex-col items-start gap-2 justify-center relative mt-2">
            <span>
              ወንበር ቁጥር{" "}
              <span className="font-semibold text-[#d3ac75]">{table}</span>{" "}
            </span>
            <span>
              የአስተናጋጅ ስም{" "}
              <span className="font-semibold text-[#d3ac75]">
                {user?.name}
              </span>
            </span>
          </div>
          <div className="mt-16 flex flex-col max-h-[450px] overflow-scroll gap-4 items-center bg-[#222]">
            {cartItems.length > 0 &&
              cartItems.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="flex gap-3 justify-between text-white w-full items-center text-xl"
                  >
                    <span className="p-1 w-fit text-end bg-[#333]">
                      {item.quantity}
                    </span>
                    <span className="p-1 w-full text-start bg-[#333]">
                      {item.name}
                    </span>
                    <span className="p-1 w-fit text-end bg-[#333]">
                      {item.quantity * item.price}birr
                    </span>
                  </div>
                );
              })}

            <span className=" p-2  text-2xl mt-4">Total:
               <span className="text-[#d3ac75]"> {total} birr</span>
            </span>

            <div onClick={Submit} className="p-3 w-full absolute bottom-0">
        <button className="bg-[#d3ac75] rounded-full w-full p-4 text-2xl">
          እዘዝ
        </button>
      </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
