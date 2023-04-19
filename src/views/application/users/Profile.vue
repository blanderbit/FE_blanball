<template>
  <PublicProfile :userData="publicUserData" />
</template>

<script>
import PublicProfile from '../../../components/main/publicProfile/PublicProfile.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { API } from '../../../workers/api-worker/api.worker';
export default {
  name: 'PlayerPage',
  components: {
    PublicProfile,
  },
  setup() {
    const route = useRoute();

    const publicUserData = ref(route.meta.publicUserData?.data);

    watch(
      () => route.path,
      async (value) => {
        const response = await API.UserService.getUserPublicProfile(
          value.split('/').slice(-1)[0]
        );
        publicUserData.value = response.data;
      }
    );

    return {
      publicUserData,
    };
  },
};
</script>
