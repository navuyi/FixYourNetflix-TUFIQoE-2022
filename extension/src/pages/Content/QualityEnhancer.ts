import { CustomLogger } from "../../utils/classes/CustomLogger";
import { NetflixBitrateMenu } from "../../utils/classes/NetflixBitrateMenu";
import { NetflixDebugMenu } from "../../utils/classes/NetflixDebugMenu";
import { NetflixPlayerAPI } from "../../utils/classes/NetflixPlayerAPI";
import { extract_buffering_bitrate_video, extract_playing_bitrate_audio, extract_playing_bitrate_video } from "../../utils/debug_menu_analysis";
import QualityDecreaser from "./QualityDecreaser";

export class QualityEnhancer{
    private logger : CustomLogger
    private qualityDecreaser : QualityDecreaser

    constructor(qualityDecreaser : QualityDecreaser){
        this.logger = new CustomLogger("[QualityEnhancer]", "steelblue")
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
        this.logger.log("Proceeding to reset video quality...")

        // Stop quality decreasing process
        this.qualityDecreaser.stop_bitrate_changes()
        
        // Hide resetting process from subject
        NetflixPlayerAPI.set_video_muted(true)
        NetflixPlayerAPI.pause_video()
        const video_pause_time = await NetflixPlayerAPI.get_current_time()
        
        // Set highest bitrate available
        const available_bitrates = await NetflixBitrateMenu.get_available_bitrates()
        const highest_bitrate_available = available_bitrates[available_bitrates.length - 1]
        await NetflixBitrateMenu.set_bitrate(highest_bitrate_available)

        // Reset buffer
        await this.reset_buffer(highest_bitrate_available, video_pause_time)
        
        // Resume video
        await NetflixPlayerAPI.resume_video()
        NetflixPlayerAPI.set_video_muted(false)
    
        // Resume quality decreasing process - resuming 5 seconds after resuming playback - giving some time for the highest quality to buffer
        setTimeout(async () => {
            await this.qualityDecreaser.init_bitrate_index(true)
            await this.qualityDecreaser.set_new_bitrate()
            await this.qualityDecreaser.start_bitrate_changes()
        }, 2000)
    }


    private reset_buffer = async (expected_bitrate : number, video_pause_time : number) : Promise<void> => {
        const video_duration = await NetflixPlayerAPI.get_video_duration()
        const current_position = await NetflixPlayerAPI.get_current_time()
        let attempt = 1

        return new Promise(resolve => {
            const interval = setInterval(async () => {
                this.logger.log(`Buffer resetting - attempt number: ${attempt}`)
                const delay = 300
                
                await new Promise<void>(resolve => {
                    setTimeout(() => {
                        NetflixPlayerAPI.seek(0)
                        resolve()
                    }, delay)
                })
                await new Promise<void>(resolve => {
                    setTimeout(() => {
                        NetflixPlayerAPI.seek(video_duration/2)
                        resolve()
                    }, delay)
                })
                await new Promise<void>(resolve => {
                    setTimeout(() => {
                        NetflixPlayerAPI.seek(video_duration/4)
                        resolve()
                    }, delay)
                })
                
                const element = await NetflixDebugMenu.get_html_element()
                const buffering_bitrate = Number(extract_buffering_bitrate_video(element.value))

                if(buffering_bitrate === expected_bitrate){
                    clearInterval(interval)
                    this.logger.log("Resetting successfull")
                    NetflixPlayerAPI.seek(video_pause_time)
                    resolve()
                }
                attempt += 1
            }, 1000)
        })
    }
}

