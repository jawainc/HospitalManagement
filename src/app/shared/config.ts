export  class Config{

  private readonly _api_server : string = 'http://127.0.0.1:3000';


  /**
   * get api server address
   * @returns {string}
   */
  public get api_server(): string {
     return this._api_server;
  }

}
