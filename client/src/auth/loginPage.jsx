import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null);

  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post('/user/login', { name, password });
      const token = response.data.token;
      // console.log(token);
      localStorage.setItem('token', token);
      
      const tk = localStorage.getItem('token');
      console.log(`Bearer ${tk}`)
      const userResponse = await axios.get('/user/', {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      });
      
      setRedirect(userResponse.data.user.field);
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={`/${redirect}`} />;
  }

  return (
    <div className="mt-24 grow flex items-center justify-around">
      <div className="mb-64 w-full">
        <div className=" w-full mt-24 flex justify-center items-center max-h-fit">
        <img src="/corner2.jpg" className="w-full sm:w-96 object-cover bg-blend-luminosity"/>
        </div>
        
        <form className=" text-black w-3/4 sm:w-6/12 md:w-1/3 mx-auto flex flex-col items-center gap-4 " onSubmit={loginUser}>
          
          <div className=" flex flex-col items-start w-full">
            <span className="text-gray-400">Name</span>
            <input 
            type="text"
            required
            value={name}
            onChange={(ev)=>{setName(ev.target.value)}}
            className=" p-2 w-full bg-transparent border border-gray-500 rounded-lg focus:outline-gray-400"
            />
          </div>
          <div className=" flex flex-col items-start w-full">
            <span className="text-gray-400">Password</span>
            <input 
            type="password"
            required
            value={password}
            onChange={(ev)=>{setPassword(ev.target.value)}}
            className=" p-2 w-full bg-transparent border border-gray-500 rounded-lg focus:outline-gray-400"
            />
          </div>
          <div className=" flex flex-col w-full">
          <button className="border w-full py-3 bg-[#c19250] transition duration-300 ease-in-out hover:rounded-md text-lg text-white font-semibold">Login</button>
          </div>
        </form>

      </div>
    </div>
  );
}