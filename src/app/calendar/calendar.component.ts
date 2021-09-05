import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { CalendarCreator } from '../service/calendarCreator.service'
import { Day } from '../model/day.model';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ["./calendar.component.css"],
})

export class CalendarComponent implements OnInit {
    showContent: boolean = false;

    public currentDate = new Date();
    public weekDaysName = [];
    public monthDays: Day[];

    public today: number = this.currentDate.getDate()
    public monthNumber: number = this.currentDate.getMonth();
    public year: number = this.currentDate.getFullYear();

    public selectedDay = this.today;
    public selectedMonth = this.monthNumber;
    public selectedYear = this.year;
    selectedItem: number;
    constructor(public calendarCreator: CalendarCreator, private elRef: ElementRef, private renderer: Renderer2) { }

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
    }

    // addClass(ev) {
    //     const hasClass = ev.classList.contains('selectedDay')
    //     this.renderer.removeClass(ev, 'selectedDay')
    //     if (!hasClass) {
    //         this.renderer.addClass(ev, 'selectedDay')
    //     }
    // }

    //Initialize array of month days
    private setMonthDays(days: Day[]): void {
        this.monthDays = days;
        this.monthNumber = this.monthDays[0].monthIndex;
        this.year = this.monthDays[0].year;
    }
}
