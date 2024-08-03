interface IMsg {
  push(arg0: { 
    message: string; 
    date: string; 
    username: string | undefined; 
    name: string | undefined; 
    lastName: string | undefined; 
  }): unknown;
  message?: string;
  date?: string;
  username?: string;
  name?: string,
  lastName?: string,
}

export default IMsg;