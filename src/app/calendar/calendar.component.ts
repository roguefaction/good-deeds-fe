import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {DeedService} from '../services/deed.service';
import {Deed} from '../models/deed';
import {Router} from '@angular/router';

const colors: any = {
  red: {
    primary: '#DE5B1E',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  grey: {
    primary: '#A8A8A8',
    secondary: '#C8C8C8'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  deeds: Deed[];

  constructor(private modal: NgbModal, private deedService: DeedService, private router: Router) {
    this.getCalendarDeeds();
  }
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];


  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  newEvent: CalendarEvent;

  getCalendarDeeds() {
    this.deedService.getAllDeeds().subscribe(
      deeds => {
        console.log(deeds);
        this.deeds = deeds;
        this.loadEvents(this.deeds);
      },
      error1 => {
        console.log('error');
      },
      () => {
        console.log('completed');
      }
    );
  }

  loadEvents(deeds: Deed[]) {
    let eventColor = colors.grey;
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    this.deeds.forEach((deed) => {
      if (new Date(deed.date) <= today) {
        eventColor = colors.grey;
      } else {
        eventColor = colors.red;
      }
      this.events.push({
        start: new Date(deed.date),
        title: deed.title,
        color: eventColor,
        actions: this.actions,
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: false
      });
    });
    this.refresh.next();
  }


  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  eventDate: Date;

  handleEvent(action: string, event: CalendarEvent): void {
    this.deedService.setDeedToExpand(event.title);
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    if (event.start >= today) {
      console.log(event.title + ' - event is in the future')
      this.deedService.setPageOfDeed(event.title);
      this.router.navigateByUrl('/good-deeds');
    } else {
      console.log(event.title + ' - event is in the past');
      // TODO: show something if event has already passed
    }
  }

  setPageOfDeedInService(titleToSearch: string) {
    this.deedService.getUpcomingDeeds().subscribe(
      deeds => {
        for (let deed of deeds) {
          if (deed.title === titleToSearch) {
            let page = deeds.indexOf(deed) / 5 + 1;
            page = Math.trunc(page);
            this.deedService.setPage(page);
          }
        }
      }
    );
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();

  }

}
