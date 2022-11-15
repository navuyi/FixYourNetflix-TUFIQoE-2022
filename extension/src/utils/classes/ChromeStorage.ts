import { STORAGE_DEFAULT, T_EXPERIMENT_SETTINGS, T_EXPERIMENT_VARIABLES } from "../../config/storage.config"
import { CustomLogger } from "./CustomLogger"

export class ChromeStorage{
    private logger : CustomLogger

    constructor(){
        this.logger = new CustomLogger("[ChromeStorage]")
    }

    public initialize_default = async () : Promise<void> => {
        this.logger.log("Initializing default storage")
        await chrome.storage.local.set(STORAGE_DEFAULT)
    }

    public set_single = async (key: string, data: any) : Promise<void>=> {
        await chrome.storage.local.set({
            [key]: data
        })
    }

    public get_single = async (key : string) : Promise <any> => {
        const res = await chrome.storage.local.get([key])
        return res[key]
    }
    
    public get_multiple = async (...keys : Array<string>) : Promise <object> => {
        return await chrome.storage.local.get([...keys])
    }




    public get_experiment_variables = async () : Promise<T_EXPERIMENT_VARIABLES> => {
        const experiment_variables = await this.get_single("experiment_variables")
        return experiment_variables
    }

    public get_experiment_settings = async () : Promise<T_EXPERIMENT_SETTINGS> => {
        const experiment_settings = await this.get_single("experiment_settings")
        return experiment_settings
    }
}