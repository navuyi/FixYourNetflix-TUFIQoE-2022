import { get_local_datetime } from "../time_utils"


export class CustomLogger{
    private prefix : string
    private original_logger: Function

    constructor(prefix : string){
        this.prefix = prefix
        this.original_logger = console.log
    }

    public log = (content : any) : void => {
        const prefix_date = `${this.prefix} | ${get_local_datetime(new Date())} |`
        this.original_logger(prefix_date, content)
    }
}