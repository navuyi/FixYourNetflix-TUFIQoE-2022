import {StatsAnalyzer} from "./StatsAnalyzer"
import {CustomPlayer} from "./CustomPlayer"


const init = async () : Promise<void> => {
    const statsAnalyzer = new StatsAnalyzer()
    await statsAnalyzer.init()


    const customPlayer = new CustomPlayer()
    await customPlayer.init()
}


init()












