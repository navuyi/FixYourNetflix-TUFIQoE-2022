import { ChromeStorage } from "../../utils/classes/ChromeStorage"
import { CustomLogger } from "../../utils/classes/CustomLogger"
import { NetflixDebugMenu } from "../../utils/classes/NetflixDebugMenu"
import { extract_debug_menu_data } from "../../utils/debug_menu_analysis"
import { get_local_datetime } from "../../utils/time_utils"


export class DebugMenuAnalyzer{
    private logger : CustomLogger
    private debug_menu : HTMLTextAreaElement | undefined
    private interval : ReturnType<typeof setInterval> | undefined

    constructor(){
        this.logger = new CustomLogger("[DebugMenuAnalyzer]")
    }

    public init = async () : Promise<void> => {
        this.debug_menu = await NetflixDebugMenu.get_html_element()

        await this.start_debug_menu_recording()
    }


    private start_debug_menu_recording = async () : Promise<void>=> {
        const interval_value = await (await ChromeStorage.get_experiment_settings()).stats_record_interval_ms
        this.interval = setInterval(() => {
            // Check if debug menu is not null
            if(!this.debug_menu) return;

            const timestamp = get_local_datetime(new Date())
            const data = extract_debug_menu_data(this.debug_menu.value, timestamp)
            const archive = {
                data: this.debug_menu.value,
                timestamp: timestamp
            }
            this.logger.log(data)
            this.logger.log(archive)

            //TODO Send extracted data to backend

        }, interval_value)
    }
}