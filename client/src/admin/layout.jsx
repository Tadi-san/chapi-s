import { useEffect, useState } from "react";
import { SideBar } from "./components/sideBar";
import { Menu } from "./subpages/menu";
import { Workers } from "./subpages/workers";
import  axios  from "axios";
import { Navigate } from "react-router-dom";
import { Dashboard } from "./subpages/dashboard";
import { Finance } from "./subpages/finance";
export const Layout = () => {
  const [userName, setUserName] = useState()
    useEffect(()=>{
     axios.get('/user').then(
        ({data})=>{
            if(data.name){
                setUserName(data.name)
            }
            else{
                return <Navigate to={'/login'} />
            }
        }
     )
   }, [])
    const [selectedButton, setSelectedButton] = useState("dashboard");

  const handleSelectButton = (buttonId) => {
    setSelectedButton(buttonId);
  };



  return (
    <div className="flex gap-4 text-gray-500">
      <SideBar onSelectButton={handleSelectButton} />
      {selectedButton=="menu"&&(<Menu />)}
      {selectedButton=="my-workers"&&(<Workers />)}
      {selectedButton=="dashboard"&&(<Dashboard />)}
      {selectedButton=="finance"&&(<Finance />)}
    </div>
  );
};