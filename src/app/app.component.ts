import {
  ChangeDetectorRef,
  Compiler,
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { EventBusService, EVENT_BUS, Config, Action } from 'event-bus-mf-demo';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { loadRemoteModule } from './dynamic-module';

const mf1Config: Config = {
  source: 'mf1',
  actions: [
    {
      name: 'openMf',
      payload: {
        remoteEntry: 'http://localhost:4000/remoteEntry.js',
        remoteName: 'mf2',
        moduleName: 'Mf2Module',
      },
    },
  ],
  eventName: 'mf1ButtonClick',
};
const mf2Config: Config = {
  source: 'mf2',
  actions: [
    {
      name: 'openMf',
      payload: {
        remoteEntry: 'http://localhost:3000/remoteEntry.js',
        remoteName: 'mf1',
        moduleName: 'Mf1Module',
      },
    },
  ],
  eventName: 'mf2ButtonClick',
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('componentContainer', { read: ViewContainerRef })
  public componentContainerRef: ViewContainerRef;

  private destroy$ = new Subject<void>();
  constructor(
    @Optional() @Inject(EVENT_BUS) private eventBus: EventBusService,
    private readonly injector: Injector,
    private readonly cfr: ComponentFactoryResolver,
    private readonly cdr: ChangeDetectorRef,
    private readonly compiler: Compiler
  ) {}

  ngOnInit(): void {
    this.loadMf('http://localhost:3000/remoteEntry.js', 'mf1', 'Mf1Module');
    this.eventBus.init();
console.log('app .eventBus', this.eventBus);

    this.eventBus.addConfig(mf1Config);
    this.eventBus.addConfig(mf2Config);

    this.eventBus.actions$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ name, payload }: Action) => {
        if (name === 'openMf') {
          this.loadMf(
            payload.remoteEntry,
            payload.remoteName,
            payload.moduleName
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.eventBus.onDestroy();
  }

  async loadMf(
    remoteEntry: string,
    remoteName: string,
    moduleName: string
  ): Promise<void> {
    const factory = await loadRemoteModule(remoteEntry, remoteName, 'Module');

    await this.initComponent(factory[moduleName]);
  }

  private async initComponent(module: any): Promise<void> {
    const moduleFactory: any = await this.compiler.compileModuleAsync(module);

    const moduleRef: any = moduleFactory.create(this.injector);

    const componentType = moduleRef.instance.getEntryPoint();

    const componentFactory = this.cfr.resolveComponentFactory(componentType);

    this.componentContainerRef.clear();

    this.componentContainerRef.createComponent(
      componentFactory,
      undefined,
      this.injector,
      [],
      moduleRef
    );

    this.cdr.detectChanges();
  }
}
