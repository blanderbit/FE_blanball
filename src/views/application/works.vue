<template>
  <div class="b-tech-works">
    <div class="b-tech-works__top-message-line">
      <div class="b-tech-works__text">
        {{ $t('works.site-is-broken') }}
      </div>
      <div class="b-tech-works__button">
        {{ $t('works.found-mistake') }}
      </div>
    </div>
    <div class="b-tech-works__main-part">
      <div class="b-tech-works__left-side">
        <div class="b-tech-works__title">
          <div>
            <span>
              {{ $t('works.at-server') }}
            </span> 
            BlanBall
          </div>
          <div>
            {{ $t('works.is-going') }}
            <span> 
              {{ $t('works.technical-works') }}
            </span>
          </div>
        </div>
        <div class="b-tech-works__subtitle">
          {{ $t('works.we-are-fixing') }}
        </div>
        <div class="b-tech-works__not-have-account">
          {{ $t('works.no-account') }}
        </div>
        <div class="b-tech-works__register-link">
          {{ $t('works.register') }}
        </div>
      </div>
      <div class="b-tech-works__right-side">
        <img src="../../assets/img/tech-works-back.svg" alt="" />
        <div class="st">
          <div class="st1"></div>
          <div class="st2"></div>
          <div class="st3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.b-tech-works {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 999;
  .b-tech-works__top-message-line {
    padding: 8px 0 8px 0;
    background: #f0f0f4;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 992px) and (max-width: 1200px) {
      padding: 8px;
    }
    @media (max-width: 992px) {
      display: none;
    }
    .b-tech-works__text {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      color: #8a8aa8;
      margin-right: 119px;
    }
    .b-tech-works__button {
      padding: 2px 8px;
      background: #575775;
      border-radius: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 24px;
      text-align: center;
      color: #ffffff;
      min-width: 143px;
    }
  }
  .b-tech-works__main-part {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 0 16px;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    .b-tech-works__left-side {
      width: 416px;
      margin-right: 40px;
      @media (max-width: 768px) {
        width: 100%;
        margin: 0;
      }
      .b-tech-works__title {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 800;
        font-size: 28px;
        line-height: 36px;
        text-transform: uppercase;
        color: #262541;
        margin-bottom: 12px;
        @media (max-width: 768px) {
          font-size: 20px;
          line-height: 28px;
        }
        span {
          color: #575775;
        }
      }
      .b-tech-works__subtitle {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #575775;
        padding-bottom: 28px;
        margin-bottom: 12px;
        border-bottom: 1px solid #dfdeed;
        @media (max-width: 768px) {
          font-size: 12px;
        }
      }
      .b-tech-works__not-have-account {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #262541;
      }
      .b-tech-works__register-link {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #148783;
      }
    }
    .b-tech-works__right-side {
      position: relative;
      @media (max-width: 768px) {
        margin-top: 20px;
      }
      img {
        width: 100%;
      }
      .st {
        position: absolute;
        width: 340px;
        height: 340px;
        margin: 0 20px;
        top: 5%;
        left: 5%;
        @media (max-width: 576px) {
          top: 0;
          left: 0;
        }
      }
      .st1 {
        position: absolute;
        top: 10%;
        left: 4%;
        background: url('../../assets/img/wheel1.svg') no-repeat center / cover;
        width: 145px;
        height: 145px;
        animation: stid 2.5s linear infinite;
        @media (max-width: 576px) {
          left: 0;
        }
      }
      .st2 {
        position: absolute;
        top: 17%;
        left: 45%;
        width: 180px;
        height: 180px;
        background: url('../../assets/img/wheel2.svg') no-repeat center / cover;
        animation: stidd 2.5s linear infinite;
        @media (max-width: 576px) {
          left: 40%;
        }
      }
      .st3 {
        position: absolute;
        top: 64%;
        left: 34%;
        background: url('../../assets/img/wheel1.svg') no-repeat center / cover;
        width: 110px;
        height: 110px;
        animation: stid 2.5s linear infinite;
        @media (max-width: 576px) {
          top: 66%;
        }
      }
      @keyframes stid {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes stidd {
        to {
          transform: rotate(-360deg);
        }
      }
    }
  }
}
</style>