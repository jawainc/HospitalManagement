export class Login {
  constructor(
    public login_id = '',
    public password = ''
  ) { }
  clone() {
    return new Login(this.login_id, this.password);
  }
}
