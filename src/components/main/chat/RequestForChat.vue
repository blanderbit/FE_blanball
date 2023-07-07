<template>
  <div class="b-request-for-chat">
    <div class="b-text">Дозволити Альфа Вовку надсилати вам повідомлення?</div>
    <div class="b-buttons-block">
      <GreenBtn
        :width="130"
        :height="32"
        backgroundColor="#FFE8E8"
        :font-styles="{
          'font-weight': '400',
          color: '#F32929',
        }"
        :text="$t('buttons.forbid')"
      />
      <GreenBtn
        :width="130"
        :height="32"
        backgroundColor="#ECFCFB"
        :font-styles="{
          'font-weight': '400',
          color: '#148783',
        }"
        :text="$t('buttons.alow')"
      />
    </div>
  </div>
</template>

<script>
import GreenBtn from '../../shared/button/GreenBtn.vue';
export default {
  components: {
    GreenBtn,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.b-request-for-chat {
  background: $--b-main-black-color;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  width: max-content;
  height: fit-content;
  bottom: 16px;
  gap: 12px;
  margin: 0 auto;
  flex-wrap: wrap;

  @include tabletAndMobile {
    width: max-content;
    justify-content: space-between;
    flex-direction: column;
  }

  .b-text {
    @include inter(14px, 400, $--b-main-white-color);
    line-height: 20px;
    text-align: center;
  }
  .b-buttons-block {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
