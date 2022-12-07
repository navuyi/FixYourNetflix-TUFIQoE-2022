import {CustomPlayer} from "./CustomPlayer"
import { QualityIncreaser} from "./QualityIncreaser"
import { DebugMenuAnalyzer } from "./DebugMenuAnalyzer"
import { NetflixBitrateMenu } from "../../utils/classes/NetflixBitrateMenu"
import { NetflixDebugMenu } from "../../utils/classes/NetflixDebugMenu"
import QualityDecreaser from "./QualityDecreaser"


const init = async () : Promise<void> => {
    inject_netflix_controls_script()

    // First create and initialize DebugMenuAnalyzer instance
    const debugAnalyzer = new DebugMenuAnalyzer()
    await debugAnalyzer.init()

    // Second create and initialize CustomPlayer instance <-- in order to remove default player controls
    const customPlayer = new CustomPlayer()
    //await customPlayer.init()

    // Third create QualityDecreaser instance
    const qualityDecreaser = new QualityDecreaser()
    await qualityDecreaser.init()

    // Fourth create QualityIncreaser instance
    const qualityIncreaser = new QualityIncreaser(qualityDecreaser)
    await qualityIncreaser.init()
}


const inject_netflix_controls_script = () => {
    const s = document.createElement("script")
    s.src = chrome.runtime.getURL("netflixControls.bundle.js");

    (document.head || document.documentElement).appendChild(s);
    s.remove()
}

init()












