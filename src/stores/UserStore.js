const UserStore = {
  data: {
    user: null
  },
  methods: {
    setAuthUser(loggedUser) {
      UserStore.data.user = loggedUser;
    },
    getAuthUserProp(propName) {
      UserStore.data.user.get(propName);
    }
  }
};

export default UserStore;
