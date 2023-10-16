<template>
  <div
    :class="{ 'b-emoji-picker-wrapper': isEmojiPickerWrapperShown }"
    @click.self="closeEmojiPicker"
  >
    <EmojiPicker
      class="b-emoji-picker"
      ref="EMOJI_PICKER_ELEMENT"
      :native="true"
      :pickerType="emojiPickerConfig.pickerType"
      :groupNames="emojiPickerConfig.groupNames"
      :displayRecent="emojiPickerConfig.displayRecent"
      :hideSearch="emojiPickerConfig.hideSearch"
      :disableSkinTones="emojiPickerConfig.disableSkinTones"
      :style="emojiPickerStyle"
      @select="$emit('selectEmoji', $event)"
    />
  </div>
</template>

<script>
import EmojiPicker from 'vue3-emoji-picker';

import { useWindowWidth } from '@workers/window-size-worker/widthScreen';

export default {
  components: {
    EmojiPicker,
  },
  props: {
    positionX: {
      type: Number,
      require: true,
    },
    positionY: {
      type: Number,
      require: true,
    },
  },
  emits: ['selectEmoji', 'closeEmojiPicker'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const EMOJI_PICKER_ELEMENT = ref();

    const { width: emojiPickerWidth, height: emojiPickerHeight } =
      useElementSize(EMOJI_PICKER_ELEMENT);
    const { isMobileDevice } = useWindowWidth();

    const isEmojiPickerWrapperShown = computed(() => {
      return !isMobileDevice.value;
    });

    const emojiGroupNames = computed(() => {
      return {
        smileys_people: t('chat.emoji_groups.smileys_people'),
        animals_nature: t('chat.emoji_groups.animals_nature'),
        food_drink: t('chat.emoji_groups.food_drink'),
        activities: t('chat.emoji_groups.activities'),
        travel_places: t('chat.emoji_groups.travel_places'),
        objects: t('chat.emoji_groups.objects'),
        symbols: t('chat.emoji_groups.symbols'),
        flags: t('chat.emoji_groups.flags'),
      };
    });

    const emojiPickerConfig = computed(() => {
      return {
        groupNames: emojiGroupNames.value,
        emojiesOffset: 3,
        displayRecent: false,
        hideSearch: true,
        pickerType: '',
        disableSkinTones: true,
      };
    });

    const emojiPickerStyle = computed(() => {
      const modalWidth = emojiPickerWidth.value;
      const modalHeight = emojiPickerHeight.value;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let top = props.positionY;
      let left = props.positionX;

      // Check if modal is going out of screen on the right side
      if (left + modalWidth > screenWidth) {
        left = screenWidth - modalWidth;
      }

      top -= modalHeight;

      return {
        top: top + 'px',
        left: left + 'px',
      };
    });

    function closeEmojiPicker() {
      emit('closeEmojiPicker');
    }

    return {
      emojiPickerConfig,
      emojiPickerStyle,
      EMOJI_PICKER_ELEMENT,
      isEmojiPickerWrapperShown,
      closeEmojiPicker,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-emoji-picker-wrapper {
  @include modal-wrapper(transparent);

  @include mobileDevice {
    width: 100%;
  }

  .b-emoji-picker {
    position: absolute;

    @include mobileDevice {
      position: initial;
    }
  }
}

:deep {
  .v3-emoji-picker {
    height: 400px;
    width: 350px;

    @include mobileDevice {
      height: 320px;
      width: calc(100% + 16px);
      margin-left: -8px;
      margin-bottom: -20px;
      margin-top: 15px;
      border-radius: 0px;
    }
  }
  .v3-footer {
    display: none;
  }

  .v3-sticky {
    @include inter(14px, 500, $--b-main-black-color);
    text-align: center;
    line-height: 20px;
    top: -2px !important;
  }

  .v3-emojis {
    flex-basis: 15% !important;
    max-width: none !important;
    button {
      font-size: 32px !important;
    }
  }
  .v3-groups {
    button {
      flex-grow: 1 !important;
    }
  }
}
</style>
