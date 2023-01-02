import React from "react";
import style from "./style.module.scss"

type T_PROPS = {
    label: string
    handle_change: Function
    options: Array<{text:string, value:string}>
    value: string
}

const Select = (props:T_PROPS) => {
    return(
        <div className={style.select_container}>
            <span className={style.label}>{props.label}</span>
            <select className={style.select} onChange={(e) => props.handle_change(e)} value={props.value}>
                {
                    props.options.map((option,index) => {
                        return <option key={index} value={option.value}>{option.text}</option>
                    })
                }
            </select>
        </div>
    )
}


export default Select