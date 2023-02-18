<template>
    <div 
        class="b-emojies"
      >
        <div
          v-for="emoji in currentStepEmojies"
          :key="emoji"
          @click="selectEmoji($event, emoji)"
          :class="['b-emoji', 
          {'b-selected__emoji': selectedEmojies.includes(emoji)}]"
        >
          <img :name="name" :src="emoji.emoji" alt="emgoji">
        </div>
      </div>
      <p class="b-emojies-error__message">{{ modelErrorMessage ? $t(modelErrorMessage) : '' }}</p>
</template>


<script>
import { CustomModelWorker } from "../../workers/custom-model-worker";


export default {
    props: {
        selectedEmojies: {
            type: Array,
            default: []
        },
        currentStepEmojies: {
            type: Array,
            default: []
        },
        mode: {
            type: String,
            default: 'aggressive',
        },
        name: {
            type: String,
            default: '',
            required: true
        },
    },
    setup(props, { emit }) {
        const {
            modelErrorMessage,
            modelHandlers
        } = CustomModelWorker(props, emit);
        function selectEmoji(e, emoji) {
            emit('emojiSelect', emoji)
            modelHandlers.value.input[0](e);
            modelHandlers.value.input[1](e, true);
        }
        
        return {
            selectEmoji,
            modelErrorMessage,
        }
    }
}
</script>


<style lang="scss" scoped>
.b-emojies {
    display: flex;
    justify-content: center;
    align-items: center;
    .b-selected__emoji {
        &::before {
            background: transparent !important;
        }
    }
    .b-emoji {
        margin-right: 12px;
        position: relative;
        cursor: pointer;
        &:last-child {
            margin-right: 0;
        }
        &:hover {
            &::before {
                background: transparent;
            }
        }
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.493);
        }
    }
}
.b-emojies-error__message {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #F32929;
    margin-top: 20px;
}
</style>