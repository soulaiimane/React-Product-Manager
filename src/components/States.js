import React, {useContext} from 'react'
import {AppContext, useAppState} from "../app/service";

 function States() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state,setState]=useContext(AppContext);

  return (

              <button type="button" className="btn btn-primary position-relative">
                  Caddy
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {state.products.length}
      </span>
              </button>


  )
}
export default States;