import { PagerService } from './../pagination/pager.service';
import { EventModel } from 'src/app/models/eventModel';
import { EventService } from 'src/app/services/event.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-event',
  templateUrl: './table-event.component.html',
  styleUrls: ['./table-event.component.css']
})
export class TableEventComponent implements OnInit {
  events: EventModel[];
  eventType;
  selectedEvent: EventModel;
  confirmDelete = false;
  totalItemCount: number;
  allItems

  constructor(private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private pagerService:PagerService,
    private eventsService:EventService) {
    // this.events = this.route.snapshot.data['eventList']
  }

  ngOnInit() {
    this.events = this.route.snapshot.data['eventList'];
    
   this.deleteEvent(event);
    this.getType();
    this.eventsService.pagination(1,"10").subscribe(res => {
      console.log(res);
      this.totalItemCount = +res.headers.get('X-Total-Count')
      console.log(this.allItems = res.body);
      // console.log(`"Total count": ${this.pageCount.length - 1}`)       
    });
    //pagination
  //   this.eventService.pagination('1', '4').subscribe(res => {
  //     this.eventsTotalCount = res.headers.get('X-Total-Count');
  //     this.allEvents = res.body;
  // });
  

  }
  getEv() {
   this.eventService.getEvent().subscribe(event => this.events = event);
  }
  getType() {
    this.eventService.getEventType().subscribe(type => this.eventType = type);
  }
  editEvent(event) {
    this.selectedEvent = event;
    this.router.navigate(['/edit', event.id]);
    console.log(event.id);
    console.log(this.selectedEvent);
  }
  deleteEvent(event) {
    console.log(event.id);
    this.eventService.deleteEvent(event.id).subscribe(() => console.log(`Event with id = ${event.id} deleted`));
    const i = this.events.findIndex(u => u.id == event.id);
    if (i !== -1) {
      this.events.splice(i, 1);
    }
    this.confirmDelete = false
  }
  createEvent() {
    this.router.navigate(['/edit',0])
  }
  closeEvent(){
    this.confirmDelete = false;
  }

  

}
