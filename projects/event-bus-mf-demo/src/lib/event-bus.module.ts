import { NgModule } from '@angular/core';
import { EventBusService } from './event-bus.service';
import { EVENT_BUS } from './event-bus.token';

@NgModule({
  providers: [{ provide: EVENT_BUS, useExisting: EventBusService }, EventBusService]
})
export class EventBusModule { }
