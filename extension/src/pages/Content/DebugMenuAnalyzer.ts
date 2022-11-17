import { CustomLogger } from "../../utils/classes/CustomLogger"
import { NetflixDebugMenu } from "../../utils/classes/NetflixDebugMenu"


export class DebugMenuAnalyzer{
    private logger : CustomLogger
    private debug_menu : HTMLTextAreaElement | undefined

    constructor(){
        this.logger = new CustomLogger("[DebugMenuAnalyzer]")
    }


    public init = async () : Promise<void> => {
        this.debug_menu = await NetflixDebugMenu.get_html_element()
    }
}