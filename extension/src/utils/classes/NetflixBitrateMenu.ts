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
    private static invoke = async () : Promise<void> => {
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

    /**
     *  Method simulates keyboard keys click in order to invoke bitrate menu programatically 
    */
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

    /**
     * Method checks if bitrate menu is already invoked
     * @returns {boolean}
     */
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

    /**
     * Blocking method. 
     * Waits for the bitrate menu to be invoked and then extracts end returns essential html elements
     * @returns {Promise<T_BITRATE_MENU_ELEMENTS>}
    */
    public static get_html_elements = async () : Promise<T_BITRATE_MENU_ELEMENTS> => {
        if(NetflixBitrateMenu.is_invoked() === false){
            await NetflixBitrateMenu.invoke()
        }

        // Get BitrateMenu container content
        const container = [...document.querySelectorAll("div")].filter(item => item.innerText.match("Video Bitrate"))[1]
        const override_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Override"))[0]
        const reset_button = [...document.querySelectorAll("button")].filter(button => button.innerText.match("Reset"))[0]

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

    /**
     * Blocking method.
     * Waits for bitrate menu to be invoked and returns available bitrates.
     * @returns {Array<number>}
    */
    public static get_available_bitrates = async () : Promise<Array<number>> => {
        const {bitrate_values} = await NetflixBitrateMenu.get_html_elements()
        return bitrate_values
    }

    /**
     * Blocking method.
     * Sets new bitrate in bitrate menu
     * @param value 
    */
    public static set_bitrate = async (value : number) : Promise<void> => {
        const {select, override_button} = await NetflixBitrateMenu.get_html_elements()
        select.value = value.toString()
        override_button.click()
    }
}