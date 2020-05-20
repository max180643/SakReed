<template>
  <loading v-if="loading" />
  <b-container v-else fluid="sm">
    <h4 class="text-center text-white mt-3">ประวัติการส่งผ้า</h4>
    <div class="mb-4">
      <b-row v-for="(item, index) in data" :key="index">
        <b-col cols="12">
          <div
            class="bg-white round mt-1 my-2 py-2 px-2 link"
            @click="viewDetail(item, genID(data.length, index))"
          >
            <b-row>
              <b-col cols="9">
                <p class="description">
                  <font-awesome-icon :icon="['fas', 'calendar-alt']" />
                  {{ item.time.toDate().getDate() }}
                  {{ month[item.time.toDate().getMonth()] }}
                  {{ item.time.toDate().getFullYear() + 543 }}
                  <font-awesome-icon :icon="['fas', 'clock']" />
                  {{ zeroPad(item.time.toDate().getHours()) }}:{{
                    zeroPad(item.time.toDate().getMinutes())
                  }}
                </p>
              </b-col>
              <b-col cols="3">
                <p class="description text-right">
                  #{{ genID(data.length, index) }}
                </p>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="8">
                <h4>
                  <font-awesome-icon :icon="['fas', 'tshirt']" />
                  {{ getAmount(item.items) }} ชิ้น
                </h4>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="8">
                <p class="card_footer mb-0 ml-1">จำนวนที่ส่งซัก</p>
              </b-col>
              <b-col cols="4">
                <p class="text-danger card_footer text-right mb-0">
                  เพิ่มเติม
                  <font-awesome-icon :icon="['fas', 'angle-right']" />
                </p>
              </b-col>
            </b-row>
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
      data: [],
      loading: true
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$fireStore
        .collection(this.$cookies.get('uid') + '_data')
        .orderBy('time', 'desc')
        .get()
        .then((data) => {
          this.data = data.docs.map((doc) => doc.data())
          this.loading = false
        })
    },
    getAmount(array) {
      let total = 0
      array.forEach((item) => {
        total += item.amount
      })
      return total
    },
    viewDetail(data, code) {
      this.$store.commit('history/setData', data)
      this.$store.commit('history/setCode', code)
      this.$router.push('/detail')
    },
    genID(length, index) {
      return length - index
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

.card_footer {
  font-size: 0.9rem;
}

.link:hover {
  cursor: pointer;
}
</style>
