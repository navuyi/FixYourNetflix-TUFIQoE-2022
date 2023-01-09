import { ChangeEvent, useState } from "react"
import { T_EXPERIMENT_SETTINGS } from "../../../config/storage.config"
import { ChromeStorage } from "../../../utils/custom/ChromeStorage"




export const useMenuSelect = (key:string) => {
    const [value, setValue] = useState<string>("")

    const init = async () : Promise<void> => {
        const settings = await ChromeStorage.get_experiment_settings()
        setValue(settings[key as keyof T_EXPERIMENT_SETTINGS] as string)
    }

    const handle_change = async (e:ChangeEvent<HTMLSelectElement>) : Promise<void> => {
        const _value = e.target.value

        setValue(_value)
        const settings = await ChromeStorage.get_experiment_settings()
        //@ts-ignore
        settings[key as keyof T_EXPERIMENT_SETTINGS] = _value
        await ChromeStorage.set_experiment_settings(settings)
    }

    return{
        value,
        init, 
        handle_change
    }
} 