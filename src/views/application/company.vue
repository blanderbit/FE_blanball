<template>
    <div class="b-versions">
        <div class="b-versions__title-level1"></div>
        <div class="b-versions__container d-flex justify-content-between">
            <div class="b-versions__left-side">
                <div class="b-versions__images d-flex">
                    <div
                        class="b-versions__image-of-changes"
                        v-for="(item, index) of currentVersion.images"
                        :style="{backgroundImage: `url(${item})`}"
                        :key="'images' + index"
                    >
                    </div>
                </div>
                <div class="b-versions__important-changes">
                    <div class="b-versions__title-level3">Що нового у версіі 1.0.7</div>
                    <div class="b-versions__change-element"
                         v-for="(item, index) of currentVersion.importantFromImprovementsBugFeatures"
                         :key="'importantFromImprovementsBugFeatures' + index"
                    >
                        {{item}}
                    </div>
                </div>
                <div class="">
                    <div class="b-versions__title-level2">Більш детально про оновлення</div>
                    <div class="b-versions__title-level4 d-flex">
                        Щось нове
                        <div class="b-versions__change-variant flex-grow-1"></div>
                    </div>
                    <div class="b-versions__change-element"
                         v-for="(item, index) of currentVersion.features"
                         :key="'features' + index"
                    >
                        {{item}}
                    </div>
                </div>
                <div class="">
                    <div class="b-versions__title-level4 d-flex">
                        Виправлення
                        <div class="b-versions__change-variant flex-grow-1"></div>
                    </div>
                    <div class="b-versions__change-element"
                         v-for="(item, index) of currentVersion.bugs"
                         :key="'bugs' + index"
                    >
                        {{item}}
                    </div>
                </div>
                <div class="">
                    <div class="b-versions__title-level4 d-flex">
                        Покращення
                        <div class="b-versions__change-variant flex-grow-1"></div>
                    </div>
                    <div class="b-versions__change-element"
                         v-for="(item, index) of currentVersion.improvements"
                         :key="'improvements' + index"
                    >
                        {{item}}
                    </div>
                </div>
            </div>
            <div class="b-versions__right-side">
                <div class="b-versions__title-level3">Історія оновлень Blanball</div>
                <template v-for="(item, index) in versions">
                    <version-item
                        :key="'versions' + index"
                        :version="item.version"
                        :date="item.date"
                        :is-active="item.version === currentVersion.version"
                    >
                    </version-item>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import VersionItem from '../../components/versions-page/version-item'

    const json = {
        version: '0.0.3',
        date: new Date(),
        images: ['/version_page_image.svg', '/version_page_image.svg', '/version_page_image.svg'],
        importantFromImprovementsBugFeatures: [
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
        ],
        improvements: [
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
        ],
        bugs: [
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
        ],
        features: [
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
            'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.',
        ]
    };
    export default {
        name: "VersionsPage",
        components: {
            VersionItem
        },
        data: () => ({
            versions: [
                {version: '0.0.3', date: new Date().toString()},
                {version: '0.0.2', date: new Date().toString()},
                {version: '0.0.1', date: new Date().toString()},
            ],
            currentVersion: json
        })
    }
</script>

<style scoped lang="scss">
    .b-versions {
        &__title-level1 {
            font-weight: 700;
            font-size: 20px;
            color: #262541;
            font-family: 'Exo 2';
        }

        &__title-level2 {
            font-weight: 700;
            font-size: 16px;
            margin-left: 12px;
            color: #262541;
            margin-bottom: 20px;
            font-family: 'Exo 2';
        }

        &__title-level3 {
            font-weight: 600;
            font-size: 16px;
            margin-left: 12px;
            color: #262541;
            margin-bottom: 12px;
            font-family: 'Exo 2';
        }

        &__title-level4 {
            font-weight: 600;
            font-size: 14px;
            color: #262541;
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
                .b-versions__right-side, .b-versions__left-side {
                    width: 100%;
                }
                .b-versions__left-side {
                    order: 1;
                }
            }
        }

        &__change-element {
            margin-bottom: 16px;
            font-weight: 400;
            font-size: 14px;
            padding-left: 15px;
            font-family: 'Inter';

            &::before {
                content: "\2022";
                color: #C5C5D3;
                font-weight: bold;
                display: inline-block;
                width: 1em;
                margin-left: -1em;
            }
        }

        &__important-changes {
            padding: 20px 12px;
            background: #FBFBFB;
            border-radius: 8px;
            margin-bottom: 20px;
            .b-versions__title-level3 {
                margin-left: 15px;
            }
        }

        &__change-variant {
            &::after {
                background-color: #E2E2E9;
                content: "";
                display: inline-block;
                height: 1px;
                position: relative;
                vertical-align: middle;
                width: calc(100% - 20px);
                margin-left: 20px;
            }
        }

        &__images {
            @media (max-width: 768px){
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

            @media (min-width: 478px) and (max-width: 768px){
                width: 48%;
                &:nth-child(n + 2) {
                    margin-right: 0;
                }
            }

            @media (max-width: 478px){
                width: 100%;
                margin-right: 0;
            }
        }
    }
</style>