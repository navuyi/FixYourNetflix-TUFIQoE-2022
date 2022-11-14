import { STATS_INVISIBLE } from "../../../config/config"
import { STATS_NONCLICKABLE } from "../../../config/config"
import { simulate_nerd_stats_hotkey } from "./keyboard_hotkeys/simulate_nerd_stats_hotkey"


export const get_statistics_element = () => {

    return new Promise((resolve) => {
        let element : HTMLTextAreaElement
        let outer_element : HTMLElement
        let timer : ReturnType<typeof setInterval>

        timer = setInterval(() => {
            simulate_nerd_stats_hotkey()
            element = document.getElementsByTagName("textarea")[0]
            outer_element = document.getElementsByClassName("player-info")[0] as HTMLElement  // This is the element that contains X (exit) button

            if(element && outer_element){
                // Clear retry interval
                clearInterval(timer)
                // Make outer container invisible and nonclickable based on config
                if(STATS_INVISIBLE){
                    outer_element.style.visibility = "hidden"
                }
                if(STATS_NONCLICKABLE){
                    outer_element.style.pointerEvents = "none"
                }

                // Return element containing data
                resolve(element)
            }
        }, 100)
    })
}



