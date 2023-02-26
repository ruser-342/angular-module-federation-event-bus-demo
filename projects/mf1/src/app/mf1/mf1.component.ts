import { Component, Inject, Optional } from '@angular/core';
import { EventBusService, EVENT_BUS } from 'event-bus-mf-demo';

@Component({
  selector: 'app-mf1',
  templateUrl: './mf1.component.html',
  styleUrls: ['./mf1.component.scss'],
})
export class Mf1Component {
  constructor(
    @Optional() @Inject(EVENT_BUS) private eventBus: EventBusService
  ) {}

  public onMf1ButtonClick(): void {
    this.eventBus.dispatchEvent({
      name: 'mf1ButtonClick',
      source: 'mf1',
      payload: {},
    });
  }
}
