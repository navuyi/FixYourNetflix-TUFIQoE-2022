import { CustomLogger } from "../../utils/classes/CustomLogger";
import { NetflixBitrateMenu } from "../../utils/classes/NetflixBitrateMenu";

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
            }
        }
    }

    private reset_video_quality = async () : Promise<void> => {
        await NetflixBitrateMenu.invoke()
        const bitrates = NetflixBitrateMenu.get_available_bitrates()
        NetflixBitrateMenu.set_bitrate(bitrates[bitrates.length - 1])
    }
}