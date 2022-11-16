import { CustomLogger } from "./CustomLogger"
import { extract_html_elements } from "../html_element_extractors/get_bitrate_menu_elements"
import { T_BITRATE_MENU_ELEMENTS } from "../../config/types/bitrate_menu.type"

export class NetflixBitrateMenu{
    private static logger : CustomLogger = new CustomLogger("[NetflixBitrateMenu]")

    /**
     * Blocking method!
     * Invokes Netflix's bitrate menu by calling repeatedly keybord event dispatch method
     * Method blocks execution untill menu is invoked
     * @returns {void}
    */
    public static invoke = async () : Promise<void> => {
        let interval : ReturnType<typeof setInterval>
        let attempt = 1
        return new Promise(resolve => {
            interval = setInterval(() => {
                NetflixBitrateMenu.logger.log(`Invoking bitrate menu. Attempt: ${attempt}`)
                NetflixBitrateMenu.dispatch_invoker_event()

                if(NetflixBitrateMenu.is_invoked() === true){
                    clearInterval(interval)
                    resolve()
                }
                attempt += 1
            }, 500)
       })
    }

    public static dispatch_invoker_event = () : void => {
        NetflixBitrateMenu.logger.log("Dispatching keyboard event")
        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "S",
                altKey: true,
                ctrlKey: true,
                shiftKey: true,
                bubbles: true,
                code: "KeyS",
                which: 83,
                cancelable: true,
                composed: true,
                keyCode: 83
            })
        )
    }

    public static is_invoked = () : boolean => {
        const container = [...document.querySelectorAll("div")].filter(item => item.innerText.match("Video Bitrate"))[1]
        const override_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Override"))[0]
        const reset_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Reset"))[0]

        if([container, override_button, reset_button].some(elem => elem == null)){
            NetflixBitrateMenu.logger.log("Not invoked!")
            return false
        }else{
            NetflixBitrateMenu.logger.log("Invoked")
            return true
        }
    }

    public static get_html_elements = () : T_BITRATE_MENU_ELEMENTS | undefined => {
        const container = [...document.querySelectorAll("div")].filter(item => item.innerText.match("Video Bitrate"))[1]
        const override_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Override"))[0]
        const reset_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Reset"))[0]
    
        if(NetflixBitrateMenu.is_invoked() === false){
            NetflixBitrateMenu.logger.log("BitrateMenu has to be invoked first! Elements not available.")
            return
        }

        // Get BitrateMenu container content
        const bitrate_menu_div = container.childNodes[1]
        const select = bitrate_menu_div.childNodes[1] as HTMLSelectElement
        const options = Array.from(bitrate_menu_div.childNodes[1].childNodes) as Array<HTMLOptionElement>
        const bitrate_values = Array.from(bitrate_menu_div.childNodes[1].childNodes).map(option => {
            const o = option as HTMLOptionElement
            return parseInt(o.value)
        })

        return {
            container: container,
            override_button: override_button,
            reset_button: reset_button,
            select: select,
            options: options,
            bitrate_values: bitrate_values
        }
    }

    public static get_available_bitrates = () : Array<number> => {
        const {bitrate_values} = NetflixBitrateMenu.get_html_elements() as T_BITRATE_MENU_ELEMENTS
        return bitrate_values
    }

    public static set_bitrate = async (value : number) : Promise<void> => {
        const {select, override_button} = NetflixBitrateMenu.get_html_elements() as T_BITRATE_MENU_ELEMENTS
        select.value = value.toString()
        override_button.click()
    }
}