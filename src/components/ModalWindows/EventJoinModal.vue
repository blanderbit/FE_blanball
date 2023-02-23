<template>
    <div class="b-event-join__tooltip-wrapper"
        @click.self="$emit('closeModal')" >
        <div :style="modalStyle" class="b-event-join__tooltip">
            <div v-for="item in modalItems" class="b-event-join__tooltip-item" @click="$emit('itemClick', item.type)">
                <img :src="item.img" alt="">
                <span class="b-item-text">{{ item.text }}</span>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from "vue"

export default {
    props: {
        clientX: {
            type: Number,
            default: null,
            require: true,
        },
        clientY: {
            type: Number,
            default: null,
            require: true,
        },
        modalItems: {
            type: Array,
            dafault: () => [],
            require: true,
        },
    },
    setup(props) {
        const modalStyle = computed(() => {
            return {
                top: props.clientY - 50 + 'px',
                left: props.clientX + 'px',
            }
        })

        return {
            modalStyle,
        }
    }
}
</script>

<style lang="scss" scoped>
.b-event-join__tooltip-wrapper {
    z-index: 999;

    &::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        background: #262541;
        width: 100%;
        min-height: 100%;
        z-index: -1;
        opacity: 0.2;
    }

    .b-event-join__tooltip {
        background: #FFFFFF;
        width: 180px;
        position: absolute;
        border-radius: 6px;

        .b-event-join__tooltip-item {
            display: flex;
            align-items: center;
            gap: 8px 8px;
            padding: 8px 12px;
            cursor: pointer;
            border-radius: 6px;

            &:hover {
          background: #F0F0F4;
        }

            .b-item-text {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                line-height: 20px;
                color: #262541;
                z-index: 999;
            }
        }
    }
}
</style>