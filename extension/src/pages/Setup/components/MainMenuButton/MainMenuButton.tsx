import React from "react";
import style from "./style.module.scss"

type T_PROPS = {
    text: string,
    handle_click: Function
}

const MainMenuButton = (props : T_PROPS) => {

    return(
        <>
            <button
                onClick={(e) => {props.handle_click(e)}}
                className={style.main_menu_button}
            >
                {props.text}
            </button>
        </>
    )
}


export default MainMenuButton