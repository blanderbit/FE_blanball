<template>
    <div class="b-profile">
        <div class="b-profile__titles-block">
            <div class="b-profile__title">
                {{ $t('profile.title') }}
            </div>
            <div class="b-profile__subtitle">
                {{ $t('profile.subtitle') }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.b-profile {
    .b-profile__titles-block {
        display: flex;
        flex-direction: column;
        gap: 4px 4px;
        .b-profile__title {
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 700;
            font-size: 22px;
            line-height: 32px;
            color: #262541;
        }

        .b-profile__subtitle {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            color: #575775;
        }
    }
}
</style>