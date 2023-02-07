<template>
  <ModalWindow :isTitleShown="false">
    <template #default>
      <div class="b-selection-suit__title">Призначення форм командам</div>
      <div class="b-selection-suit__description">
        Оберіть кольори форм або маніжок для команд
      </div>

      <div class="b-selection-suit__block">
        <div class="b-selection-suit__subtitle">Вид форми</div>
        <LongRadioButtonGroup
          v-model="selectedType"
          name="test"
          :values="values"
        >
        </LongRadioButtonGroup>
      </div>
      <div class="b-selection-suit__block" v-for="item in teams">
        <div class="b-selection-suit__subtitle">{{ item.teamName }}</div>
        <suit-card :values="item.values"></suit-card>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="b-selection-suit__clear">Скасувати</div>
        <GreenBtn :text="'Зберегти'" :width="140" :height="40" />
      </div>
    </template>
  </ModalWindow>
</template>

<script>
import ModalWindow from '../../components/ModalWindow.vue'
import SuitCard from './SuitCard.vue'
import LongRadioButtonGroup from './../forms/LongRadioButtonGroup.vue'
import { ref, computed } from 'vue'
import GreenBtn from '../../components/GreenBtn.vue'

export default {
  name: 'SelectionSuitModal',
  props: {
    modelValue: String,
  },
  components: {
    ModalWindow,
    LongRadioButtonGroup,
    SuitCard,
    GreenBtn,
  },
  setup() {
    const selectedType = ref('Формы')
    const values = ref([
      { title: 'Формы', value: 'Формы' },
      { title: 'Манижки', value: 'Манижки' },
    ])

    const teams = computed(() => {
      if (selectedType.value === 'Формы') {
        return [
          {
            teamName: 'Команда №1',
            values: [
              {
                name: 'Футболки',
                color: '',
              },
              {
                name: 'Шорты',
                color: '',
              },
            ],
          },
          {
            teamName: 'Команда №2',
            values: [
              {
                name: 'Футболки',
                color: '',
              },
              {
                name: 'Шорты',
                color: '',
              },
            ],
          },
        ]
      } else if (selectedType.value === 'Манижки') {
        return [
          {
            teamName: 'Команда №1',
            values: [
              {
                name: 'Манижки',
                color: '',
              },
            ],
          },
          {
            teamName: 'Команда №2',
            values: [
              {
                name: 'Манижки',
                color: '',
              },
            ],
          },
        ]
      } else {
        return []
      }
    })
    return {
      values,
      selectedType,
      teams,
    }
  },
}
</script>

<style scoped lang="scss">
.b-selection-suit {
  &__title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    color: #262541;
  }

  &__description {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #575775;
    margin-bottom: 16px;
  }

  &__subtitle {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    color: #262541;
    margin-bottom: 8px;
  }

  &__block {
    margin-bottom: 16px;
  }

  &__clear {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #575775;
  }
}
</style>
