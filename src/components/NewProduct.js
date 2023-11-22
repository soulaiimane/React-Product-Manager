import React, {useState} from 'react'
import {saveProduct} from "../app/service";

export default function NewProduct() {
    const [name,setName]=useState("");
    const [price,setPrice]=useState(0);
    const [checked,setChecked]=useState(false);
    const handleSaveProduct = (event) => {
        event.preventDefault(); //permit de ne pas rafraîchir la page
        let product={name,price,checked};
        saveProduct(product).then(resp=>{
            alert("Product Created Successfully "+ JSON.stringify(resp.data))
        })
    }
    return (
        <div className="row m-3 " >
            <div className="col-md-6  ">
                <div className="card bg-dark text-white">
                    <div className="card-header bg-dark text-warning"><h3>New Product</h3> </div>
                    <div className="card-body">
                        <form onSubmit={handleSaveProduct}>
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

                            {/*<div className="form-group ">
                                <label htmlFor="exampleFormControlInput1 " className="ms-1 mb-2">Product Name : </label>
                                <input type="text" className="form-control  ms-1 mb-2" id="name"
                                       placeholder="Here Is The Product Name"/>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="exampleFormControlInput1 " className="ms-1 mb-2">Price : </label>
                                <input type="number" className="form-control  ms-1 mb-2" id="price"
                                       placeholder="Here Is The Product Price"/>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input  ms-1 mb-2" type="radio" name="inlineRadioOptions"
                                       id="inlineRadio1" value="True"/>
                                    <label className="form-check-label ms-1 mb-2" htmlFor="inlineRadio1" >True</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input  ms-1 mb-2" type="radio" name="inlineRadioOptions"
                                       id="inlineRadio2" value="False"/>
                                    <label className="form-check-label  ms-1 mb-2" htmlFor="inlineRadio2">False</label>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary  ms-1 mb-2">Submit</button>
                            </div>*/}


                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

