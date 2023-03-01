<template>
    <div class="b-event-info__forms">
        <div class="b-event-info__form" v-for="(item, key, index) in formsDataValue">
            <span class="b-event-info__form-title">
                {{ $t('events.team_num', { 'num': index + 1 }) }}
                <img src="../../assets/img/change-forms-arrow.svg" alt=""
                    @click="$emit('changeForms')">
            </span>
            <div class="b-event-info__form-content">
                <div v-if="formsType === 'Forms'" class="b-event-info__form-content-t-thirt">
                    <div class="b-event-info__form-item">
                        <div class="b-event-info__form-item-color">
                            <img :src="mockData.colors[item.t_shirts]" alt="">
                            <div class="b-event-info__form-item-color-name">
                                {{ $t('events.color-t-shirts', {color: $t(`colors.forms.${item.t_shirts}`)}) }}
                            </div>
                        </div>
                    </div>
                    <div class="b-event-info__form-item">
                        <div class="b-event-info__form-item-color">
                            <img :src="mockData.colors[item.shorts]" alt="">
                            <div class="b-event-info__form-item-color-name">
                                {{ $t('events.color-shorts', {color: $t(`colors.forms.${item.shorts}`)}) }}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="b-event-info__form-content-shirt-front">
                    <div class="b-event-info__form-item">
                        <div class="b-event-info__form-item-color">
                            <img :src="mockData.colors[item.shirtfronts]" alt="">
                            <div class="b-event-info__form-item-color-name">
                                {{ $t('events.color-shirtfronts', {color: $t(`colors.forms.${item.shirtfronts}`)}) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch } from 'vue';

import CONSTANTS from '../../consts/index'

export default {
    props: {
        formsData: {
            type: Object,
            default: () => {}
        },
    },
    setup(props) {
        const mockData = computed(() => {
            return {
                colors: CONSTANTS.forms.colorIcons,
            };
        });

        const formsDataValue = ref(props.formsData)
        const formsType = ref(props.formsData.type)

        watch(() => props.formsData, (newData, oldData) => {
            let copyForms = JSON.parse(JSON.stringify(newData))
            formsDataValue.value = copyForms
            formsType.value = copyForms.type
            delete formsDataValue.value.type
        })

        return  {
            mockData,
            formsType,
            formsDataValue,
        }
    }
}
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
 $color-f9f9fc: #f9f9fc;
 $color-dfdeed: #dfdeed;


.b-event-info__forms {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 16px;

        @media (min-width: 768px) and (max-width: 992px) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px 12px;
        }
        .b-event-info__form {
          background: #F9F9FC;
          border-radius: 6px;
          padding: 8px;
          padding-bottom: 12px;
          display: flex;
          flex-direction: column;
          .b-event-info__form-title {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            color: $--b-main-gray-color;
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                cursor: pointer;
            }
          }
          .b-event-info__form-content {
            .b-event-info__form-content-t-thirt {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .b-event-info__form-item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 8px;
              margin-top: 8px;
            
              .b-event-info__form-item-color {
                background: #DFDEED;
                border-radius: 4px;
                padding: 2px 8px;
                width: max-content;
                display: flex;
                align-items: center;
                gap: 8px;
                .b-event-info__form-item-color-name {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 12px;
                  line-height: 20px;
                  color: $--b-main-black-color;
                }
              }
            }
          }
        }
      }
</style>