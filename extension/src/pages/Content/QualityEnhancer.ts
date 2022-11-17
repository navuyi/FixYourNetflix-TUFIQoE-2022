import { CustomLogger } from "../../utils/classes/CustomLogger";
import { NetflixBitrateMenu } from "../../utils/classes/NetflixBitrateMenu";
import { NetflixPlayerAPI } from "../../utils/classes/NetflixPlayerAPI";

export class QualityEnhancer{
    private logger : CustomLogger

    constructor(){
        this.logger = new CustomLogger("[QualityEnhancer]")
    }

    public init = async () : Promise<void> => {
        window.document.onkeydown = async (e) => {
            if(e.key === "G"){
                console.log("Resetting")
                await this.reset_video_quality()
                const curr_time = NetflixPlayerAPI.get_current_time() as number
                NetflixPlayerAPI.seek(curr_time - 10)
                NetflixPlayerAPI.seek(curr_time)
            }
        }
    }

    private reset_video_quality = async () : Promise<void> => {
        const bitrates = await NetflixBitrateMenu.get_available_bitrates()
        NetflixBitrateMenu.set_bitrate(bitrates[bitrates.length - 1])
    }
}