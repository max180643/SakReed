<template>
  <loading v-if="loading" />
  <b-container v-else fluid="sm">
    <b-row>
      <b-col cols="12">
        <h5 class="text-center text-light mt-3">จำนวนที่สามารถส่งซักได้</h5>
        <div class="circle text-center mb-2">
          <svg
            width="300"
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(110,110)">
              <circle r="100" class="circle-base" />
              <g transform="rotate(-90)">
                <circle r="100" class="circle-progress loading" />
              </g>
            </g>
          </svg>
          <div id="main_display" class="text-center">
            <h4 class="text-white item-title my-1">จำนวนที่เหลือ</h4>
            <h1 class="text-white item-total my-2">{{ item_left }}</h1>
            <h4 class="text-white item-title my-1">ชิ้น</h4>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <div class="text-white text-center">
          <h5 class="detail">ส่งผ้าไปล่าสุด</h5>
          <div>
            <h2 class="text-bold d-inline">{{ item_lastSend }}</h2>
            <p class="d-inline">ชิ้น</p>
          </div>
        </div>
      </b-col>
      <b-col cols="6">
        <div class="text-white text-center">
          <h5 class="detail">ส่งผ้าไปทั้งหมด</h5>
          <div>
            <h2 class="text-bold d-inline">{{ item_total }}</h2>
            <p class="d-inline">ชิ้น</p>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <nuxt-link to="/add" class="btn btn-neon my-3" block>ส่งผ้า</nuxt-link>
      </b-col>
    </b-row>
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
      item_amount: null,
      item_left: null,
      item_lastSend: null,
      item_total: null,
      loading: true
    }
  },
  created() {
    this.getData()
  },
  methods: {
    setStroke() {
      const progressBar = document.querySelector('.circle-progress')
      const length = Math.PI * 2 * 100
      progressBar.style.strokeDasharray = length
    },
    setProgress() {
      const progressBar = document.querySelector('.circle-progress')
      const length = (Math.PI * 2 * 100) / this.item_amount
      progressBar.style.strokeDashoffset = 0
      setTimeout(() => {
        progressBar.style.strokeDashoffset =
          (this.item_amount - this.item_left) * length
        const percent = (this.item_left * 100) / this.item_amount
        if (percent >= 50) {
          progressBar.style.stroke = '#86f407'
        } else if (percent >= 20) {
          progressBar.style.stroke = '#f48d07'
        } else {
          progressBar.style.stroke = '#f40f07'
        }
      }, 100)
    },
    getData() {
      this.$fireStore
        .collection(this.$cookies.get('uid') + '_profile')
        .doc('data')
        .get()
        .then((data) => {
          this.item_amount = data.data().item_amount
          this.item_left = data.data().item_left
          this.item_lastSend = data.data().item_lastSend
          this.item_total = this.item_amount - this.item_left
          this.loading = false
          this.$nextTick(() => {
            this.setStroke()
            this.setProgress()
          })
        })
    }
  }
}
</script>

<style scoped>
.circle {
  max-height: 300px;
}

.circle-base {
  fill: none;
  stroke: #b6b6b6;
  stroke-width: 3px;
}

.circle-progress {
  fill: none;
  stroke: #86f407;
  stroke-width: 6px;
  transition: stroke-dashoffset 1.3s;
  transition: 1.3s;
}

#main_display {
  position: relative;
  top: -235px;
}

.item-total {
  font-size: 5.5em;
  font-weight: bold;
}

.btn-neon {
  background-color: #86f407;
  cursor: pointer;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}

.btn-neon:hover {
  background-color: #7de407;
}

.text-bold {
  font-weight: bold;
}

.detail {
  font-size: 1.13rem;
}
</style>
