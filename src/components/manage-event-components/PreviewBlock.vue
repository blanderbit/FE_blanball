<template>
  <div 
    class="b-event-preview"
    :style="wrapperStyle"
  >
    <div :class="['b-event-preview__preview-block', {active: isPreviewActive}]">
      <div class="b-event-preview__preview-header">
        <div class="b-event-preview__title-block">
          <div class="b-event-preview__title">
            <img src="../../assets/img/img-icon.svg" alt="">
            {{ $t('events.poster-preview') }}
          </div>
          <div 
            class="b-event-preview__switch-arrow"
            @click="togglePreviewWindow"
          >
            <img src="../../assets/img/arrow-down.svg" alt="">
          </div>
        </div>
        <div class="b-event-preview__subtitle">
          {{ $t('events.poster-main-preview') }}
        </div>
      </div>
      <div class="b-event-preview__form-block">
        <div class="b-event-preview__top-line">
          <div class="b-event-preview__left-block">
            <div class="b-event-preview__col-1">
              <div class="b-event-preview__card-icon">
                <img src="../../assets/img/hands-shake.svg" alt=""/>
              </div>
            </div>
            <div class="b-event-preview__col-2">
              <div class="b-event-preview__title">
                {{ $t('events.friendly-match') }}
              </div>
              <div class="b-event-preview__address">
                <img src="../../assets/img/location-point.svg" alt="">
                <p>
                  {{ userLocation || '' }}
                </p>
              </div>
            </div>
          </div>
          <div class="b-event-preview__right-block">
            <div class="b-event-preview__col-3">
              <div class="b-event-preview__date">
                {{ startDate || '' }}
              </div>
              <div class="b-event-preview__time">
                {{ formData.time || '' }}
              </div>
            </div>
          </div>
        </div>
        <div class="b-event-preview__text-area"></div>
        <div class="b-event-preview__labels">
          <div
            v-for="label in labels"
            :key="label.text"
            class="b-event-preview__label"
            :style="
              label.text?.length ?  
              labelStyle :
              emptyLabelStyle
            "
          >
            {{ label.text }}
          </div>
        </div>
        <div class="b-event-preview__bottom-part">
          <div class="b-event-preview__left-block">
            {{ fullUserName }}
          </div>
          <div class="b-event-preview__right-block">
            payment
          </div>
        </div>
        <div class="b-event-preview__bottom-line">
          <div class="b-event-preview__left-side">
            <div class="b-event-preview__titles">
              <div class="b-event-preview__players">{{ $t('events.players') }}:</div>
              <div class="b-event-preview__visitors">{{ $t('events.fans') }}:</div>
            </div>
            <div class="b-event-preview__date">
              <div class="b-event-preview__players-date">10 / 22</div>
              <div class="b-event-preview__visitors-date">17 / 30</div>
            </div>
          </div>
          <div class="b-event-preview__right-side">
            <GreenBtn
              :text="$t('events.join')"
              :width="115"
              :height="32"
            />
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { reactive, ref, computed } from 'vue'
  import { useUserDataStore } from '../../stores/userData'

import GreenBtn from '../../components/GreenBtn.vue'

export default {
  name: 'PreviewBlock',
  components: {
    GreenBtn
  },
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    startDate: {
      type: String,
      default: ''
    },
    userLocation: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const store = useUserDataStore()
    const isPreviewActive = ref(false)

    const fullUserName = computed(() => store.getUserFullName)
    const labels = computed(() => {
      return [
        {
          text: props.formData.type
        },
        {
          text: props.formData.gender
        },
        {
          text: 'Need form'
        }
      ]
    })

    const labelStyle = reactive({
      padding: '0px 8px',
      border: '1px solid #EFEFF6',
      'border-radius': '100px'
    })
    const emptyLabelStyle = reactive({
      width: '70px',
      height: '18px',
      background: '#EFEFF6',
      'border-radius': '100px'
    })

    const wrapperStyle = computed(() => {
      return isPreviewActive.value ? { top : 0 } : {}
    })

    function togglePreviewWindow() {
      isPreviewActive.value = !isPreviewActive.value
    }

    return {
      togglePreviewWindow,
      labelStyle,
      emptyLabelStyle,
      isPreviewActive,
      wrapperStyle,
      fullUserName,
      labels
    }
  }
}
</script>

<style lang="scss" scoped>
.b-event-preview {
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    background: #0000005c;
    left: 0;
    right: 0;
    z-index: 3;
  }
  .b-event-preview__preview-block {
    padding: 24px 44px;
    background: #F9F9FC;
    border-radius: 12px;
    width: 564px;
    overflow: hidden;
    &.active {
      height: auto;
      @media (max-width: 768px) {
        padding: 12px 8px;
      }
    }
    @media (min-width: 1200px) and (max-width: 1400px) {
      width: 504px;
    }
    @media (min-width: 768px) and (max-width: 1199px) {
      width: auto;
      flex-basis: 50%;
    }
    @media (max-width: 1199px) {
      background: transparent;
      padding: 0;
      height: 44px;
    }
    @media (max-width: 768px) {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      background: #F9F9FC;
    }
    .b-event-preview__preview-header {
      @media (max-width: 1199px) {
        background: #F9F9FC;
        padding: 13px;
        margin-bottom: 8px;
      }
      @media (max-width: 768px) {
        margin-bottom: 0;
      }
      .b-event-preview__title-block {
        @media (max-width: 1200px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .b-event-preview__title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: #262541;
          @media (max-width: 1200px) {
            display: flex;
            align-items: center;
          }
          img {
            margin-right: 10px;
            @media (min-width: 1200px) {
              display: none;
            }
          }
        }
        .b-event-preview__switch-arrow {
          cursor: pointer;
          @media (min-width: 1200px) {
            display: none;
          }
        }
      }
      .b-event-preview__subtitle {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: #575775;
        margin: 6px 0 20px;
      }
    }
    .b-event-preview__form-block {
      padding: 20px 16px;
      background: #FFFFFF;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0);
      border-radius: 6px;
      .b-event-preview__top-line {
        display: flex;
        justify-content: space-between;
        .b-event-preview__left-block {
          display: flex;
          .b-event-preview__col-1 {
            margin-right: 8px;
            min-width: 50px;
            .b-event-preview__card-icon {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              min-width: 48px;
              width: 48px;
              height: 48px;
              background: #EFEFF6;
              border-radius: 4px;
            }
          }
          .b-event-preview__col-2 {
            width: 200px;
            @media (min-width: 1200px) and (max-width: 1400px) {
              width: 230px;
            }
            @media (min-width: 992px) and (max-width: 1199px) {
              width: 150px;
            }
            @media (min-width: 768px) and (max-width: 991px) {
              width: 165px;
            }
            @media (max-width: 768px) {
              width: 70%;
            }
            .b-event-preview__title {
              font-family: 'Exo 2';
              font-style: normal;
              font-weight: 700;
              font-size: 16px;
              line-height: 24px;
              color: #262541;
            }
            .b-event-preview__address {
              display: flex;
              background: #FAFAFA;
              padding: 0px 4px;
              margin-top: 4px;
              img {
                margin-right: 5px;
              }
              p {
                font-family: "Inter";
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
          }
        }
        .b-event-preview__right-block {
          .b-event-preview__col-3 {
            min-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .b-event-preview__date {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
              text-align: right;
              color: #262541;
              margin-bottom: 4px;
            }
            .b-event-preview__time {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              text-align: right;
              color: #4C4A82;
            }
          }
        }
      }
      .b-event-preview__text-area {
        margin-top: 12px;
        height: 80px;
        background: #EFEFF6;
        border-radius: 6px;
      }
      .b-event-preview__labels {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 8px;
        .b-event-preview__label {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
          margin-right: 4px;
          margin-bottom: 4px;
        }
      }
      .b-event-preview__bottom-part {
        border-top: 1px dashed #DFDEED;
        padding-top: 12px;
        display: flex;
        justify-content: space-between;
      }
      .b-event-preview__bottom-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 12px;
        .b-event-preview__left-side {
          display: flex;
          align-items: center;
          .b-event-preview__titles {
            margin-right: 30px;
          }
          .b-event-preview__titles, .b-event-preview__date {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
          }
          .b-event-preview__players, .b-event-preview__players-date {
            color: #262541;
          }
          .b-event-preview__visitors, .b-event-preview__visitors-date {
            color: #575775;
          }
        }
      }
    }
  }
}
</style>