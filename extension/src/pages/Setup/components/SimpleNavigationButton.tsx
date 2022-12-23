import React from "react";
import { useNavigate } from "react-router";
import MainMenuButton from "./MainMenuButton/MainMenuButton";

type T_PROPS = {
    text: string,
    navigate_to: string
}

const SimpleNavigationButton = (props:T_PROPS) => {
    const navigate = useNavigate()

    return(
        <MainMenuButton 
            text={props.text}
            handle_click={() => {
                navigate(props.navigate_to, {
                    replace: true
                })
            }}
        />
    )
}


export default SimpleNavigationButton