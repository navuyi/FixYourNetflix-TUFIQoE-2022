import React, { useLayoutEffect } from "react";
import Input from "./Input/Input";

type T_PROPS = {
    value: number
}

const SubjectIDInput = (props:T_PROPS) => { 

    return(
        <Input 
            disabled
            type="text"
            placeholder="Subject ID"
            label={"Subject ID"}
            value={props.value}
        />
    )
}


export default SubjectIDInput