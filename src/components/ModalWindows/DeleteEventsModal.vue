<template>
    <Transition>
        <ModalWindow :title-color="'#C10B0B'">
            <template #title>
                {{ $t('modals.delete_events.title') }}
            </template>
            <template #title-icon>
                <img src="../../assets/img/warning.svg" alt="" />
            </template>
            <template #delete-account>
                <div class="first-screen">
                    <div class="description-text">
                        {{ $t('modals.delete_events.main-text') }}
                    </div>
                    <div class="btns-block">
                        <div class="delete-acc" @click="closeModal">
                            {{ $t('buttons.cancel-deleting') }}
                        </div>
                        <div class="cancle-delete-acc" @click="deleteEvents">
                            {{ $t('buttons.delete') }}
                        </div>
                    </div>
                </div>
            </template>
        </ModalWindow>
    </Transition>
</template>
  
<script>

import ModalWindow from './ModalWindow.vue'

export default {
    name: 'DeleteAccountModal',
    components: {
        ModalWindow,
    },
    emits: ['closeModal', 'deleteEvents'],
    setup(props, context) {

        function closeModal() {
            context.emit('closeModal')
        }

        function deleteEvents() {
            context.emit('deleteEvents')
        }

        return {
            closeModal,
            deleteEvents,
        }
    },
}
</script>
  
<style lang="scss" scoped></style>