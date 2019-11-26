export default {
  name: 'NavBar',

  inject: ['me'],

  computed: {
    userType() {
      return {
        0: { type: 'SUPER ADMIN', icon: 'ti-wand' },
        1: { type: 'ADMIN', icon: 'ti-crown' },
        2: { type: 'CLIENTE', icon: 'ti-light-bulb' },
      }[this.me.type];
    },
  },
};
