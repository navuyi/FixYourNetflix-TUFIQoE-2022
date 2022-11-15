import { CustomLogger } from "../../utils/classes/CustomLogger";

export class QualityScenarioManager {
   
    private logger : CustomLogger
  
    constructor(){
        this.logger = new CustomLogger("[QualityScenarioManager]")
    }

}

export default QualityScenarioManager