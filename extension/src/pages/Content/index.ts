import {CustomPlayer} from "./CustomPlayer"
import { QualityEnhancer } from "./QualityEnhancer"
import { DebugMenuAnalyzer } from "./DebugMenuAnalyzer"
import { NetflixBitrateMenu } from "../../utils/classes/NetflixBitrateMenu"
import { NetflixDebugMenu } from "../../utils/classes/NetflixDebugMenu"


const init = async () : Promise<void> => {

    //const customPlayer = new CustomPlayer()
    //await customPlayer.init()

    const qualityEnhancer = new QualityEnhancer()
    await qualityEnhancer.init()

    const element : HTMLTextAreaElement = await NetflixDebugMenu.get_html_element()
    console.log(element)


    const s = document.createElement("script")
    s.src = chrome.runtime.getURL("netflixControls.bundle.js");
    
    (document.head || document.documentElement).appendChild(s);
    s.remove()

}

init()












