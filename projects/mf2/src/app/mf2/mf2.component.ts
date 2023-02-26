import { Component, Inject, Optional } from '@angular/core';
import { EventBusService, EVENT_BUS } from 'event-bus-mf-demo';

@Component({
  selector: 'app-mf2',
  templateUrl: './mf2.component.html',
  styleUrls: ['./mf2.component.scss'],
})
export class Mf2Component {
  constructor(
    @Optional() @Inject(EVENT_BUS) private eventBus: EventBusService
  ) {}

  public onMf2ButtonClick(): void {
    this.eventBus.dispatchEvent({
      name: 'mf2ButtonClick',
      source: 'mf2',
      payload: {},
    });
  }
}
