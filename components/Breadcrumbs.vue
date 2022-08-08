<template>
  <div class="bread-crumbs">
    <ul>
      <li
        v-for="(item, idx) of breads"
        :key="item.name"
      >
        <nuxt-link :to="idx + 1 === breads.length ? '' : item.to">
          {{ item.name }}
        </nuxt-link>
        <img v-if="!(idx + 1 === breads.length)" src="../assets/img/arrow-right.svg" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
const pathPages = {
  'profile' : 'Профіль',
  'user-cabinet' : 'Особистий кабінет',
  'another-page' : 'Другая страница'
}

export default {
  name: 'bread-crumbs',
  data() {
    return {}
  },
  computed: {
    breads() {
      let arr = []
      console.log(this.$route.path)
      if (this.$route.path.includes('user-cabinet')) {
        const middleArr = this.$route.path.slice(1).split('/')
        arr = middleArr.slice(0, middleArr.length - 1)
      } else {
        arr = this.$route.path.slice(1).split('/')
      }
      const mainArr = [
        {
          name: 'Головна',
          to: '/'
        }
      ]
      const additionArr = arr.map((item, idx, array) => {
        return {
          name: pathPages[item],
          to: this.makePath(array, idx)
        }
      })

      return [...mainArr, ...additionArr]
    }
  },
  methods: {
    makePath(array, idx) {
      if (array.length === idx + 1) return ''
      const pathArr = []
      for (let i = 0; i <= idx; i++) {
        pathArr.push('/')
        pathArr.push(array[i])
      }

      return pathArr.join('')
    }
  }
}
</script>

<style lang="scss" scoped>
.bread-crumbs {
  ul {
    display: flex;
    li {
      list-style: none;
      a {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        text-decoration: none;
        color: #262541;
      }
      img {
        margin-left: 13.5px;
        margin-right: 13.5px;
      }
    }
  }
  @media (max-width: 992px) {
    display: none;
  }
}
</style>