export interface IUser {
  email: string;
  password: string;
  username: string;
}

export const iUserDefaultInstance: () => IUser = () => {
  return {
    email: "",
    password: "",
    username: ""
  };
};
