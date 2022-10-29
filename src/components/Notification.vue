<template>
    <div class="notification" :class="[notificationType]">
        <loading ref="loading"></loading>
        <div class="notification-read" v-if="notificationInstance.isRead"></div>
        <div class="notification-title">{{notificationInstance.title}}</div>
        <div class="notification-date">{{formatDate}}</div>
        <div class="notification-content" v-for="item in notificationInstance.texts">{{item}}</div>
        <div class="notification-actions" v-if="notificationInstance?.actions?.length">
            <template v-for="item in notificationInstance.actions">
                <NotificationButton
                        @click="$emit('handler-action', item)"
                        :button-type="item.buttonType"
                        :button-color="item.buttonColor"
                >
                    {{item.text}}
                </NotificationButton>
            </template>

        </div>
        <div class="notification-close" v-if="isPush" @click="$emit('handler-close')">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.189895 0.189192C0.433973 -0.0548856 0.829701 -0.0548852 1.07378 0.189193L5.00069 4.11612L8.92758 0.189194C9.17166 -0.0548846 9.56739 -0.0548862 9.81147 0.189191C10.0555 0.433267 10.0555 0.828995 9.81147 1.07307L5.88458 5L9.81147 8.92689C10.0555 9.17097 10.0555 9.5667 9.81147 9.81077C9.56739 10.0549 9.17166 10.0549 8.92759 9.81077L5.00069 5.88388L1.07378 9.81078C0.829698 10.0549 0.43397 10.0549 0.189893 9.81077C-0.0541841 9.5667 -0.0541829 9.17097 0.189896 8.92689L4.11681 5L0.189894 1.07308C-0.0541837 0.828997 -0.0541833 0.433269 0.189895 0.189192Z" fill="#DFDEED"/>
            </svg>
        </div>
    </div>
</template>

<script>
    import dayJs from 'dayjs'
    import Loading from './../workers/loading-worker/Loading.vue'
    import NotificationButton from './../components/NotificationButton.vue'
    export default {
        name: "Notification",
        components: {
            Loading,
            NotificationButton
        },
        emits: ['handler-action'],
        props: {
            notificationInstance: {
                type: Object,
                default: () => ({})
            },
            active: {
                type: Boolean,
                default: false
            },
            notificationType: {
                type: String,
                default: 'notification-standard' // push
            }
        },
        watch: {
            active(value) {
                if(value) {
                    this.$refs.loading.start();
                } else {
                    this.$refs.loading.finish()
                }
            }
        },
        computed: {
            formatDate() {
                return dayJs(String(this.notificationInstance.date)).format('DD.MM.YYYY')
            },
            isPush() {
                return this.notificationType === 'push'
            },
            isStandard() {
                return this.notificationType === 'standard'
            }
        }
    }
</script>

<style scoped lang="scss">

    .notification-content {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: #DFDEED;
        margin-bottom: 12px;
    }

    .notification-title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #FFFFFF;
    }

    .notification-date {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: #A8A8BD;
        margin-bottom: 8px;
    }

    .notification-action {
        display: inline-block;
        padding: 2px 12px;
        background: #575775;
        border-radius: 6px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
        margin-right: 8px;
    }

    .notification-close {
        position: absolute;
        right: 20px;
        top: 20px;
        height: 10px;
        width: 10px;
        transition: 0.4s all;
        transform-origin: center;
        svg {
            transform: translateY(-6px);
        }
        &:hover {
            cursor: pointer;
            transform: rotateZ(90deg);
            path {
                fill: #d3d3d3;
            }
        }
    }



    ::v-deep {
        .spiner-text {
            display: none;
        }
        .spiner-wrapper {
            position: absolute;
            background: rgba(239, 239, 246, 0.38);
            width: 100%;
        }
        .spiner-wrapper .spiner-body {
            background: transparent;
            height: 100%;
            .spiner {
                .lds-ring, .lds-ring div {
                    width: 50px;
                    height: 50px;
                }
                .lds-ring div {
                    border-color: white transparent transparent transparent;
                }
            }
        }
    }

    .notification-read {
        position: absolute;
        width: 100%;
        height: 100%;
        background: white;
        opacity: 0.8;
    }
</style>