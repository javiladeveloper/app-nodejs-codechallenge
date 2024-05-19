export interface Bootstrap {
  initialize(): Promise<boolean | Error>;
}
