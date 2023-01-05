import React, { useLayoutEffect } from "react";
import { useMenuSelect } from "../hooks/useMenuSelect";
import Select from "./Select/Select";

type T_PROPS = {
    id: string
    label: string
    options: Array<{label:string, value:string}>
}

const MenuSelect = (props:T_PROPS) => {
    const {init, handle_change, value} = useMenuSelect(props.id)

    useLayoutEffect(() => {
        init()
    }, [])

    return(
        <Select 
            label={props.label}
            options={props.options}
            value={value}
            handle_change={handle_change}
        />
    )
}

export default MenuSelect