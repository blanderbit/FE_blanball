<template>
    <div 
        class="b-version-item d-flex justify-content-between" 
        :class="{'b-version-item__active': isActive}"
        @click="$emit('versionClick', id)"
    >
        <div class="b-version-item__element">Version {{ version }}</div>
        <div class="b-version-item__date d-flex">
            <div>{{ date }}</div>
            <img src="../../assets/img/arrow-right.svg">
        </div>
    </div>
</template>

<script>
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
                width: 60px;
            }
        }

        // &__active, &:hover {
        //     border: 1px solid #DFDEED;
        //     box-shadow: none;
        //     transition: 0.5s all;
        //     img {
        //         transition: 0.5s all;
        //         transform: rotate(90deg);
        //     }
        // }
    }
</style>