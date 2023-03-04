<template>
    <div class="b-event-created-modal__wrapper" 
        @click.self="$emit('closeModal')">
        <div class="b-event-created-modal">
            <img class="b-event-created-modal__image" 
                src="../../assets/img/event-created-icon.svg" 
                alt="">
            <div class="b-event-created-modal__title-block">
                <div class="b-event-created-modal__title">
                    {{ $t('modals.event_created.title') }}
                </div>
                <div class="b-event-created-modal__subtitle">
                    {{ $t('modals.event_created.main-text') }}
                </div>
            </div>
            <img  class="b-event-created-modal__close-modal" 
                src="../../assets/img/cross.svg" 
                alt=""
                @click="$emit('closeModal')">
        </div>
    </div>
</template>

<style lang="scss" scoped>

// SCSS variables for hex colors
 $color-f9f9fc: #f9f9fc;


.b-event-created-modal__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(197, 197, 197, 0.514);
    z-index: 999;
    .b-event-created-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        padding: 12px 12px 16px;
        isolation: isolate;
        background: #F9F9FC;
        border-radius: 12px;
        
        .b-event-created-modal__image {
            width: 60px;
            height: 60px;
        }
        .b-event-created-modal__title-block {
            min-width: 250px;
            .b-event-created-modal__title {
                font-family: 'Exo 2';
                font-style: normal;
                font-weight: 800;
                font-size: 22px;
                line-height: 40px;
                color: $--b-main-black-color;
            }
            .b-event-created-modal__subtitle {
                font-family: 'Exo 2';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 28px;
                color: $--b-main-black-color;
                margin-top: -5px;
            }
        }
        .b-event-created-modal__close-modal {
            cursor: pointer;
        }
    }
}
</style>