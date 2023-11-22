import {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngry, faCheck, faCheckCircle,
    faCheckSquare,
    faChessRook, faCircle, faCircleCheck, faCross, faEdit,
    faFaceDizzy,
    faFaceLaugh, faSearch,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {AppContext, checkProduct, deleteProduct, deleteProducts, getAllProducts} from "../app/service";
import {useNavigate} from "react-router-dom";
import SearchForm from "./SearchForm";

export default function Products() {
    const [query,setQuery]=useState("");
    const navigate=useNavigate();
    const [state,setState]=useContext(AppContext)

  useEffect(()=>{
      handleGetProducts(state.keyword,state.currentPage,state.pageSize)
  },[])
    const handleGetProducts=(keyword,page,size)=>{
      getAllProducts(keyword,page,size).then(resp =>{
          const totalElements=resp.headers['x-total-count'];
          let totalPages=Math.floor(totalElements/size);
          if (totalElements%size!=0) ++totalPages
          setState({
              ...state,
              products:resp.data,
              keyword: keyword,
              currentPage: page,
              pageSize: size,
              totalPages: totalPages
          })
      }).catch(err=>{
          console.log(err)
      })
    }

    const handleDeleteProduct =(product)=>{
      deleteProduct(product).then(resp=>{
          const productList= state.products.filter( p=> p.id != product.id )
          setState({
              ...state,
              products: productList
          })
        }).catch(err=>{
            console.log(err)
      })
    }
    const handleCheckedProduct =(product)=>{
                checkProduct(product).then(resp=>{
                    const newProducts=state.products.map(p=>{
                        if (p.id==product.id) p.checked=!p.checked
                        return p
                    })
                    setState({...state,products: newProducts})
                }).catch(err=>{console.log(err)})
    }
    const handleGoToPage = (page) => {
      handleGetProducts(state.keyword,page,state.pageSize)

    }
    const handleSearchProduct = (event) => {
      event.preventDefault();
      handleGetProducts(query,1,state.pageSize)

    }

    return (
        <div className="p-3 m-3">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-dark text-white"><h3>Products</h3></div>
                        <div className="card-body">
                            <form onSubmit={handleSearchProduct}>
                                <div className="row g-2">
                                    <div className="col-6">
                                        <input
                                            onChange={(e)=>setQuery(e.target.value)}
                                            value={query}
                                            placeholder="Here Is Name Of A Product" className="form-control" type="text"/>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-success">
                                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card mt-2">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                <tr> <th className="bg-dark text-warning">ID</th> <th className="bg-dark text-warning">Product Name</th>
                                     <th className="bg-dark text-warning">Price</th> <th className="bg-dark text-warning">Checked</th>
                                    <th className="bg-dark text-warning">Delete</th><th className="bg-dark text-warning">Update</th>

                                </tr>
                                </thead>
                                <tbody>
                                {state.products.map((product)=>(
                                        <tr key={product.id}>
                                            <td className="bg-dark text-white">{product.id}</td>
                                            <td className="bg-dark text-white">{product.name}</td>
                                            <td className="bg-dark text-white">{product.price} DH</td>
                                            <td className="bg-dark text-white">
                                                <button onClick={()=>handleCheckedProduct(product)} className="btn btn-outline-warning">
                                                    <FontAwesomeIcon icon={product.checked==true? faCircleCheck:faCircle}>
                                                    </FontAwesomeIcon>
                                                </button>
                                            </td>
                                            <td className="bg-dark text-white">
                                                <button onClick={()=>handleDeleteProduct(product)} className="btn btn-danger">
                                                    <FontAwesomeIcon  icon={faTrash}></FontAwesomeIcon>
                                                </button>
                                            </td>
                                            <td className="bg-dark">
                                                <button onClick={() => navigate(`/editProduct/${product.id}`)} className="btn btn-success ">
                                                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            <ul className="nav nav-pills">
                                {
                                    (new Array(state.totalPages).fill(0).map((value,index)=>
                                        <li key={index+1}>
                                            <button onClick={()=>handleGoToPage(index+1)}
                                                    className={(index+1)==state.currentPage
                                                        ?'btn btn-info text-danger mx-1'
                                                        :'btn btn-outline-info text-danger mx-1'
                                            }>
                                                {index+1}</button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
