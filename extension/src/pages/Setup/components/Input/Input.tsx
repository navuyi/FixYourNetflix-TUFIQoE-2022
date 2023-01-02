import React from "react";
import style from "./style.module.scss"

type T_PROPS = {
    placeholder: string,
    handle_change: Function,
    label: string,
    type: string,
    value: number|string,
}

const Input = (props:T_PROPS) => {

    return(
        <>
            <div className={style.input_container}>
                <span className={style.label}>{props.label}</span>
                <input 
                    className={style.input} 
                    type={props.type} 
                    placeholder={props.placeholder} 
                    value={props.value}
                    onChange={(e) => props.handle_change(e)}
                />
            </div>
        </>
    )
}


export default Input