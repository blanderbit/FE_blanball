<template>
    <div class="b-bug-report-modal__wrapper">
        <div class="b-bug-report-modal__modal-window">
            <div class="b-bug-report-modal__top-side">
                <span class="b-bug-report-modal__title">
                    Повідомити про промилку на сайті
                </span>
                <img src="../assets/img/white-warning-icon.svg" alt="warning">
            </div>
            <div class="b-bug-report-modal__main-side">
                <InputComponent
              :placeholder="'Не вдається долучитися до події'"
              :height="40"
              :outsideTitle="true"
              :title-width="0"
              :title="'Із чим пов`язана помилка?'"
              v-model="bugReportTitle"
              name="title"/>

              <InputComponent
              :height="100"
              :outsideTitle="true"
              :title-width="0"
              :icon="addFileIcon"
              :title="'Коли та де ви зіштовхнулися із помилкою?'"
              v-model="bugReportBody"
              name="body"/>
            </div>
            <div class="b-bug-report-modal__bottom-side">
                <div class="b-bug-report-modal__close-button">
                    Закрити це вікно
                </div>
                <div class="b-bug-report-modal__submit-button">
                    Надіслати відгук
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"

import InputComponent from './forms/InputComponent.vue'

import addFileIcon from '../assets/img/add-file-icon.svg'

export default {
    components: {
        InputComponent
    },
    setup() {
        const bugReportTitle = ref('')
        const bugReportBody = ref('')

        return {
            bugReportTitle,
            bugReportBody,
            addFileIcon,
        }
    }
}
</script>

<style lang="scss" scoped>
.b-bug-report-modal__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(48, 46, 46, 0.514);
    z-index: 999;

    .b-bug-report-modal__modal-window {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        width: 400px;
        transform: translate(-50%, -50%);
        box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
        border-radius: 6px;
        background: #fff;

        .b-bug-report-modal__top-side {
            background: #4C4A82;
            display: flex;
            justify-content: space-between;
            padding: 20px;
            border-radius: 6px 6px 0px 0px;

            .b-bug-report-modal__title {
                font-family: 'Exo 2';
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 24px;
                color: #FFFFFF;
            }
        }
        .b-bug-report-modal__main-side {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .b-bug-report-modal__bottom-side {
            display: flex;
            justify-content: space-between;
            padding: 20px;

            .b-bug-report-modal__close-button {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 24px;
                text-align: center;
                color: #575775;
            }
            .b-bug-report-modal__submit-button {
                padding: 4px 16px;
                background: #4C4A82;
                border-radius: 6px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
                text-align: center;
                color: #FFFFFF;
            }
        }
    }
}
</style>