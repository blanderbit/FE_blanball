<template>
    <div class="b-event-join__tooltip-wrapper">
        <div class="b-event-join__tooltip">
            <div class="b-event-join__tooltip-item" v-for="item in eventJoinToolTipItems">
                <img :src="item.img" alt="">
                <span class="b-item-text">{{ item.text }}</span>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from "vue"

import BallIcon from '../../assets/img/ball.svg'

const eventJoinToolTipItems = ref([
    {
        id: 1,
        text: 'Грати',
        img: BallIcon
    },
    {
        id: 2,
        text: 'Вболівати',
        img: BallIcon
    }
])
</script>

<style lang="scss" scoped>
.b-event-join__tooltip-wrapper {
    position: absolute;
    top: 0px;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(136, 133, 133, 0.514);
    z-index: 999;

    .b-event-join__tooltip {
        background: #FFFFFF;
        width: 180px;
        position: absolute;
        border-radius: 6px;
        bottom: 0px;
        right: -20px;
        .b-event-join__tooltip-item {
            display: flex;
            align-items: center;
            gap: 8px 8px;
            padding: 8px 12px;

            .b-item-text {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                line-height: 20px;
                color: #262541;
            }
        }
    }
}
</style>