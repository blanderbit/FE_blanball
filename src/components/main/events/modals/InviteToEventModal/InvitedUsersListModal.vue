<template>
  <div
    class="b-invited-users-list-modal__wrapper"
    @click.self="$emit('closeModal')"
  >
    <div class="b-invited-users-list-modal__modal-window">
      <div class="b-invited-users-list-modal__header">
        <div class="b-invited-users-list-modal__title">
          Запрошені користувачі
        </div>
        <img
          class="b-invited-users-list-modal__close-button"
          src="../../../../../assets/img/back-arrow.svg"
          alt=""
          @click="$emit('closeModal')"
        />
      </div>
      <div class="b-invited-users-list-modal__main-side">
        <div class="b-main-side__invited-users-list">
          <div v-for="user in invitedUsers" class="b-main-side__invited-user">
            <div class="b-invited-user__info">
              <userAvatar
                class="b-invited-user__avatar"
                :link="user.profile.avatar_url"
                :avatarType="'small-circle'"
                :full-name="`${user.profile.last_name} ${user.profile.name}`"
              />
              <div class="b-invited-user__personal-data">
                <div class="b-invited-user__full-name">
                  {{ user.profile.name }} {{ user.profile.last_name }}
                </div>
                <div class="b-invited-user__position">
                  {{
                    user.profile.position
                      ? $t(`hashtags.position_full.${user.profile.position}`)
                      : '----'
                  }}
                </div>
              </div>
            </div>
            <img
              class="b-remove-invited-user__button"
              src="../../../../../assets/img/cross.svg"
              alt=""
              @click="$emit('removeUser', user.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAvatar from '../../../../shared/userAvatar/UserAvatar.vue';
export default {
  emits: ['closeModal', 'removeUser'],
  components: {
    userAvatar,
  },
  props: {
    invitedUsers: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.b-invited-users-list-modal__wrapper {
  @include modal-wrapper(rgba(38, 37, 65, 0.45));
  backdrop-filter: blur(1px);

  .b-invited-users-list-modal__modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 368px;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    background: $--b-main-white-color;
    padding: 24px 16px;

    .b-invited-users-list-modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .b-invited-users-list-modal__title {
        @include exo(16px, 700);
        line-height: 24px;
      }
      .b-invited-users-list-modal__close-button {
        cursor: pointer;
      }
    }
    .b-invited-users-list-modal__main-side {
      margin-top: 20px;

      .b-main-side__invited-users-list {
        overflow: scroll;
        height: calc(380px - 24px - 40px);
        .b-main-side__invited-user {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 8px;
          

          .b-invited-user__info {
            display: flex;
            align-items: center;
            gap: 12px;

            .b-invited-user__personal-data {
              .b-invited-user__full-name {
                @include inter(14px, 600);
                line-height: 20px;
              }
              .b-invited-user__position {
                @include inter(12px, 500, $--b-main-gray-color);
                line-height: 20px;
              }
            }
          }
          .b-remove-invited-user__button {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
