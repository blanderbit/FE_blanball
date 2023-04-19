<template>
  <Transition>
    <ModalWindow :title-color="'#C10B0B'">
      <template #title>
        {{ $t('modals.remove_invited_users.title') }}
      </template>
      <template #title-icon>
        <img src="../../../../assets/img/warning.svg" alt="" />
      </template>
      <template #delete-account>
        <div class="first-screen">
          <div class="description-text">
            {{ $t('modals.remove_invited_users.main-text') }}
          </div>
          <div class="btns-block">
            <div class="delete-acc" @click="closeModal">
              {{ $t('buttons.cancel-deleting') }}
            </div>
            <div class="cancle-delete-acc" @click="deleteUsers">
              {{ $t('buttons.delete-users') }}
            </div>
          </div>
        </div>
      </template>
    </ModalWindow>
  </Transition>
</template>

<script>
import ModalWindow from '../../../shared/modals/ModalWindow.vue';

export default {
  name: 'DeleteAccountModal',
  components: {
    ModalWindow,
  },
  emits: ['closeModal', 'deleteUsers'],
  setup(props, context) {
    function closeModal() {
      context.emit('closeModal');
    }

    function deleteUsers() {
      context.emit('deleteUsers');
    }

    return {
      closeModal,
      deleteUsers,
    };
  },
};
</script>

<style lang="scss" scoped></style>
