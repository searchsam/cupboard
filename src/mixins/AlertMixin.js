import Alert from '@/components/error/Alert/Alert.vue';

export const AlertMixin = {
  components: {
    Alert,
  },

  data() {
    return {
      error: null,
    };
  },
};
