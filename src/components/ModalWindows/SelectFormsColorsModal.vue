<template>
    <div class="b-select-forms-color-modal__wrapper">
        <Form  
            v-slot="data"
            :validation-schema="schema"
            :initial-values="initialValues"
            @submit="disableSubmit">
        <div class="b-select-forms-color-modal">
            <div class="b-select-forms-color-modal__top-side">
                <div class="b-select-forms-color-modal__titles-block">
                    <div class="b-select-forms-color-modal__title">
                        {{ $t('modals.selectFormsColors.title') }}
                    </div>
                    <div class="b-select-forms-color-modal__subtitle">
                        {{ $t('modals.selectFormsColors.main-text') }}
                    </div>
                </div>
                <div class="b-select-forms-color-modal__tabs-block">
                    <div class="b-tabs-block__title">
                        {{ $t('modals.selectFormsColors.form-type') }}
                    </div>
                    <div class="b-tabs-block__tabs">
                        <div v-for="tab in mockData.tabs" :class="['b-tabs-block__tab', 
                            { 'active': tab.id === selectedTab }]">
                            {{ tab.text }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="b-select-forms-color-modal__main-side">
                <div class="b-main-side-content">
                    <div v-for="team in mockData.teams" class="b-main-side-team">
                        <div class="b-main-side-team__title">
                            {{ team.name }}
                        </div>
                        <div v-if="selectedTab === 1" class="b-main-side__form-select">
                            <div class="b-main-side__form-select-forms" >
                                <div class="b-main-side__form-select-item">
                                <div class="b-item__name">
                                    {{ $t('events.t-shirts') }}
                                </div>
                                <Dropdown 
                                    class="b-item__dropdown" 
                                    :height="36"
                                    :options="mockData.colors" 
                                    display-name="name"
                                    display-value="value"
                                    :initValue="formsData[team.type]?.t_shirts"
                                    :name="`${team.type}.t_shirts`"/>
                            </div>
                            <div class="b-main-side__form-select-item">
                                <div class="b-item__name">
                                    Шорти
                                </div>
                                <Dropdown
                                    class="b-item__dropdown" 
                                    :height="36"
                                    :options="mockData.colors" 
                                    display-name="name"
                                    :initValue="formsData[team.type]?.shorts"
                                    :name="`${team.type}.shorts`"/>
                            </div>
                            </div>
                            
                        </div>
                        <div v-if="selectedTab === 2" class="b-main-side__form-select">
                            <div class="b-main-side__form-select-forms" >
                                <div class="b-main-side__form-select-item">
                                <div class="b-item__name">
                                    {{ $t('events.shirtfronts') }}
                                </div>
                                <Dropdown 
                                    class="b-item__dropdown" 
                                    :height="36"
                                    display-name="name"
                                    :options="mockData.colors"
                                    :initValue="formsData[team.type]?.shirtfronts"
                                    :name="`${team.type}.shirtfronts`"/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="b-select-forms-color-modal__bottom-side">
                <div class="b-bottom-side__cancel-button"
                    @click="$emit('closeModal')">
                    {{ $t('buttons.cancel') }}
                </div>
                <GreenBtn
                    :width="144"
                    :text="$t('buttons.save')"
                    :height="32"
                    @click-function="saveData(data)"
                />
            </div>
        </div>
    </Form>
    </div>
</template>

<script>
import { ref, computed } from "vue"

import { Form } from '@system.it.flumx.com/vee-validate'

import * as yup from 'yup'

import Dropdown from '../forms/Dropdown.vue';
import GreenBtn from "../GreenBtn.vue";

import CONSTANTS from '../../consts/index'

export default {
    components: {
        Dropdown,
        GreenBtn,
        Form,
    },
    props: {
        selectedTab: {
            type: Number,
            default: 1,
        },
        formsData:{
            type: Object,
            default: () => {}
        }
    },
    emits: ['closeModal', 'saveData'],

    setup(props , { emit }) {

        const mockData = computed(() => {
            return {
                tabs: CONSTANTS.forms.tabs,
                colors: CONSTANTS.forms.colors,
                teams: CONSTANTS.forms.teams
            }
        })

        const schema = computed(() => {
            if (props.selectedTab === 1) {
                return yup.object({
                    first_team: yup.object({
                        t_shirts: yup
                            .string()
                            .required('errors.required'),
                        shorts: yup
                            .string()
                            .required('errors.required')
                    }),
                    second_team: yup.object({
                        t_shirts: yup
                            .string()
                            .required('errors.required'),
                        shorts: yup
                            .string()
                            .required('errors.required')
                    })
                })
            }
            if (props.selectedTab === 2) {
                return yup.object({
                    first_team: yup.object({
                        shirtfronts: yup
                            .string()
                            .required('errors.required'),
                    }),
                    second_team: yup.object({
                        shirtfronts: yup
                            .string()
                            .required('errors.required'),
                    })
                })
            }
        })
       
        const saveData = async (data) => {
            const { valid } = await data.validate()
            if (!valid) {
                return false
            }
            emit('saveData', data.values)
        }

        return {
            mockData,
            saveData,
            schema,
            disableSubmit: (e) => {
                e.stopPropagation()
                e.preventDefault()
            },
        }
    }
}
</script>


<style lang="scss" scoped>
.b-select-forms-color-modal__wrapper {
    z-index: 999;

    &::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        background: #262541;
        width: 100%;
        min-height: 100%;
        z-index: 100;
        opacity: 0.2;
    }

    .b-select-forms-color-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        width: 400px;
        transform: translate(-50%, -50%);
        box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
        border-radius: 6px;
        background: #fff;
        padding: 20px 16px 28px;
        z-index: 999;

        .b-select-forms-color-modal__top-side {
            .b-select-forms-color-modal__titles-block {
                .b-select-forms-color-modal__title {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 28px;
                    color: #262541;
                }

                .b-select-forms-color-modal__subtitle {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 20px;
                    color: #575775;
                }
            }

            .b-select-forms-color-modal__tabs-block {
                margin-top: 16px;

                .b-tabs-block__title {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 13px;
                    line-height: 20px;
                    color: #262541;
                    margin-bottom: 8px;
                }
            }

            .b-tabs-block__tabs {
                background: #FFFFFF;
                border: 1px solid #F0F0F4;
                border-radius: 6px;
                width: 100%;
                padding: 6px;
                display: flex;
                align-items: center;
                justify-content: center;

                .b-tabs-block__tab {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 13px;
                    line-height: 20px;
                    text-align: center;
                    color: #575775;
                    display: flex;
                    justify-content: center;
                    flex: 50%;
                    cursor: pointer;

                    &.active {
                        background: #EFEFF6;
                        border-radius: 4px;
                        font-family: 'Inter';
                        font-style: normal;
                        font-weight: 500;
                        font-size: 13px;
                        line-height: 20px;
                        text-align: center;
                        color: #262541;

                    }
                }
            }
        }

        .b-select-forms-color-modal__main-side {
            .b-main-side-content {
                display: flex;
                flex-direction: column;
                gap: 12px 12px;
                margin-top: 16px;

                .b-main-side-team {
                    .b-main-side-team__title {
                        font-family: 'Inter';
                        font-style: normal;
                        font-weight: 500;
                        font-size: 13px;
                        line-height: 20px;
                        color: #262541;
                        margin-bottom: 8px;
                    }
                }

                .b-main-side__form-select {
                    background: #EFEFF6;
                    border-radius: 4px;
                    padding: 8px 8px 12px;
                    .b-main-side__form-select-forms {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        gap: 8px;
                        .b-main-side__form-select-item {
                            flex: 50%;

                        .b-item__name {
                            font-family: 'Inter';
                            font-style: normal;
                            font-weight: 500;
                            font-size: 13px;
                            line-height: 20px;
                            color: #575775;
                            margin-bottom: 4px;
                        }

                        .b-item__dropdown {
                            background: #FFFFFF;
                            border-radius: 6px;
                        }
                    }
                    }
                }
            }
        }
        .b-select-forms-color-modal__bottom-side {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 16px;

            .b-bottom-side__cancel-button {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 24px;
                text-align: center;
                color: #575775;
                cursor: pointer;
            }
        }
    }
}
</style>