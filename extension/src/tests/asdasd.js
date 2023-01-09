const get_local_datetime = (object) => {
    const year = object.getFullYear();
    const month = (object.getMonth()+1).toString().padStart(2, "0");
    const day = object.getDate().toString().padStart(2, "0");

    const hours = object.getHours().toString().padStart(2, "0");
    const minutes = object.getMinutes().toString().padStart(2, "0");
    const seconds = object.getSeconds().toString().padStart(2, "0");
    const milliseconds = object.getMilliseconds().toString().padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;   // <-- Local datetime in extended ISO format ''YYYY-MM-DDTHH:MM:SS:XXX''
}

const time_string = "2023-12-12T18:49:20.132"
console.log(get_local_datetime(new Date(time_string)) === time_string)