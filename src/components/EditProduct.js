import React, {useEffect, useState} from 'react'
import {getProductById, saveProduct, updateProduct} from "../app/service";
import {resolvePath, useParams} from "react-router-dom";

export default function EditProduct() {
    const {id}=useParams()
    const [name,setName]=useState("");
    const [price,setPrice]=useState(0);
    const [checked,setChecked]=useState(false);
    useEffect(()=>{
       handleGetProductById(id)
    },[])

    const handleGetProductById = (id) => {
      getProductById(id).then(resp =>{
          let product=resp.data
          setName(product.name)
          setPrice(product.price)
          setChecked(product.checked)
      })
    }
    const handleUpdateProduct = (event) => {
        event.preventDefault(); //permit de ne pas rafraîchir la page
        let product={id,name,price,checked};
        updateProduct(product).then(resp=>{
            alert("Product Updated Successfully "+ JSON.stringify(resp.data))
        })
    }
    return (

        <div className="row m-3 " >
            <div className="col-md-6  ">
                <div className="card bg-dark text-white">
                    <div className="card-header bg-dark text-warning"><h3>New Product</h3> </div>
                    <div className="card-body">
                        <form onSubmit={handleUpdateProduct}>
                            <div >
                                <label className="form-label ms-1 mb-2">Product Name :</label>
                                <input
                                    onChange={(e)=>setName(e.target.value)}
                                    value={name}
                                    type="text"  className="form-control mb-2" placeholder="Here Is The Product Name"/>
                            </div>
                            <div >
                                <label className="form-label ms-1 mb-2">Price :</label>
                                <input
                                    onChange={(e)=>setPrice(e.target.value)}
                                    value={price}
                                    type="number"  className="form-control mb-2" placeholder="Here Is The Product Price"/>
                            </div>
                            <div className="form-check mb-2">
                                    <label className="form-check-label " >Checked</label>
                                    <input
                                        onChange={(e)=>setChecked(e.target.value)}
                                        checked={checked}
                                        type="checkbox" className="form-check-input" />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary  ms-1 mb-2 form-control">Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

