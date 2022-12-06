<template>
  <div class="b-register">
    <div class="b-register__background-tab">
      <img :src="backgroundTab" alt="background image tablet"/>
    </div>
    <div class="b-register__background-mob">
      <img :src="backgroundMob" alt="background image mobile"/>
    </div>
    <div class="b-register__central-block">
      <div class="b-register__left-part">
        <Form v-slot="data" :validation-schema="schema" :initial-values="initialValues">
          <Transition>
            <Step_1
                v-if="currentStep === 1"
                @increment-step="handleRegister(data)"
                @decrement-step="backToRoute"
            />
          </Transition>
          <Transition>
            <Step_2
                v-if="currentStep === 2"
                @increment-step="handleRegister(data)"
                @decrement-step="currentStep--"
            />
          </Transition>
          <Transition>
            <Step_3
                v-if="currentStep === 3"
                @increment-step="handleUpdate(data)"
            />
          </Transition>
          <Transition>
            <Step_4
                v-if="currentStep === 4"
                @increment-step="handleUpdate(data)"
                @decrement-step="currentStep--"
            />
          </Transition>
          <Transition>
            <Step_5
                v-if="currentStep === 5"
                @increment-step="handleUpdate(data)"
                @decrement-step="currentStep--"
            />
          </Transition>
          <Transition>
            <Step_6
                v-if="currentStep === 6"
                @increment-step="handleUpdate(data)"
                @decrement-step="currentStep--"
            />
          </Transition>
          <Transition>
            <Step_7
                v-if="currentStep === 7"
                @increment-step="currentStep++"
                @decrement-step="currentStep--"
            />
          </Transition>
          <Transition>
            <Step_8
                v-if="currentStep === 8"
                @increment-step="currentStep++"
                @decrement-step="currentStep--"
            />
          </Transition>
          <Transition>
            <Step_9
                v-if="currentStep === 9"
                @increment-step="currentStep++"
                @decrement-step="currentStep--"
            />
          </Transition>
          <Transition>
            <Step_10
                v-if="currentStep === 10"
                @increment-step="goToEvents()"
                @decrement-step="currentStep--"
            />
          </Transition>
        </Form>
      </div>
      <div class="b-register__right-part" :style="rightSideStyle" v-show="currentStep !== 6">
        <div class="b-register__google-play-block" >
          <img src="../../assets/img/google-play.svg" alt=""/>
          <span>
            {{ $t('register.load-app') }}
          </span>
        </div>
        <!--<template v-else>-->
        <!--</template>-->
      </div>
      <div class="b-register__right-part" v-if="currentStep === 6" style="height: 600px;">
        <position-map></position-map>
      </div>

    </div>
  </div>
</template>

<script>
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { merge, cloneDeep } from 'lodash'
  import { Form } from '@system.it.flumx.com/vee-validate'

  import Step_1 from '../../components/register-components/Step-1.vue'
  import Step_2 from '../../components/register-components/Step-2.vue'
  import Step_3 from '../../components/register-components/Step-3.vue'
  import Step_4 from '../../components/register-components/Step-4.vue'
  import Step_5 from '../../components/register-components/Step-5.vue'
  import Step_6 from '../../components/register-components/Step-6.vue'
  import Step_7 from '../../components/register-components/Step-7.vue'
  import Step_8 from '../../components/register-components/Step-8.vue'
  import Step_9 from '../../components/register-components/Step-9.vue'
  import Step_10 from '../../components/register-components/Step-10.vue'
  import PositionMap from '../../components/maps/PositionMap.vue'

  import imageStep_1 from '../../assets/img/registration-back-1.svg'
  import imageStep_2 from '../../assets/img/registration-back-2.svg'
  import imageStep_3 from '../../assets/img/registration-back-3.svg'
  import imageStep_4 from '../../assets/img/registration-back-4.svg'

  import imageStepTab_1 from '../../assets/img/registration-back-tab1.svg'
  import imageStepTab_2 from '../../assets/img/registration-back-tab2.svg'
  import imageStepTab_3 from '../../assets/img/registration-back-tab3.svg'
  import imageStepTab_4 from '../../assets/img/registration-back-tab4.svg'

  import imageStepMob_1 from '../../assets/img/registration-back-mob1.svg'
  import imageStepMob_2 from '../../assets/img/registration-back-mob2.svg'
  import imageStepMob_3 from '../../assets/img/registration-back-mob3.svg'
  import imageStepMob_4 from '../../assets/img/registration-back-mob4.svg'
  import * as yup from "yup";
  import { API } from "../../workers/api-worker/api.worker";
  import { TokenWorker } from "../../workers/token-worker";
  import { PositionMapBus } from "../../workers/event-bus-worker";
  import { ROUTES } from "../../router";
  import { useForm } from "@system.it.flumx.com/vee-validate";

  export default {
    name: 'register',
    components: {
      Step_1,
      Step_2,
      Step_3,
      Step_4,
      Step_5,
      Step_6,
      Step_7,
      Step_8,
      Step_9,
      Step_10,
      Form,
      PositionMap
    },
    setup() {

      const router = useRouter();
      const currentStep = ref(1);
      const context = useForm();
      const initialValues = ref({
        // email: "Yariktest@gmai.com",
        // password: "2363796z",
        // phone: "+380683242344",
        // profile: {name: "Yariktest", last_name: "Yariktest"},
        // re_password: "2363796z"
      });
      let profileValues = {};
      let schema = computed(() => {
        if (currentStep.value === 1) {
          return yup.object({
            phone: yup.string()
              .required()
              .min(19, 'Invalid phone number')
            ,
            profile: yup.object({
              name: yup.string().required(),
              last_name: yup.string().required(),
            })
          });
        }
        if (currentStep.value === 2) {
          return yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
            re_password: yup.string().required().min(8).when('password', (password, field) =>
              password ? field.required().oneOf([yup.ref('password')]) : field
            ),
          });
        }
        if (currentStep.value === 4) {
          return yup.object({
            day: yup.string().required(),
            month: yup.string().required(),
            year: yup.string().required(),
            gender: yup.string().required(),
          });
        }
        if (currentStep.value === 5) {
          return yup.object({
            height: yup.number().required().min(145).max(250),
            weight: yup.number().required().min(30).max(200),
            position: yup.string().required(),
            working_leg: yup.string().required(),
          });
        }
        if (currentStep.value === 6) {
          return yup.object({
            region: yup.string().required(),
            city: yup.string().required(),
            address: yup.string().required(),
            // lat: yup.string().required(),
            // lon: yup.string().required(),
            // place_name: yup.string().required(),
          });
        }
        return yup.object({})
      });
      const rightSideStyle = computed(() => {
        switch (currentStep.value) {
          case 4:
            return {'--back-picture': `url(${imageStep_2})`};
            break;
          case 5:
            return {'--back-picture': `url(${imageStep_3})`};
            break;
          case 6:
            return {'--back-picture': `url(${imageStep_4})`};
            break;
          default:
            return {'--back-picture': `url(${imageStep_1})`};
        }
      })
      const backgroundTab = computed(() => {
        switch (currentStep.value) {
          case 4:
            return imageStepTab_2
            break;
          case 5:
            return imageStepTab_3
            break;
          case 6:
            return imageStepTab_4
            break;
          default:
            return imageStepTab_1
        }
      })
      const backgroundMob = computed(() => {
        switch (currentStep.value) {
          case 4:
            return imageStepMob_2
            break;
          case 5:
            return imageStepMob_3
            break;
          case 6:
            return imageStepMob_4
            break;
          default:
            return imageStepMob_1
        }
      })
      function getNumber(str){
        return str.replace(/[\D]+/g, '')
      }
      PositionMapBus.on('update:coords', (e) => {
        profileValues.profile.place = {
          lat: e.lat,
          lon: e.lon,
          place_name: e.place,
        };
        initialValues.value = merge(initialValues.value, {
          lat: e.lat,
          lon: e.lng,
          place_name: e.place,
        })
      });
      return {
        currentStep,
        rightSideStyle,
        backgroundTab,
        backgroundMob,
        schema,
        initialValues,
        async handleRegister (data) {
          const { valid } = await data.validate();
          if(!valid) return;
          initialValues.value = merge(initialValues.value, data.controlledValues);
          if(currentStep.value === 2) {
            try {
              const data = cloneDeep(initialValues.value);
              data.phone = `+${getNumber(data.phone)}`;
              const apiRequestResult = await API.AuthorizationService.Register(data);
              TokenWorker.setToken(apiRequestResult.data.access);
              const apiRequestResultMyProfile = await API.UserService.getMyProfile();
              profileValues = apiRequestResultMyProfile.data;
            } catch (e) {
              return
            }
          }
          currentStep.value++
        },
        async handleUpdate(data) {
          const { valid } = await data.validate();
          if(!valid) return;
          if (currentStep.value === 6 && (!initialValues.value.lat || !initialValues.value.lon) ) {
            return
          }
          initialValues.value = merge(initialValues.value, data.controlledValues);
          const actionsSteps = [4,5,6];
          if (actionsSteps.includes(currentStep.value)) {
            try {
              profileValues.profile = {
                birthday: `${initialValues.value.year}-${initialValues.value.month}-${initialValues.value.day}`,
                gender: initialValues.value.gender ?? profileValues.profile.gender,
                height: initialValues.value.height ?? profileValues.profile.height,
                weight: initialValues.value.weight ?? profileValues.profile.weight,
                position: initialValues.value.position ?? profileValues.profile.position,
                working_leg: initialValues.value.working_leg ?? profileValues.profile.working_leg,
                name: profileValues.profile.name,
                last_name: profileValues.profile.last_name,
              };
              await API.UserService.updateProfileData(profileValues);
            } catch (e) {
              return
            }
          }
          currentStep.value++
        },
        backToRoute() {
          router.back()
        },
        goToEvents() {
          router.push(ROUTES.APPLICATION.EVENTS.absolute)
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  form {
    height: 100%;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.8s ease;
  }

  .v-enter,
  .v-leave-to {
    opacity: 0;
  }

  .b-register {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 576px) and (max-width: 992px) {
      padding-top: 132px;
      overflow: hidden;
    }
    @media (max-width: 576px) {
      padding-top: 140px;
    }
    .b-register__background-tab {
      display: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      @media (min-width: 576px) and (max-width: 992px) {
        display: block;
      }
      img {
        width: 100%;
      }
    }
    .b-register__background-mob {
      display: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      @media (max-width: 576px) {
        display: block;
        width: 100%;
      }
      img {
        width: 100%;
      }
    }
    .b-register__central-block {
      height: 555px;
      width: 992px;
      display: flex;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      @media (min-width: 992px) and (max-width: 1200px) {
        width: 890px;
      }
      @media (min-width: 576px) and (max-width: 992px) {
        width: 464px;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 8px;
      }
      @media (max-width: 576px) {
        border-radius: 28px 28px 0px 0px;
        width: 100%;
      }
      .b-register__left-part {
        width: 432px;
        @media (max-width: 992px) {
          width: 100%;
        }
      }
      .b-register__right-part {
        background-image: var(--back-picture);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        width: 560px;
        position: relative;
        @media (max-width: 992px) {
          display: none;
        }
        .b-register__google-play-block {
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
          padding: 24px;
          img {
            margin-right: 12px;
          }
          span {
            width: 280px;
          }
        }
      }
    }
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>