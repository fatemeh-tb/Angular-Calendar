import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { CalendarCreator } from '../service/calendarCreator.service'
import { Day } from '../model/day.model';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ["./calendar.component.css"],
})

export class CalendarComponent implements OnInit {
    @ViewChild('event', { static: false }) event: ElementRef;
    showContainer: boolean = false;

    public currentDate = new Date();

    public monthDays: Day[];
    public weekDaysName = [];

    public today: number = this.currentDate.getDate()
    public monthNumber: number = this.currentDate.getMonth();
    public year: number = this.currentDate.getFullYear();

    public selectedDay = this.today;
    public selectedMonth = this.monthNumber;
    public selectedYear = this.year;

    constructor(public calendarCreator: CalendarCreator, private renderer: Renderer2) { }

    ngOnInit(): void {
        this.setMonthDays(this.calendarCreator.getCurrentMonth());

        this.weekDaysName.push("Mon");
        this.weekDaysName.push("Tue");
        this.weekDaysName.push("Wed");
        this.weekDaysName.push("Thu");
        this.weekDaysName.push("Fri");
        this.weekDaysName.push("Sat");
        this.weekDaysName.push("Sun");
    }

    onNextMonth(): void {
        this.monthNumber++;
        if (this.monthNumber > 11) {
            this.monthNumber = 0
            this.year++;
        }
        this.setMonthDays(this.calendarCreator.getMonthDays(this.monthNumber, this.year))
    }

    onPreviousMonth(): void {
        this.monthNumber--;
        if (this.monthNumber < 0) {
            this.monthNumber = 11
            this.year--;
        }
        this.setMonthDays(this.calendarCreator.getMonthDays(this.monthNumber, this.year));
    }

    selectedDate(e) {
        this.currentDate = new Date(this.year + '/' + (this.monthNumber + 1) + '/' + e.getAttribute('data-dayNumber'));
        // console.log(e)
    }

    addClass(ev) {
        // console.log(this.event.nativeElement)
        //event.srcElement.classList.add("selected")
        const hasClass = ev.classList.contains('selectedDay')
        console.log(hasClass)
        this.renderer.removeClass(ev, 'selectedDay')
        if (!hasClass) {
            this.renderer.addClass(ev, 'selectedDay')
        }
    }

    private setMonthDays(days: Day[]): void {
        this.monthDays = days;
        this.monthNumber = this.monthDays[0].monthIndex;
        this.year = this.monthDays[0].year;
    }
}