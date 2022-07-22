import React from "react"
import {PropagateLoader} from "react-spinners";

const Loader = () => (
    <div className="justify-content-center" style={{display: 'flex', marginTop: 15}}>
        <PropagateLoader
            size={30}
            color={"#45c4e4"}
        />
    </div>
)

export default Loader
