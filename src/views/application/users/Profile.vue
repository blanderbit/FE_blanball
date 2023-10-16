<template>
  <PublicProfile :userData="publicUserData" />
</template>

<script>
import PublicProfile from '@mainComponents/publicProfile/PublicProfile.vue';




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
        if (route.name === ROUTES.APPLICATION.USERS.GET_ONE.name) {
          const response = await API.UserService.getUserPublicProfile(
            value.split('/').slice(-1)[0]
          );
          publicUserData.value = response.data;
        }
      }
    );

    return {
      publicUserData,
    };
  },
};
</script>
