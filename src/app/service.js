import axios from "axios";
import {createContext, useState} from "react";
export const productsApi=axios.create({
    baseURL:"http://localhost:9000"
})
export const getAllProducts=(keyword="",page=1,size=5)=>{
    return productsApi.get( `/products?name_like=${keyword}&_page=${page}&_limit=${size}`)
}
export const deleteProduct=(product)=>{
    return productsApi.delete("/products/"+product.id)
}
export const getProductById=(id)=>{
    return productsApi.get("/products/"+id)
}
export const saveProduct=(product)=>{
    return productsApi.post("/products",product)
}
export const checkProduct=(product)=>{
    return productsApi.patch("/products/"+product.id,{checked:!product.checked})
}
export const updateProduct=(product)=>{
    return productsApi.put("/products/"+product.id,product)
}

//la on gere notre state
export const AppContext=createContext()
export const useAppState = () => {
  const initialState={
            products:[],
            currentPage:1,
            pageSize:5,
            keyword:"",
            totalPages:0
    };
    const appState=useState(initialState)
    return appState

}


/*
{
    "id": 1,
    "name": "Computer Lenovo",
    "price": 15000,
    "checked": false
},
{
    "id": 2,
    "name": "Computer Samsung",
    "price": 12000,
    "checked": false
},
{
    "id": 3,
    "name": "Computer Apple",
    "price": 25000,
    "checked": false
},
{
    "id": 4,
    "name": "Computer Dell",
    "price": 16000,
    "checked": false
},
{
    "id": 5,
    "name": "Computer Acer",
    "price": 4500,
    "checked": false
},
{
    "id": 6,
    "name": "Computer Sony",
    "price": 5000,
    "checked": false
},
{
    "id": 7,
    "name": "Computer Asus",
    "price": 9500,
    "checked": false
},
{
    "id": 8,
    "name": "Computer Msi",
    "price": 30000,
    "checked": true
},
{
    "id": 9,
    "name": "Computer HP",
    "price": 12000,
    "checked": false
},
{
    "id": 10,
    "name": "Computer Huawei",
    "price": 8000,
    "checked": true
}*/
