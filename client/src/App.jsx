import {  Routes, Route } from "react-router-dom";
import './App.css'
import WaiterFrontPage from "./waiter/waiterFrontPage";
import { WaiterSingleItemPage } from "./waiter/WaiterSingleItemPage";
import { Addis } from "./waiter/addis";
import axios from 'axios'
import LoginPage from "./auth/loginPage";
import { Layout } from "./admin/layout";
import { EditOrder } from "./waiter/editOrder";
import { WorkerSingle } from "./admin/components/workerSingle";
import { MenuSingle } from "./admin/subpages/singleMenu";
import { FinanceSingle } from "./admin/components/financeSingle";
function App() {
  // axios.defaults.baseURL = "https://system1-api.onrender.com"
  axios.defaults.baseURL = "http://localhost:5000"
  axios.defaults.withCredentials = true

  return (
    <Routes>
      <Route path="/Waiter" element ={<WaiterFrontPage />} />
      <Route path="/Waiter/single/:id" element ={<WaiterSingleItemPage />} />
      <Route path="/Waiter/addis" element={<Addis />} />
      <Route path="/Waiter/edit/:id" element={<EditOrder />} />
      <Route path='/Admin' element={<Layout />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/Admin/worker/:id" element= {<WorkerSingle />} />
      <Route path="/Admin/single/:id" element= {<FinanceSingle />} />
      <Route path="/Admin/menu/:id" element= {<MenuSingle />} />
    </Routes>
  )
}

export default App

