import { ChromeStorage } from "../../utils/classes/ChromeStorage";
import { CustomLogger } from "../../utils/classes/CustomLogger";
import { NetflixBitrateMenu } from "../../utils/classes/NetflixBitrateMenu";
import { NetflixPlayerAPI } from "../../utils/classes/NetflixPlayerAPI";
import { wait_for_video_to_load } from "../../utils/wait_for_video_to_load";

export class QualityDecreaser {
    private logger : CustomLogger
    private bitrate_index : number
    private timeout : ReturnType<typeof setTimeout> | undefined
    private bitrate_change_interval : number | undefined
    private bitrate_change_jitter : number | undefined


    constructor(){
        this.logger = new CustomLogger("[QualityScenarioManager]", "red")
        this.bitrate_index = 0
    }

    public init = async () : Promise<void> => {
        // Prepare bitrate change settings
        this.bitrate_change_interval = await (await ChromeStorage.get_experiment_settings()).bitrate_change_interval_ms
        this.bitrate_change_jitter = await (await ChromeStorage.get_experiment_settings()).bitrate_change_jitter_ms
        
        await wait_for_video_to_load()
        await this.init_bitrate_index()

        await this.set_new_bitrate() // Setting first bitrate - highest value
        await this.reset_to_beginning()  // Resetting playback - rewinding to the beginning
    

        await this.start_bitrate_changes()
    }

    public init_bitrate_index = async (after_quality_reset:boolean = false) => {
        const available_bitrates = await NetflixBitrateMenu.get_available_bitrates()
        this.bitrate_index = after_quality_reset === true ? available_bitrates.length-2 : available_bitrates.length-1
        NetflixBitrateMenu.dispatch_invoker_event()
        //NOTE: TODO: WARNING: ATTENTION: DELETE THIS LATER
        //this.bitrate_index = 0 // <<<<---- DELETE THIS LATER - ONLY FOR TESTING PURPOSES
    }

    private reset_to_beginning = async () : Promise<void> => {
        const video_duration = await NetflixPlayerAPI.get_video_duration()
        await NetflixPlayerAPI.seek(Math.round(video_duration/2)) // seek to quarter of the video length
        await NetflixPlayerAPI.seek(Math.round(video_duration/4)) // seek to half of the video length
        await NetflixPlayerAPI.seek(0)                // seek to the beginning of the video
    }
    
    public start_bitrate_changes = async () : Promise<void> => {
        const tmt = this.calculate_timeout()
        this.logger.log(`Scheduling next bitrate change in ${tmt} ms`)

        this.timeout = setTimeout(async () => {
            this.logger.log("Executing bitrate change...")
            await this.set_new_bitrate()
            
            // Call itself recurrently
            await this.start_bitrate_changes()
        }, tmt)
    }

    public stop_bitrate_changes = () : void => {
        if(this.timeout){
            this.logger.log("Halting bitrate changes")
            clearTimeout(this.timeout)
        }
    }
    
    public set_new_bitrate = async () : Promise<void> => {
        const bitrates = await NetflixBitrateMenu.get_available_bitrates()
        const bitrate_to_set = bitrates[this.bitrate_index]
        this.logger.log(`Setting bitrate to ${bitrate_to_set} kbps`)

        await NetflixBitrateMenu.set_bitrate(bitrate_to_set)
        this.decrement_bitrate_index()
    }

    private decrement_bitrate_index = (): void => {
        this.bitrate_index > 0 ? this.bitrate_index -= 1 : this.bitrate_index = 0
    }

    private calculate_timeout = () : number=> {
        const jitters = [-(this.bitrate_change_jitter as number), this.bitrate_change_jitter as number]
        return this.bitrate_change_interval as number + jitters[Math.round(Math.random())] 
    }
}

export default QualityDecreaser