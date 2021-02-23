export class AppVersionModel {
  public statusCode: number;
  public status: string;
  public serverZone: string;
  public currentServerTime: string;
  public isInMaintenance: string;
  public appInfo: object;
  public ALLOWED_MINIMUM_APP_VERSION?: string;
}
