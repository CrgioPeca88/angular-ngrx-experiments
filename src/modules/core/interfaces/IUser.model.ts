export interface IUser {
  username: string;
  password: string;
}

export let iUserDefaultInstance: () => IUser = () => {
  return { username: "", password: "" };
};
