<template>
  <div class="b_small_event_card">
    <div class="b_small_event_card_close">&times;</div>
    <div class="b_small_event_card_top-line">
      <div class="b_small_event_card_icon-pic">
        <img src="../assets/img/hands-shake.svg" alt="">
      </div>
      <div class="b_small_event_card_text-data">
        <div class="b_small_event_card_top-line b_small_event_card_name">{{ $t('events.friendly-match') }}</div>
        <div class="b_small_event_card_bottom-line">
          <div class="b_small_event_card_time">12:00 – 14:00</div>
          <div class="b_small_event_card_date">16 {{ $t('events.months.June') }}</div>
        </div>
      </div>
    </div>
    <div class="b_small_event_card_address">
      <img src="../assets/img/location-point.svg" alt="">
      <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
    </div>
    <div class="b_small_event_card_labels">
      <div class="b_small_event_card_label">{{ $t('events.football') }}</div>
      <div class="b_small_event_card_label">{{ $t('events.men') }}</div>
      <div class="b_small_event_card_label">...</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.b_small_event_card {
  position: relative;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #DFDEED;
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 16px;
  .b_small_event_card_close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  .b_small_event_card_top-line {
    display: flex;
    align-items: center;
    .b_small_event_card_text-data {
      margin-left: 8px;
      .b_small_event_card_name {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 16px;
        color: #262541;
      }
      .b_small_event_card_bottom-line {
        display: flex;
        align-items: center;
        margin-top: 4px;
        .b_small_event_card_time {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          text-align: right;
          color: #575775;
          margin-right: 21px;
        }
        .b_small_event_card_date {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          text-align: right;
          color: #262541;
        }
      }
    }
  }
  .b_small_event_card_address {
    display: flex;
    background: #FAFAFA;
    padding: 0px 4px;
    margin-top: 4px;
    img {
      margin-right: 5px;
    }
    p {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #575775;
      border-radius: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .b_small_event_card_labels {
    display: flex;
    align-items: center;
    margin-top: 12px;
    .b_small_event_card_label {
      margin-right: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #575775;
      padding: 0px 8px;
      border: 1px solid #EFEFF6;
      border-radius: 100px;
    }
  }
}
</style>