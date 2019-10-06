import Alert from '@/components/error/Alert.vue';

export const AlertMixin = {
  components: {
    Alert,
  },

  data() {
    return {
      error: null,
    };
  }
};
