import { Injectable } from '@angular/core';
import { Config } from './config';
import { Observable, Subject } from 'rxjs';
import { Action } from './action';
import { takeUntil } from 'rxjs/operators';
import { BusEvent } from './bus-event';

@Injectable()
export class EventBusService {
  private readonly _events$ = new Subject<BusEvent>();
  private readonly _actions$ = new Subject<Action>();
  private readonly _destroy$ = new Subject<void>();
  private _configs: Config[] = [];

  public get actions$(): Observable<Action> {
    return this._actions$.asObservable();
  }

  public init(): void {
    this._events$
      .pipe(takeUntil(this._destroy$))
      .subscribe((event: BusEvent) => {
        const config: Config = this.findConfig(event);

        if (config) {
          this.invokeAction(config, event);
        }
      });
  }

  public addConfig(config: Config): void {
    this._configs.push(config);
  }

  public dispatchEvent(event: BusEvent): void {
    this._events$.next(event);
  }

  public onDestroy(): void {
    this._destroy$.next();
  }

  private findConfig({ source, name }: BusEvent): Config {
    return this._configs.find(
      (config: Config) =>
        `${source}|${name}` === `${config.source}|${config.eventName}`
    );
  }

  private invokeAction({ actions }: Config, { payload }: BusEvent) {
    actions.forEach((action: Action) =>
      this._actions$.next({ ...action, eventPayload: payload })
    );
  }
}
