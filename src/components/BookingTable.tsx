
import dayjs from "dayjs";

const TIME_SLOTS = ['08:00-11:00', "11:00-14:00", "14:00-17:00", "17:00-20:00"];

export function BookingTable() {

    const today = dayjs();
    const weekDays = Array.from({ length: 7 }, (_, i) => today.add(i, "day").format("YYYY-MM-DD"))
    return (<>{weekDays}</>)
}