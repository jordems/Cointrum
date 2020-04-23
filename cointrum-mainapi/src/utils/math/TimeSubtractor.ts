import { ICycleDurations } from "../../types/exchange";

export default function subtractTime(date: Date, interval: ICycleDurations): Date{
    if(interval.includes("m")){
        let newDate = date;
        newDate.setMinutes(newDate.getMinutes() - parseInt(interval));
        return newDate;
    }else if(interval.includes("h")){
        let newDate = date;
        newDate.setHours(newDate.getHours() - parseInt(interval));
        return newDate;
    }else if(interval.includes("d")){
        let newDate = date;
        newDate.setDate(newDate.getDate() - parseInt(interval));
        return newDate;
    }

    return date;
}