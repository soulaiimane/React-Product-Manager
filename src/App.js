import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import NewProduct from "./components/NewProduct";
import Products from "./components/Products";
import "bootstrap/dist/css/bootstrap.min.css"
import {useEffect, useState} from "react";
import EditProduct from "./components/EditProduct";
import {AppContext, useAppState} from "./app/service";
import States from "./components/States";

function App() {
    const [ currentRoute , setCurrentRoute ] = useState("");
      

   useEffect(()=> {
       const path=window.location.pathname;
       setCurrentRoute(path.slice(1,path.length))
       //console.log(currentRoute)

   },[]);
  return (
      <AppContext.Provider  value={useAppState()}>
          <BrowserRouter>
              <nav className="m-3 ms-lg-3 p-2 bg-dark border border-secondary navbar navbar-expand-lg ">
                  <ul className="nav nav-pills">
                      <li>
                          <Link
                              onClick={() => setCurrentRoute("home")}
                              className={ currentRoute =="home"
                                  ? "btn btn-warning ms-2"
                                  : "btn btn-outline-warning ms-2"}
                              to="/home">Home </Link>
                      </li>
                      <li>
                          <Link
                              onClick={() => setCurrentRoute("products")}
                              className={currentRoute =="products"
                                  ? "btn btn-warning ms-2"
                                  : "btn btn-outline-warning ms-2"}
                              to="/products">Products</Link>
                      </li>
                      <li>
                          <Link
                              onClick={() => setCurrentRoute("newProduct")}
                              className={currentRoute =="newProduct"
                                  ? "btn btn-warning ms-2"
                                  : "btn btn-outline-warning ms-2"}
                              to="/newProduct">New Product</Link>
                      </li>
                  </ul>
                  <ul className=" nav navbar">
                      <li className="">
                          <States > </States>
                      </li>
                  </ul>
              </nav>
              <Routes>
                  <Route path="/home" element={<Home/>}></Route> {/*Home is the component and /home ids the root to the component*/}
                  <Route path="/products" element={<Products/>}></Route>
                  <Route path="/newProduct" element={<NewProduct/>}></Route>
                  <Route path="/editProduct/:id" element={<EditProduct/>}></Route>
              </Routes>
          </BrowserRouter>
      </AppContext.Provider>
  );
}

export default App;
