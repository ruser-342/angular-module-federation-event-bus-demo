import { Action } from "./action";

export interface Config {
    source: string;
    actions: Action[];
    eventName: string;
}