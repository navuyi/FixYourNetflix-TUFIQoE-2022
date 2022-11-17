import { CustomLogger } from "../../utils/classes/CustomLogger";
import { NetflixBitrateMenu } from "../../utils/classes/NetflixBitrateMenu";
import { wait_for_video_to_load } from "../../utils/wait_for_video_to_load";

export class QualityDecreaser {
   
    private logger : CustomLogger
    private bitrate_index : number
    private interval : ReturnType<typeof setInterval> | undefined

    constructor(){
        this.logger = new CustomLogger("[QualityScenarioManager]")
        this.bitrate_index = 0
    }


    public init = async () : Promise<void> => {
        await wait_for_video_to_load()

        await this.set_init_bitrate()
        this.start_bitrate_changes()
    }

    private set_init_bitrate = async () : Promise<void> => {
        const available_bitrates = await NetflixBitrateMenu.get_available_bitrates()
        this.bitrate_index = available_bitrates.length-1

        await this.set_bitrate()
    }

    private start_bitrate_changes = () : void => {
        this.interval = setInterval(async () => {
            await this.set_bitrate()
        }, 60000)
    }

   
    private set_bitrate = async () : Promise<void> => {
        const bitrates = await NetflixBitrateMenu.get_available_bitrates()
        const next_bitrate = bitrates[this.bitrate_index]
        
        this.decrement_bitrate_index()

        await NetflixBitrateMenu.set_bitrate(next_bitrate)
    }

    private decrement_bitrate_index = (): void => {
        this.bitrate_index > 0 ? this.bitrate_index -= 1 : this.bitrate_index = 0
    }
}

export default QualityDecreaser