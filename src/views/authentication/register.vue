<template>
  <AuthenticationMain
    :background-tab="backgroundTab"
    :background-mob="backgroundMob"
    :right-side-style="rightSideStyle"
    :current-step="currentStep"
  >
    <template #main-content>
      <Form 
        v-slot="data"
        :validation-schema="schema"
        :initial-values="initialValues"
      >
        <Transition>
          <Step_1
              v-if="currentStep === 1"
              @next="handleRegister(data)"
              @back="backToRoute"
          />
        </Transition>
        <Transition>
          <Step_2
              v-if="currentStep === 2"
              @next="handleRegister(data)"
              @back="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_3
              v-if="currentStep === 3"
              @next="currentStep++"
              @back="finishOnBoarding()"

          />
        </Transition>
        <Transition>
          <Step_4
              v-if="currentStep === 4"
              @next="currentStep++"
              @back="finishOnBoarding()"
          />
        </Transition>
        <Transition>
          <Step_5
              v-if="currentStep === 5"
              @next="currentStep++"
              @back="finishOnBoarding()"
          />
        </Transition>
        <Transition>
          <Step_6
              v-if="currentStep === 6"
              @next="currentStep++"
              @back="finishOnBoarding()"
          />
        </Transition>
        <Transition>
          <Step_7
              v-if="currentStep === 7"
              @next="currentStep++"
          />
        </Transition>
        <Transition>
          <Step_8
              v-if="currentStep === 8"
              @next="handleUpdate(data)"
              @back="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_9
              v-if="currentStep === 9"
              @next="handleUpdate(data)"
              @back="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_10
              v-if="currentStep === 10"
              @next="handleUpdate(data)"
              @back="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_11
              v-if="currentStep === 11"
              @next="goToEvents()"
          />
        </Transition>
      </Form>
    </template>
  </AuthenticationMain>


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
  import Step_11 from '../../components/register-components/Step-11.vue'
  import AuthenticationMain from '../../components/AuthenticationMain.vue'

  import imageStep_1 from '../../assets/img/registration-back-1.svg'
  import imageStep_2 from '../../assets/img/registration-back-2.svg'
  import imageStep_3 from '../../assets/img/registration-back-3.svg'
  import imageStep_4 from '../../assets/img/registration-back-4.svg'
  import onboardingStep_2 from '../../assets/img/onboarding-step-2.svg'
  import onboardingStep_3 from '../../assets/img/onboarding-step-3.svg'
  import onboardingStep_4 from '../../assets/img/onboarding-step-4.svg'

  import imageStepTab_1 from '../../assets/img/registration-back-tab1.svg'
  import imageStepTab_2 from '../../assets/img/registration-back-tab2.svg'
  import imageStepTab_3 from '../../assets/img/registration-back-tab3.svg'
  import imageStepTab_4 from '../../assets/img/registration-back-tab4.svg'

  import imageStepMob_1 from '../../assets/img/registration-back-mob1.svg'
  import imageStepMob_2 from '../../assets/img/registration-back-mob2.svg'
  import imageStepMob_3 from '../../assets/img/registration-back-mob3.svg'
  import imageStepMob_4 from '../../assets/img/registration-back-mob4.svg'
  import onboardingStepMob_2 from '../../assets/img/onboarding-step-mob2.svg'
  import onboardingStepMob_3 from '../../assets/img/onboarding-step-mob3.svg'
  import onboardingStepMob_4 from '../../assets/img/onboarding-step-mob4.svg'

  import * as yup from "yup";
  import { API } from "../../workers/api-worker/api.worker";
  import { TokenWorker } from "../../workers/token-worker";
  import { PositionMapBus } from "../../workers/event-bus-worker";
  import { useForm } from "@system.it.flumx.com/vee-validate";
  import { ROUTES } from "../../router/router.const";
  yup.addMethod(yup.string, "userName", function (errorMessage) {
    return this.test(`UserName`, errorMessage, function (value) {
      const { path, createError } = this;
const reg = /^[a-zа-яё\d]{1}[a-zа-яё\d-]*[a-zа-яё\d]{1}$/i;
      return (
        reg.exec(value) ||
        createError({ path, message: errorMessage })
      );
    });
  });

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
      Step_11,
      Form,
      AuthenticationMain
    },
    setup() {
      const router = useRouter();
      const currentStep = ref(1);
      const initialValues = ref({});
      let profileValues = {
        profile: {}
      };
      let schema = computed(() => {
        if (currentStep.value === 1) {
          return yup.object({
            phone: yup.string()
              .required()
              .min(19, 'Invalid phone number')
            ,
            profile: yup.object({
              name: yup.string().required().userName('Invalid username, please write right name'),
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
        if (currentStep.value === 8) {
          return yup.object({
            day: yup.string().required(),
            month: yup.string().required(),
            year: yup.string().required(),
            gender: yup.string().required(),
          });
        }
        if (currentStep.value === 9) {
          return yup.object({
            height: yup.number().required().min(145).max(250),
            weight: yup.number().required().min(30).max(200),
            position: yup.string().required(),
            working_leg: yup.string().required(),
          });
        }
        if (currentStep.value === 10) {
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
            return {'--back-picture': `url(${onboardingStep_2})`}; 
            break;
          case 5: 
            return {'--back-picture': `url(${onboardingStep_3})`}; 
            break;
          case 6: 
            return {'--back-picture': `url(${onboardingStep_4})`}; 
            break;
          case 8:
            return {'--back-picture': `url(${imageStep_2})`};
            break;
          case 9:
            return {'--back-picture': `url(${imageStep_3})`};
            break;
          case 10:
            return {'--back-picture': `url(${imageStep_4})`};
            break;
          default:
            return {'--back-picture': `url(${imageStep_1})`};
        }
      })
      const backgroundTab = computed(() => {
        switch (currentStep.value) {
          case 4: 
            return onboardingStep_2
            break;
          case 5: 
            return onboardingStep_3
            break;
          case 6: 
            return onboardingStep_4
            break;
          case 8:
            return imageStepTab_2
            break;
          case 9:
            return imageStepTab_3
            break;
          case 10:
            return imageStepTab_4
            break;
          default:
            return imageStepTab_1
        }
      })
      const backgroundMob = computed(() => {
        switch (currentStep.value) {
          case 1: 
            return ''
            break;
          case 2: 
            return ''
            break;
          case 3: 
            return imageStepMob_1
            break;
          case 4: 
            return onboardingStepMob_2
            break;
          case 5: 
            return onboardingStepMob_3
            break;
          case 6: 
            return onboardingStepMob_4
            break;
          case 8:
            return imageStepMob_2
            break;
          case 9:
            return imageStepMob_3
            break;
          case 10:
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
      function finishOnBoarding() {
        currentStep.value = 7
      }
      return {
        currentStep,
        rightSideStyle,
        backgroundTab,
        backgroundMob,
        schema,
        initialValues,
        finishOnBoarding,
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
          if (currentStep.value === 10 && (!initialValues.value.lat || !initialValues.value.lon) ) {
            return
          }
          initialValues.value = merge(initialValues.value, data.controlledValues);
          const actionsSteps = [8,9,10];
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
  #vs4__listbox {
    background: red;
  }
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
</style>