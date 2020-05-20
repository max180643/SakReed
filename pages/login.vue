<template>
  <b-container v-if="display" fluid="sm">
    <b-row>
      <b-col cols="12">
        <div class="bg-white round mt-3 py-3 px-2">
          <div class="text-center">
            <div v-lazy-container="{ selector: 'img' }">
              <img
                data-src="/icon.png"
                data-loading="/icon-small.png"
                class="mt-1 icon"
              />
            </div>
            <h4 class="my-2">เข้าสู่ระบบเพื่อใช้งาน</h4>
            <b-button
              variant="primary"
              class="fb my-3"
              size="lg"
              @click="fb_login"
              ><font-awesome-icon :icon="['fab', 'facebook-square']" /> LOG IN
              WITH FACEBOOK</b-button
            >
            <p class="my-2 text-secondary">SakReed - Make Your Life Easier</p>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
  <loading v-else />
</template>

<script>
import loading from '~/components/loading.vue'

export default {
  components: {
    loading
  },
  data() {
    return {
      provider: new this.$fireAuthObj.FacebookAuthProvider(),
      date: this.$moment()
        .add(7, 'days')
        .toDate(),
      display: false
    }
  },
  created() {
    this.get_login()
  },
  methods: {
    set_cookie(key, value) {
      this.$cookies.set(key, value, { expires: this.date })
    },
    redirect(path) {
      this.$router.push(path)
    },
    fb_login() {
      this.$fireAuth.signInWithRedirect(this.provider)
    },
    get_login() {
      const app = this
      if (app.$cookies.get('uid') && app.$cookies.get('displayName')) {
        app.redirect('/')
      }
      this.$fireAuth
        .getRedirectResult()
        .then((result) => {
          if (result.user !== null) {
            app.set_cookie('uid', result.user.uid)
            app.set_cookie('displayName', result.user.displayName)
            app.set_cookie('photoURL', result.user.photoURL)
            this.$fireStore
              .collection(this.$cookies.get('uid') + '_profile')
              .doc('data')
              .get()
              .then((data) => {
                if (data.data()) {
                  app.redirect('/')
                } else {
                  app.set_cookie('fristTime', 1)
                  app.redirect('/start')
                }
              })
          } else {
            app.display = true
          }
        })
        .catch(() => {
          location.replace('/')
        })
    }
  }
}
</script>

<style scoped>
.fb {
  font-family: 'Mitr', sans-serif;
  font-size: 1.16rem;
}
.icon {
  height: 25vh;
}
</style>
