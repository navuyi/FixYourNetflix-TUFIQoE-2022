import React from "react";
import style from "./style.module.scss"

type T_PROPS = {
    subject_id: string,
    handle_change: Function
}

const SubjectIDInput = (props:T_PROPS) => {
    

    return(
        <>
            <input 
                value={props.subject_id}
                onChange={(e) => {props.handle_change(e)}}
                className={style.input}
                type="text" 
                placeholder="Subject ID"
            />
        </>
    )
}


export default SubjectIDInput