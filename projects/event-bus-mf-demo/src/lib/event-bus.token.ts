import { EventBusService } from './event-bus.service';
import { InjectionToken } from '@angular/core';

export const EVENT_BUS = new InjectionToken<EventBusService>('EventBusService');
