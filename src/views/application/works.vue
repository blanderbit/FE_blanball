<template>
  <div class="b-tech-works">
    <div class="b-tech-works__top-message-line">
      <div class="b-tech-works__text">
        Наразі, сайт працює у тестовому режимі, тому може містити помилки. Будь
        ласка, повідомте нас якщо помітите якусь із них :)
      </div>
      <GreenBtn
        :text="'Я знайшов помилку'"
        :width="143"
        :height="28"
        :backgroundColor="'#575775'"
      />
    </div>
    <div class="b-tech-works__main-part">
      <div class="b-tech-works__left-side">
        <div class="b-tech-works__title">
          <div><span>На сервері</span> BlanBall</div>
          <div>тривають<span> технічні роботи</span></div>
        </div>
        <div class="b-tech-works__subtitle">
          Наша команда працює над тим, щоб ви могли користувалися додатком із
          задоволенням, вибачте за тимчасові незручності
        </div>
        <div class="b-tech-works__not-have-account">Ще не маєте акаунту?</div>
        <div class="b-tech-works__register-link">
          Зареєструйтеся та будьте в курсі всіх оновлень
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
import GreenBtn from '../../components/GreenBtn.vue'

export default {
  components: {
    GreenBtn,
  },
}
</script>

<style lang="scss" scoped>
.b-tech-works {
  .b-tech-works__top-message-line {
    padding: 8px 0 8px 0;
    background: #f0f0f4;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
    }
  }
  .b-tech-works__main-part {
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    .b-tech-works__left-side {
      width: 416px;
      @media (max-width: 768px) {
        width: 100%;
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