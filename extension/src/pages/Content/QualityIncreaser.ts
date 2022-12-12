import { CustomLogger } from "../../utils/custom/CustomLogger";
import { NetflixBitrateMenu } from "../../utils/netflix/NetflixBitrateMenu";
import { NetflixPlayerAPI } from "../../utils/netflix/NetflixPlayerAPI";
import { VideoCurtain } from "../../utils/custom/VideoCurtain";
import QualityDecreaser from "./QualityDecreaser";
import { wait_for_rendering_state_playing } from "../../utils/waiters/wait_for_rendering_state_playing";
import { wait_for_expected_bitrate_buffering } from "../../utils/waiters/wait_for_expected_bitrate_buffering";
import { ChromeStorage } from "../../utils/custom/ChromeStorage";

export class QualityIncreaser{
    private logger : CustomLogger
    private qualityDecreaser : QualityDecreaser
    private videoCurtain : VideoCurtain
    private cooldown_active : boolean

    constructor(qualityDecreaser : QualityDecreaser){
        this.logger = new CustomLogger("[QualityIncreaser]", "steelblue")
        this.qualityDecreaser = qualityDecreaser
        this.videoCurtain = new VideoCurtain("quality-increaser-curtain", "Video quality is being increased. Please wait.")
        this.cooldown_active = false
    }

    public init = async () : Promise<void> => {
        window.document.onkeydown = async (e) => {
            if(e.key === "G" && this.cooldown_active === false){
                this.cooldown_active = true // enable quality increase cooldown
                await this.reset_video_quality()
                this.cooldown_active = false // disable cooldown after process has finished
            }
        }
    }

    /**
     * Resets video quality to highest possible value
    */
    private reset_video_quality = async () : Promise<void> => {
        this.logger.log("Proceeding to reset video quality...")

        // Stop quality decreasing process
        this.qualityDecreaser.stop_bitrate_changes()
        
        // Hide resetting process from subject
        const request_time = await NetflixPlayerAPI.get_current_time()
        this.hide_video_player()
        
        // Set highest bitrate available
        const available_bitrates = await NetflixBitrateMenu.get_available_bitrates()
        const highest_bitrate_available = available_bitrates[available_bitrates.length - 1]
        await NetflixBitrateMenu.set_bitrate(highest_bitrate_available)

        // Reset buffer
        await this.buffer_seek_reset(request_time)
        await wait_for_expected_bitrate_buffering(highest_bitrate_available)
        
        // Resume video
        await wait_for_rendering_state_playing()
        await this.reveal_video_player()
        

        // Resume quality decreasing process - resuming 2-5 seconds after resuming playback - giving some time for the highest quality to buffer
        // Marked as irrelevant for now
        setTimeout(async () => {
            await this.qualityDecreaser.init_bitrate_index(true)
            await this.qualityDecreaser.set_new_bitrate()
            await this.qualityDecreaser.start_bitrate_changes()
        }, 5000)
    }

    /**
     * Blocks video playback from subject
    */
    private hide_video_player = () : void => {
        this.logger.log("Hiding video player")
        NetflixPlayerAPI.set_video_muted(true)
        //NetflixPlayerAPI.pause_video()
        this.videoCurtain.reveal()
    }

    /**
     * Reveals video playback to the subject
    */
    private reveal_video_player = async () : Promise<void> => {
        this.logger.log("Revealing video player")
        NetflixPlayerAPI.set_video_muted(false)
        //await NetflixPlayerAPI.resume_video()
        this.videoCurtain.remove()
    }


    /**
     * Method uses NetflixPlayerAPI in order to reset video buffer by seeking video.
     * Playback resumes at the time passed as parameter
     * @param video_pause_time 
    */
    private buffer_seek_reset = async (video_pause_time : number) : Promise<void> => {
        const video_duration = await NetflixPlayerAPI.get_video_duration()
        const delay = 250 //ms

        // Seek to beginning of video immediately
        NetflixPlayerAPI.seek(0)

        // Seek to the other positions after certain delay
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
        await new Promise<void>(resolve => {
            setTimeout(async () => {
                const {quality_increase_rewind} = await ChromeStorage.get_experiment_settings()
                NetflixPlayerAPI.seek(video_pause_time - Math.round(quality_increase_rewind/1000))
                resolve()
            }, delay)
        })  
    }
}

