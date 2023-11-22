import React, {useContext, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../app/service";

export default function SearchForm(handleGetProducts) {
    const [query,setQuery]=useState("");
    const [state,setState]=useContext(AppContext)

    const handleSearchProduct = (event) => {
        event.preventDefault();
        handleGetProducts(query,1,state.pageSize)

    }

    return (
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
    )
}
