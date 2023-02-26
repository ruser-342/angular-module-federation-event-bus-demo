export interface Action {
    name: string;
    payload: any;
    eventPayload?: any;
}