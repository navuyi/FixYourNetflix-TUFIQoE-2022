import { ChromeStorage } from "../../utils/custom/ChromeStorage"
import { CustomLogger } from "../../utils/custom/CustomLogger"
import { NetflixDebugMenu } from "../../utils/netflix/NetflixDebugMenu"
import { extract_debug_menu_data } from "../../utils/debug_menu_analysis"
import { get_local_datetime } from "../../utils/time_utils"
import { post_playback_data } from "../../utils/http_requests/post_playback_data"
import { MESSAGE_HEADERS, T_MESSAGE } from "../../config/messages.config"
import { NetflixPlayerAPI } from "../../utils/netflix/NetflixPlayerAPI"
import { patch_video_ended} from "../../utils/http_requests/patch_video_ended"
import { patch_experiment_ended } from "../../utils/http_requests/patch_experiment_ended"


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
        this.interval = setInterval(async () => {
            // Check if debug menu is not null
            if(!this.debug_menu) return;

            const timestamp = get_local_datetime(new Date())
            const data = extract_debug_menu_data(this.debug_menu.value, timestamp)
            const archive = {
                data: this.debug_menu.value,
                timestamp: timestamp
            }
            
            // Send data to backend
            await post_playback_data(data, archive)

            // Check if video has finished
            await this.check_video_finished()

        }, interval_value)
    }

    private check_video_finished = async () : Promise<void> => {
        const outer_container = document.getElementsByClassName("nfa-pos-abs nfa-bot-6-em nfa-right-5-em nfa-d-flex")[0]
        const player_space = document.getElementsByClassName("PlayerSpace")[0]
        const back_to_browse = document.getElementsByClassName("BackToBrowse")[0]

        // Click watch credits in case of common series episode
        if([outer_container, player_space, back_to_browse].some(el => el != null)){
            // Clear analyze interval
            clearInterval(this.interval)

            // Pause video
            NetflixPlayerAPI.pause_video()

            // Simulate click on watch-credits-button in order to avoid default Netflix behaviour
            if(outer_container){
                const credits_button = document.querySelectorAll('[data-uia="watch-credits-seamless-button"]')[0] as HTMLButtonElement
                credits_button.click()
                outer_container.remove() 
            }

            // Update finished video
            const variables = await ChromeStorage.get_experiment_variables()
            const settings = await ChromeStorage.get_experiment_settings()
            
            // Update current video finished time
            await patch_video_ended()

            if(variables.video_index < settings.video_url.length){
                variables.video_index += 1
                await ChromeStorage.set_experiment_variables(variables)
            }
            else{
                // Experiment finished
                await patch_experiment_ended()
            }

            // Send FINISHED signal to the BackgroundScript
            const message : T_MESSAGE = {
                header: MESSAGE_HEADERS.FINISHED
            }
            await chrome.runtime.sendMessage(message)
        }
    }
}











/*
     * This method checks if certain HTML elements are available in DOM tree.
     * Their availability indicates that serie's video is about to end and credits are present.
     * If elements are detected video playback ends and subject is redirected to custom extension's web page

async are_credits_available(){ 
    const outer_container = document.getElementsByClassName("nfa-pos-abs nfa-bot-6-em nfa-right-5-em nfa-d-flex")[0]

    // data-uia = "watch-credits-seamless-button"   // Leave this for reference purpose
    // data-uia="next-episode-seamless-button"      // Leave this for reference purpose
    
    // Checking PlayerSpace class element in case of last episode of the last season
    const player_space = document.getElementsByClassName("PlayerSpace")[0]

    // This element is displayed when last video of last season is played or a standalone movie
    const back_to_browse = document.getElementsByClassName("BackToBrowse")[0]

    if(back_to_browse){
        clearInterval(this.interval)

        // Pause the video
        document.getElementsByTagName("video")[0].pause()

        // Send FINISHED signal to the BackgroundScript
        const message : T_MESSAGE = {
            header: MESSAGE_HEADERS.FINISHED
        }
        await chrome.runtime.sendMessage(message)
        
    }
    else if(player_space){
        // Stop analyzing
        clearInterval(this.interval)

        // Pause the video
        document.getElementsByTagName("video")[0].pause()

        // Send FINISHED signal to the BackgroundScript
        const message : T_MESSAGE = {
            header: MESSAGE_HEADERS.FINISHED
        }
        await chrome.runtime.sendMessage(message)
    }
    else if(outer_container){
        // Click watch credits button
        const credits_button = document.querySelectorAll('[data-uia="watch-credits-seamless-button"]')[0] as HTMLButtonElement
        credits_button.click()
        outer_container.remove() // remove container

        // Stop analyzing
        clearInterval(this.interval)

        // Pause the video
        document.getElementsByTagName("video")[0].pause()

        // Send FINISHED signal to the BackgroundScript
        const message : T_MESSAGE = {
            header: MESSAGE_HEADERS.FINISHED
        }
        await chrome.runtime.sendMessage(message)
    }
}
*/