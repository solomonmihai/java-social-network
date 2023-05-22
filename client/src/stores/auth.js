import { Store } from "pullstate";

const AuthStore = new Store({
  token: null,
});

export default AuthStore;
