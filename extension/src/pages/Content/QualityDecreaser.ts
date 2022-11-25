import { ChromeStorage } from "../../utils/classes/ChromeStorage";
import { CustomLogger } from "../../utils/classes/CustomLogger";
import { NetflixBitrateMenu } from "../../utils/classes/NetflixBitrateMenu";
import { NetflixPlayerAPI } from "../../utils/classes/NetflixPlayerAPI";
import { wait_for_video_to_load } from "../../utils/wait_for_video_to_load";

export class QualityDecreaser {
    private logger : CustomLogger
    private bitrate_index : number
    private timeout : ReturnType<typeof setTimeout> | undefined

    constructor(){
        this.logger = new CustomLogger("[QualityScenarioManager]")
        this.bitrate_index = 0
    }


    public init = async () : Promise<void> => {
        await wait_for_video_to_load()
        await this.init_bitrate_index()

        await this.set_new_bitrate() // Setting first bitrate - highest value
        await this.reset_to_beginning()  // Resetting playback - rewinding to the beginning
    

        await this.start_bitrate_changes()
    }

    private init_bitrate_index = async () => {
        const available_bitrates = await NetflixBitrateMenu.get_available_bitrates()
        this.bitrate_index = available_bitrates.length-1
    }

    private reset_to_beginning = async () : Promise<void> => {
        const video_duration = await NetflixPlayerAPI.get_video_duration()
        await NetflixPlayerAPI.seek(video_duration/4) // seek to quarter of the video length
        await NetflixPlayerAPI.seek(video_duration/2) // seek to half of the video length
        await NetflixPlayerAPI.seek(0)                // seek to the beginning of the video
    }


    
    private start_bitrate_changes = async () : Promise<void> => {
        const bitrate_interval = await (await ChromeStorage.get_experiment_settings()).bitrate_change_interval_ms
        this.timeout = setTimeout(async () => {
           // TODO
        }, bitrate_interval)
    }
    
   
    private set_new_bitrate = async () : Promise<void> => {
        const bitrates = await NetflixBitrateMenu.get_available_bitrates()
        const bitrate_to_set = bitrates[this.bitrate_index]

        await NetflixBitrateMenu.set_bitrate(bitrate_to_set)
        this.decrement_bitrate_index()
    }

    private decrement_bitrate_index = (): void => {
        this.bitrate_index > 0 ? this.bitrate_index -= 1 : this.bitrate_index = 0
    }

    private calculate_jitter = () : number => {
        // TODO define bitrate change jitter and bitrate change base in settings ! ! !
        return 5
    }
}

export default QualityDecreaser