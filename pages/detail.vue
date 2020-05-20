<template>
  <loading v-if="loading" />
  <b-container v-else fluid="sm">
    <div class="mb-4">
      <b-row>
        <b-col cols="12">
          <div class="bg-white round mt-3 my-2 py-2 px-2">
            <h5 class="text-center mb-0">รายละเอียด</h5>
            <div class="text-center">
              <p class="description d-inline">
                <font-awesome-icon :icon="['fas', 'database']" />
                #{{ code }}
              </p>
              <p class="description d-inline ml-2">
                <font-awesome-icon :icon="['fas', 'calendar-alt']" />
                {{ data.time.toDate().getDate() }}
                {{ month[data.time.toDate().getMonth()] }}
                {{ data.time.toDate().getFullYear() + 543 }}
              </p>
              <p class="description d-inline ml-2">
                <font-awesome-icon :icon="['fas', 'clock']" />
                {{ zeroPad(data.time.toDate().getHours()) }}:{{
                  zeroPad(data.time.toDate().getMinutes())
                }}
              </p>
            </div>
            <hr class="my-2" />
            <b-row>
              <b-col cols="7"
                ><p class="m-0 text-left description">รายละเอียด</p></b-col
              >
              <b-col cols="5"
                ><p class="m-0 text-right description">
                  จำนวน(ชิ้น)
                </p></b-col
              >
            </b-row>
            <!-- item list -->
            <b-row
              v-for="(item, index) in data.items"
              :key="index"
              class="my-2"
            >
              <b-col cols="8"
                ><p class="m-0 text-left detail">
                  {{ item.detail }}
                </p></b-col
              >
              <b-col cols="4"
                ><p class="m-0 mr-4 text-right detail">
                  {{ item.amount }}
                </p></b-col
              >
            </b-row>
            <hr class="mt-2 mb-3" />
            <!-- total -->
            <b-row class="my-2">
              <b-col cols="8"
                ><p class="m-0 text-left detail">
                  รวมทั้งหมด
                </p></b-col
              >
              <b-col cols="4"
                ><p class="m-0 mr-4 text-right detail">
                  {{ getAmount(data.items) }}
                </p></b-col
              >
            </b-row>
            <hr class="my-2" />
            <!-- back button -->
            <div class="text-center">
              <nuxt-link to="/history" class="backButton"
                ><font-awesome-icon :icon="['fas', 'times-circle']" />
                ย้อนกลับ</nuxt-link
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import loading from '~/components/loading.vue'

export default {
  components: {
    loading
  },
  middleware: 'authenticated',
  data() {
    return {
      month: [
        'มกราคม',
        'กุมภาพันธ์',
        'มีนาคม',
        'เมษายน',
        'พฤษภาคม',
        'มิถุนายน',
        'กรกฎาคม',
        'สิงหาคม',
        'กันยายน',
        'ตุลาคม',
        'พฤศจิกายน',
        'ธันวาคม'
      ],
      data: null,
      id: null,
      loading: true
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.data = this.$store.state.history.detail
      this.code = this.$store.state.history.code
      if (this.data === null || this.code === null) {
        this.$router.push('/history')
      } else {
        this.loading = false
      }
    },
    back() {
      this.$store.commit('history/removeData')
      this.$router.push('/history')
    },
    getAmount(array) {
      let total = 0
      array.forEach((item) => {
        total += item.amount
      })
      return total
    },
    zeroPad(value) {
      let text = value.toString()
      if (text.length === 1) {
        text = '0' + text
      }
      return text
    }
  }
}
</script>

<style scoped>
.description {
  font-size: 0.805rem;
  color: #7a8389;
}

.detail {
  font-size: 1.2rem;
}

.backButton {
  color: #7a8389;
}

.backButton:hover {
  color: #575e63;
  text-decoration: none;
}
</style>
