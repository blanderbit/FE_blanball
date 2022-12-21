<template>
    <div 
        class="b-version-item d-flex justify-content-between" 
        @click="$emit('versionClick', id)"
    >
        <div class="b-version-item__name-wrap">
            <div class="b-version-item__element">Version {{ version }}</div>
            <div v-if="isActive" class="b-version-item__label-new">
                {{ $t('versions.new') }}
            </div>
        </div>
        <div class="b-version-item__date d-flex">
            <div>{{ date }}</div>
            <img src="../../assets/img/arrow-right.svg">
        </div>
    </div>
</template>

<script>
    import dayJs from 'dayjs'

    export default {
        name: "version-item",
        props: {
            version: String,
            date: String,
            isActive: Boolean,
            id: Number
        },
        emits: ['versionClick']
    }
</script>

<style scoped lang="scss">
    .b-version-item {
        background: #FFFFFF;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 6px;
        padding: 16px;
        margin-bottom: 12px;
        cursor: pointer;
        align-items: center;
        &__name-wrap {
            display: flex;
            align-items: center;
        }
        &__element {
            margin-right: 12px;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #262541;
        }
        &__label-new {
            padding: 0px 8px;
            width: 46px;
            height: 20px;
            background: #D3F8F7;
            border-radius: 4px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            color: #148783;
        }
        &__date {
            div {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                margin-right: 19px;
                width: 60px;
            }
            img {
                display: block;
                width: 7px;
            }
        }
    }
</style>