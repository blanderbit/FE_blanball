<template>
  <div class="b-versions">
    <div class="b-versions__title">
      Тут буде написано що саме мидодали до наявного функціоналу
    </div>
    <div class="b-versions-content" :style="`height: ${versionsContentHeight}`">
      <div v-if="selectedVersionData" class="b-versions__main-side">
        <div v-if="selectedVersionData.images.length" class="b-images-block">
          <vueper-slides
            :visible-slides="3"
            :slide-ratio="1 / 4"
            :allowTouchMove="false"
            :bullets="false"
            :loop="true"
            :simulateTouch="false"
            :gap="2"
            :draggingDistance="10"
            :arrows-outside="false"
          >
            <template #arrow-left>
              <img
                class="b-swipe-images__button"
                src="@images/slider-left-white-arrow.svg"
                alt=""
              />
            </template>

            <template #arrow-right>
              <img
                class="b-swipe-images__button"
                src="@images/slider-right-white-arrow.svg"
                alt=""
              />
            </template>

            <vueper-slide
              v-for="image in selectedVersionData.images"
              :image="image"
              style="border-radius: 6px"
            />
          </vueper-slides>
        </div>
        <div class="b-main-version-content-block">
          <div class="b-what-new">
            <div class="b-what-new__title">
              {{
                $t('versions.whats-new', {
                  number: selectedVersionData.version,
                })
              }}
              <span>{{ selectedVersionData.type }}</span>
            </div>
            <ul class="b-what-new__content">
              <div
                v-for="whatNewItem in selectedVersionData.what_new"
                class="b-list-item"
              >
                <img src="@images/list-item-dot.svg" alt="" />
                <li>
                  {{ whatNewItem }}
                </li>
              </div>
            </ul>
          </div>
          <div class="b-all-version-updates">
            <div class="b-more-details">{{ $t('versions.more-detailed') }}</div>
            <div
              v-for="data in selectedVersionData.data"
              class="b-version-update-block"
            >
              <div v-if="data?.name" class="b-update-block-title">
                {{ $t(`versions.${data.name}`) }}
              </div>
              <ul v-if="data?.items" style="border-top: 1px solid #e2e2e9">
                <div v-for="item in data.items" class="b-list-item">
                  <img src="@images/list-item-dot.svg" alt="" />
                  <li>
                    {{ item }}
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="b-versions__history-side">
        <div class="b-history-side__title">{{ $t('versions.history') }}</div>
        <div class="b-history-side__content">
          <div class="b-history-side__versions-list">
            <div
              v-for="version in paginationElements"
              :class="[
                'b-versions-list__version',
                { selected: version.id === selectedVersionData.id },
              ]"
              @click="switchVersion(version)"
            >
              <div class="b-version-left__side">
                <div class="b-version__number">
                  {{
                    $t('versions.version-number', { number: version.version })
                  }}
                </div>
                <div
                  v-if="version.id === newVersionId && paginationPage === 1"
                  class="b-version__new"
                >
                  {{ $t('versions.new') }}
                </div>
              </div>
              <div class="b-version-right__side">
                <div class="b-version-date">{{ version.created_at }}</div>
                <img
                  v-if="version.id === selectedVersionData.id"
                  src="@images/cross.svg"
                  alt=""
                />
                <img
                  v-else
                  width="8"
                  src="@images/arrow-right.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <PaginationScale
            :currentPage="paginationPage"
            :pagesTotalCount="totalPagesCount"
            @changePage="loadVersions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import dayjs from 'dayjs';

import PaginationScale from '@sharedComponents/pagination/PaginationScale.vue';

import { cloneDeep } from 'lodash';

import { API } from '@workers/api-worker/api.worker';
import { PaginationWorker } from '@workers/pagination-worker';
import { calcHeight } from '@workers/window-size-worker/calcHeight';
import { useUserDataStore } from '@/stores/userData';

import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';

export default {
  components: {
    PaginationScale,
    VueperSlide,
    VueperSlides,
  },
  setup() {
    const route = useRoute();
    const selectedVersionData = ref(
      handleVersionData(route.meta.allVersions.results[0])
    );
    const userStore = useUserDataStore();

    const newVersionId = computed(() => {
      return paginationElements.value[0]?.id;
    });

    const { calculatedHeight } = calcHeight(
      [90, 75],
      [userStore.user.is_verified ? 0 : 40],
      [userStore.user.is_verified ? 0 : 40],
      true
    );

    const versionsContentHeight = computed(() => {
      return `${calculatedHeight.value}px`;
    });

    function handleVersionData(data) {
      const clonnedData = cloneDeep(data);

      if (clonnedData.data) {
        clonnedData['what_new'] = clonnedData.data?.what_new;
        clonnedData['images'] = clonnedData.data?.images;

        delete clonnedData.data?.what_new;
        delete clonnedData.data?.images;

        const newDataObj = Object.keys(clonnedData.data)
          .map((key) => {
            if (clonnedData.data[key].length) {
              return {
                name: key,
                items: clonnedData.data[key],
              };
            }
          })
          .reduce((accumulator, currentValue) => {
            accumulator[currentValue?.name] = currentValue;
            return accumulator;
          }, {});

        return { ...clonnedData, data: newDataObj };
      }
    }

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.VersionsService.getAllVersions({ page: page }),
      dataTransformation: handlingIncomeVersionsData,
      notToConcatElements: true,
    });

    function handlingIncomeVersionsData(version) {
      return {
        ...version,
        created_at: dayjs(version.created_at).format('DD.MM.YYYY'),
      };
    }

    paginationPage.value = 1;
    paginationTotalCount.value = route.meta.allVersions.total_count;
    paginationElements.value = route.meta.allVersions.results.map((version) => {
      return handlingIncomeVersionsData(version);
    });

    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    };

    const loadVersions = (pageNumber) => {
      loadDataPaginationData(pageNumber, null);
    };

    const totalPagesCount = computed(() => {
      return Math.ceil(paginationTotalCount.value / 10);
    });

    const switchVersion = (versionData) => {
      if (versionData.id !== selectedVersionData.value.id) {
        selectedVersionData.value = handleVersionData(versionData);
      } else {
        selectedVersionData.value = handleVersionData(
          route.meta.allVersions.results[0]
        );
      }
    };

    return {
      selectedVersionData,
      paginationElements,
      totalPagesCount,
      paginationPage,
      versionsContentHeight,
      newVersionId,
      loadVersions,
      switchVersion,
      loadDataPaginationData,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-f9f9fc: #f9f9fc;
$color-6f6f77: #6f6f77;
$color-f0f0f4: #f0f0f4;
$color-efeff6: #efeff6;
$color-d3f8f7: #d3f8f7;
.vueper-slides {
  box-shadow: none;
  background: none;
  border: none;
}

ul {
  list-style: none;
  li {
    @include inter(14px, 400);
    line-height: 22px;
    text-align: left;
  }
}
.b-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.b-versions {
  .b-versions__title {
    @include exo(20px, 700);
    line-height: 28px;
    max-width: 360px;
  }
  .b-versions-content {
    display: grid;
    grid-template-columns: 2fr 1.5fr;
    justify-content: space-between;
    margin-top: 20px;

    @include beforeDesktop {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      padding-bottom: 20px;
    }

    .b-versions__main-side {
      max-width: 560px;

      @include desktop {
        overflow-y: scroll;
        @include calc-height(90px, 60px, 20px);
        padding-bottom: 20px;
      }

      @include beforeDesktop {
        max-width: none;
      }

      .b-images-block {
        .b-swipe-images__button {
          background: rgba(38, 37, 65, 0.45);
          border-radius: 8px;
          backdrop-filter: blur(1px);
          padding: 10px;
        }
      }

      .b-main-version-content-block {
        margin-top: 16px;

        @include beforeDesktop {
          max-width: 464px;
        }

        @include tabletAndMobile {
          max-width: none;
        }
        .b-what-new {
          background: $color-f9f9fc;
          border-radius: 8px;
          padding: 20px 12px;

          .b-what-new__title {
            @include exo(16px, 600);
            line-height: 24px;
            margin-left: 16px;
            span {
              @include inter(12px, 400, $--b-main-white-color);
              line-height: 20px;
              padding: 3px 6px;
              background: $color-6f6f77;
              border-radius: 4px;
              text-align: center;
              margin-left: 8px;
            }
          }
        }
        .b-all-version-updates {
          margin-top: 20px;
          .b-more-details {
            @include exo(16px, 700);
            line-height: 24px;
          }
          .b-version-update-block {
            margin-top: 30px;
            position: relative;

            .b-update-block-title {
              @include exo(16px, 600);
              line-height: 24px;
              width: fit-content;
              position: absolute;
              top: -13px;
              background: $--b-main-white-color;
              padding-right: 6px;
            }
          }
        }
      }
    }
    .b-versions__history-side {
      padding: 0px 5px;
      max-width: 464px;
      @media (min-width: 992px) and (max-width: 1200px) {
        margin-left: 30px;
      }

      @include beforeDesktop {
        margin-top: 20px;
      }
      .b-history-side__title {
        @include exo(16px, 600);
        line-height: 24px;
      }

      .b-history-side__content {
        @include desktop {
          overflow-y: scroll;
          @include calc-height(90px, 60px, 30px);
          padding-bottom: 20px;
        }

        .b-versions-list__version {
          background: $--b-main-white-color;
          border: 1px solid $color-f0f0f4;
          border-radius: 6px;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;

          &.selected {
            background: $color-efeff6;
            box-shadow: none;
            border: none;
          }

          .b-version-left__side {
            display: flex;
            align-items: center;
            gap: 12px;
            .b-version__number {
              @include inter(14px, 500);
              line-height: 20px;
            }
            .b-version__new {
              @include inter(12px, 500, $--b-main-green-color);
              line-height: 20px;
              text-align: center;
              background: $color-d3f8f7;
              border-radius: 4px;
              padding: 0px 8px;
            }
          }
          .b-version-right__side {
            display: flex;
            align-items: center;
            gap: 20px;

            .b-version-date {
              @include inter(12px, 400, $--b-main-gray-color);
              line-height: 20px;
              text-align: right;
            }
          }
        }
      }
      .b-history-side__versions-list {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px 12px;
      }
    }
  }
}
</style>
