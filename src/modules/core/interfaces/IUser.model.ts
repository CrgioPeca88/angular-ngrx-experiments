export interface IUser {
  email: string;
  password: string;
  username: string;
}

export let iUserDefaultInstance: () => IUser = () => {
  return {
    email: "",
    password: "",
    username: ""
  };
};
