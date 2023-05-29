import { Store } from "pullstate";

const AuthStore = new Store({
  token: null,
  user: null,
});

export default AuthStore;
