import { Day } from '../model/day.model';

export class CalendarCreator {
    private currentyear: number;
    private currentMonthIndex: number;

    constructor() {
        let date = new Date();
        this.currentyear = date.getFullYear();
        this.currentMonthIndex = date.getMonth();
    }

    // Initialize Day Model
    createDay(dayNumber: number, monthIndex: number, year: number) {
        let day = new Day();
        day.dayNumber = dayNumber;

        day.monthIndex = monthIndex;
        day.month = this.getMonthName(monthIndex);

        day.year = year;
        day.dayOfWeek = new Date(year, monthIndex, dayNumber).getDay();

        return day;
    }

    //Create Array Of Days
    public getMonthDays(monthIndex: number, year: number): Day[] {
        let days = [];
        let firstDay = this.createDay(1, monthIndex, year);

        //  Create Empty Days Before First Day Of Month
        for (let i = 1; i < firstDay.dayOfWeek; i++) {
            days.push({
                dayNumber: 0,
                dayOfWeek: i,
                monthIndex: monthIndex,
                year: year
            } as Day);
        }
        days.push(firstDay);

        //Create Day Numbers
        let countDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        for (let i = 2; i < countDaysInMonth + 1; i++) {
            days.push(this.createDay(i, monthIndex, year));
        }
        return days;
    }

    public getCurrentMonth(): Day[] {
        return this.getMonthDays(this.currentMonthIndex, this.currentyear);
    }

    public getMonthName(monthIndex: number): string {
        switch (monthIndex) {
            case 0:
                return "Januery";
            case 1:
                return "Febuery";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
        }
    }
}
