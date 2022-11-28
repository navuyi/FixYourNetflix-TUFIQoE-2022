import { CustomLogger } from "../../utils/classes/CustomLogger";
import { NetflixBitrateMenu } from "../../utils/classes/NetflixBitrateMenu";
import { NetflixDebugMenu } from "../../utils/classes/NetflixDebugMenu";
import { NetflixPlayerAPI } from "../../utils/classes/NetflixPlayerAPI";
import { extract_buffering_bitrate_video } from "../../utils/debug_menu_analysis";
import QualityDecreaser from "./QualityDecreaser";

export class QualityEnhancer{
    private logger : CustomLogger
    private qualityDecreaser : QualityDecreaser

    constructor(qualityDecreaser : QualityDecreaser){
        this.logger = new CustomLogger("[QualityEnhancer]")
        this.qualityDecreaser = qualityDecreaser
    }

    public init = async () : Promise<void> => {
        window.document.onkeydown = async (e) => {
            if(e.key === "G"){
               await this.reset_video_quality()
            }
        }
    }

    private reset_video_quality = async () : Promise<void> => {
        this.logger.log("Resetting video quality...")

        // Stop quality decreasing process
        this.qualityDecreaser.stop_bitrate_changes()
        
        // Pause video
        // NetflixPlayerAPI.pause_video() <-- can not pause here because it stops video from buffering
        const reset_start = await NetflixPlayerAPI.get_current_time() // <-- Getting timestamp because the playback continues in background (muted and hidden)
        const start = new Date()
        NetflixPlayerAPI.hide_video_player()
        NetflixPlayerAPI.set_video_muted(true)
        // Display some info on video quality being enhanced 

        // Set highest bitrate available
        const available_bitrates = await NetflixBitrateMenu.get_available_bitrates()
        const highest_bitrate_available = available_bitrates[available_bitrates.length - 1]
        await NetflixBitrateMenu.set_bitrate(highest_bitrate_available)

        // Wait for expected bitrate to buffer
        await this.wait_for_expected_bitrate(highest_bitrate_available)

        // Reset buffer
        await this.reset_buffer(reset_start)
        
        // Resume video
        NetflixPlayerAPI.reveal_video_player()
        NetflixPlayerAPI.set_video_muted(false)

        const reset_end = new Date()
        this.logger.log(`This reset took: ${reset_end.getTime() - start.getTime()}`)

        // Resume quality decreasing process
        await this.qualityDecreaser.init_bitrate_index()
        await this.qualityDecreaser.start_bitrate_changes()

    }

    private reset_buffer = async (reset_start : number) : Promise<void> => {
        const video_duration = await NetflixPlayerAPI.get_video_duration()
        const current_timestamp = await NetflixPlayerAPI.get_current_time()
        this.logger.log(video_duration)
        this.logger.log(current_timestamp)

        await NetflixPlayerAPI.seek(Math.round(video_duration/2)) // seek to half of the video length
        await NetflixPlayerAPI.seek(Math.round(video_duration/4)) // seek to half of the video length
        await NetflixPlayerAPI.seek(reset_start-5) // seek to quarter of the video length
    }

    private wait_for_expected_bitrate = async (expected_bitrate : number) : Promise<void> => {
        let retry_interval : ReturnType<typeof setInterval>
        const element = await NetflixDebugMenu.get_html_element()

        return new Promise(resolve => {
            retry_interval = setInterval(() => {
                const current_bitrate = Number(extract_buffering_bitrate_video(element.value))
                if(current_bitrate === expected_bitrate){
                    clearInterval(retry_interval)
                    resolve()
                }
            }, 100)
        })
    }
}