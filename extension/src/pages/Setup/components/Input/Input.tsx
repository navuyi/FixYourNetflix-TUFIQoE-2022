import React from "react";
import style from "./style.module.scss"

type T_PROPS = {
    placeholder: string,
    handle_change?: Function,
    label: string,
    type: string,
    value: number|string,
    disabled?:boolean
}

const Input = (props:T_PROPS) => {

    return(
        <>
            <div className={style.input_container}>
                <span className={style.label}>{props.label}</span>
                <input 
                    disabled={props.disabled ?? false}
                    className={style.input} 
                    type={props.type} 
                    placeholder={props.placeholder} 
                    value={props.value}
                    onChange={(e) => props.handle_change ? props.handle_change(e) : null}
                />
            </div>
        </>
    )
}


export default Input