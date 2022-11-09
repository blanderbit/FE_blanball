<template>
    <div v-for="(notification) in notifications" class="notification-wrapper">
        <Notification
                :notificationInstance="notification"
                :active="activeNotification === notification.notification_id"
                @handler-action="handlerAction($event, notification)"
        >

        </Notification>
    </div>
</template>

<script>

    import Notification from '../Notification.vue'
    import { useRouter } from 'vue-router'
    import { ref } from "vue";
    import { MessageActionDataTypes, MessageActionTypes } from "../../workers/web-socket-worker/message.action.types";

    export default {
        name: "Notifications",
        components: {
            Notification
        },
        props: {
            notifications: {
                type: Array,
                default: () => []
            }
        },
        setup() {
            let activeNotification = ref(0);
            const router = useRouter();
            const handlerAction = async (item, notificationInstance) => {
                activeNotification.value = notificationInstance.notification_id;
                if (item.actionType === MessageActionDataTypes.Url) {
                    router.push(item.action)
                }

                if (item.actionType === MessageActionDataTypes.UrlCallback) {
                    router.push(item.action({ router, notificationInstance }))
                }

                if (item.actionType === MessageActionDataTypes.Callback) {
                    await item.action({ notificationInstance })
                }

                if (
                    [
                        MessageActionTypes.Action,
                        MessageActionTypes.ActionClose,
                        MessageActionTypes.Close,
                    ].includes(item.type)
                ) {
                    notificationInstance.readAfterActiveActionCallBack(notificationInstance)
                }
                activeNotification.value = 0
            };

            return {
                activeNotification,
                handlerAction
            }
        }
    }
</script>

<style scoped lang="scss">
    .notification-wrapper {
        position: relative;
    }
</style>