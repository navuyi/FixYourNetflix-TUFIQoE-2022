import {StatsAnalyzer} from "./modules/StatsAnalyzer"

import QualityScenarioManager from "./modules/QualityScenarioManager";
import {CustomPlayer} from "./modules/CustomPlayer";


const init = async () => {
    const statsAnalyzer = new StatsAnalyzer()
    await statsAnalyzer.init()

    const customPlayer = new CustomPlayer()
    await customPlayer.init()

    const qualityScenarioManager = new QualityScenarioManager()
    await qualityScenarioManager.init()
}


init()












