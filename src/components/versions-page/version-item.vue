<template>
    <div class="b-version-item d-flex justify-content-between" :class="{'b-version-item__active': isActive}">
        <div class="b-version-item__element">Version {{ version }}</div>
        <div class="b-version-item__date d-flex">
            <div>{{ date | formatDate }}</div>
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
            isActive: Boolean
        },
        filters: {
            formatDate(value) {
                if (value) {
                    return dayJs(String(value)).format('DD.MM.YYYY')
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .b-version-item {
        background: #FFFFFF;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 6px;
        padding: 16px;
        margin-bottom: 12px;

        &__element {
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
        }

        &__date {
            div {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                margin-right: 19px;
            }
        }

        &__active, &:hover {
            border: 1px solid #DFDEED;
            box-shadow: none;
            transition: 0.5s all;
            img {
                transition: 0.5s all;
                transform: rotate(90deg);
            }
        }
    }
</style>