<template>
  <div class="b-versions">
    <Loading :is-loading="loading" />
    <div class="b-versions__title-level1 title-customs">
      {{ $t('versions.title') }}
    </div>
    <div class="b-versions__container d-flex justify-content-between">
      <div class="b-versions__left-side">
        <div
          v-if="currentVersion?.images.length > 0"
          class="b-versions__images d-flex"
        >
          <div
            class="b-versions__image-of-changes"
            v-for="(item, index) of currentVersion.images"
            :style="{ backgroundImage: `url(${item})` }"
            :key="'images' + index"
          ></div>
        </div>
        <div class="b-versions__important-changes">
          <div class="b-versions__title-level3">
            {{ $t('versions.whats-new') }}
            {{ versionNumber }}
            <span class="b-versions__type-of-version">
              {{ versionType }}
            </span>
          </div>
          <div
            class="b-versions__change-element"
            v-for="(item, index) of currentVersion?.what_new"
            :key="'what_new' + index"
          >
            {{ item }}
          </div>
        </div>
        <div class="">
          <div class="b-versions__title-level2">
            {{ $t('versions.more-detailed') }}
          </div>
          <div class="b-versions__title-level4 d-flex">
            {{ $t('versions.smth-new') }}
            <div class="b-versions__change-variant flex-grow-1"></div>
          </div>
          <div
            class="b-versions__change-element"
            v-for="(item, index) of currentVersion?.features"
            :key="'features' + index"
          >
            {{ item }}
          </div>
        </div>
        <div class="">
          <div class="b-versions__title-level4 d-flex">
            {{ $t('versions.fixes') }}
            <div class="b-versions__change-variant flex-grow-1"></div>
          </div>
          <div
            class="b-versions__change-element"
            v-for="(item, index) of currentVersion?.bug_fixes"
            :key="'bugs' + index"
          >
            {{ item }}
          </div>
        </div>
        <div class="">
          <div class="b-versions__title-level4 d-flex">
            {{ $t('versions.improvments') }}
            <div class="b-versions__change-variant flex-grow-1"></div>
          </div>
          <div
            class="b-versions__change-element"
            v-for="(item, index) of currentVersion?.improvements"
            :key="'improvements' + index"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="b-versions__right-side">
        <div class="b-versions__title-level3">
          {{ $t('versions.history') }}
        </div>
        <template v-for="(item, index) in versions" :key="'versions' + index">
          <version-item
            :version="item.version"
            :date="item.date"
            :id="item.id"
            :is-active="item.version === versionNumber"
            @version-click="gerVersion"
          >
          </version-item>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import dayjs from 'dayjs'
import dayjsUkrLocale from 'dayjs/locale/uk'

import Loading from '../../workers/loading-worker/Loading.vue'
import VersionItem from '../../components/versions-page/version-item.vue'

import { API } from '../../workers/api-worker/api.worker'

export default {
  name: 'VersionsPage',
  components: {
    VersionItem,
    Loading,
  },
  setup() {
    const route = useRoute()
    const versions = ref()
    const currentVersion = ref()
    const versionType = ref()
    const versionNumber = ref()
    const loading = ref(false)

    versions.value = route.meta.allVersions?.results

    versions.value = versions.value.map((item) => {
      return {
        ...item,
        date: dayjs(item.created_at)
          .locale(dayjsUkrLocale)
          .format('DD MM YYYY'),
      }
    })

    const currentVersionId = versions.value[versions.value.length - 1]?.id

    if (currentVersionId) {
      gerVersion(currentVersionId)
    }

    function gerVersion(id) {
      loading.value = true
      API.VersionsService.getCurrentVersion(id).then((res) => {
        versionType.value = res.type
        versionNumber.value = res.version
        currentVersion.value = res.data
        loading.value = false
      })
    }

    return {
      // gerVersion,
      versions,
      currentVersion,
      versionNumber,
      versionType,
      loading,
    }
  },
}
</script>

<style scoped lang="scss">

// SCSS variables for hex colors
 $color-c5c5d3: #c5c5d3;
 $color-fbfbfb: #fbfbfb;
 $color-e2e2e9: #e2e2e9;


.b-versions {
  overflow-y: scroll;
  &__title-level1 {
    font-weight: 700;
    font-size: 20px;
    color: $--b-main-black-color;
    font-family: 'Exo 2';
    &.title-customs {
      width: 368px;
      margin-bottom: 20px;
    }
  }

  &__title-level2 {
    font-weight: 700;
    font-size: 16px;
    margin-left: 12px;
    color: $--b-main-black-color;
    margin-bottom: 20px;
    font-family: 'Exo 2';
  }

  &__title-level3 {
    font-weight: 600;
    font-size: 16px;
    margin-left: 12px;
    color: $--b-main-black-color;
    margin-bottom: 12px;
    font-family: 'Exo 2';
  }

  &__title-level4 {
    font-weight: 600;
    font-size: 14px;
    color: $--b-main-black-color;
    margin-bottom: 12px;
    font-family: 'Exo 2';
  }

  &__right-side {
    width: 45%;
  }

  &__left-side {
    width: 45%;
  }

  &__container {
    width: 100%;
    @media (max-width: 992px) {
      flex-direction: column;
      .b-versions__right-side,
      .b-versions__left-side {
        width: 100%;
      }
      .b-versions__left-side {
        order: 1;
      }
    }
  }

  &__type-of-version {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: $--b-main-white-color;
    padding: 0px 6px;
    background: $--b-main-gray-color;
    border-radius: 4px;
  }

  &__change-element {
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 14px;
    padding-left: 15px;
    font-family: 'Inter';

    &::before {
      content: '\2022';
      color: $color-c5c5d3;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }

  &__important-changes {
    padding: 20px 12px;
    background: $color-fbfbfb;
    border-radius: 8px;
    margin-bottom: 20px;
    .b-versions__title-level3 {
      margin-left: 15px;
    }
  }

  &__change-variant {
    &::after {
      background-color: $color-e2e2e9;
      content: '';
      display: inline-block;
      height: 1px;
      position: relative;
      vertical-align: middle;
      width: calc(100% - 20px);
      margin-left: 20px;
    }
  }

  &__images {
    @media (max-width: 768px) {
      flex-wrap: wrap;
    }
  }

  &__image-of-changes {
    width: 32%;
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    margin-right: 16px;
    margin-bottom: 16px;

    &:nth-child(n + 3) {
      margin-right: 0;
    }

    @media (min-width: 478px) and (max-width: 768px) {
      width: 48%;
      &:nth-child(n + 2) {
        margin-right: 0;
      }
    }

    @media (max-width: 478px) {
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>
