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
                width="128"
                height="128"
                class="mt-1"
              />
            </div>
            <h3 class="my-2">เริ่มต้นการใช้งาน</h3>
            <p>ระบุจำนวนชิ้นทั้งหมดที่สามารถส่งซักได้ต่อรอบ</p>
            <b-form-input
              v-model="input_amount"
              type="number"
              step="1"
              placeholder="จำนวนชิ้นที่สามารถส่งซักได้"
            ></b-form-input>
            <b-button
              v-b-modal.modal-reset
              block
              variant="success"
              class="my-3"
              @click="starting"
              ><font-awesome-icon :icon="['fas', 'arrow-circle-right']" />
              เริ่มต้นการใช้งาน</b-button
            >
            <p class="my-2 text-secondary">SakReed - Make Your Life Easier</p>
          </div>
        </div>

        <!-- alert modal -->
        <b-modal
          id="modal-alert"
          centered
          title="คำเตือน!"
          ok-only
          ok-title="ตกลง"
          ok-variant="primary"
        >
          <div class="text-center">
            <font-awesome-icon
              :icon="['fas', 'file-alt']"
              class="my-3 text-primary icon"
            />
            <h5 class="mb-0">กรุณากรอกเฉพาะตัวเลข!</h5>
          </div>
        </b-modal>

        <!-- setting modal -->
        <b-modal
          id="modal-setting"
          centered
          title="เริ่มต้นการใช้งาน!"
          ok-only
          ok-title="ตกลง"
          ok-variant="primary"
          no-close-on-backdrop
          no-close-on-esc
          hide-header-close
          @ok="redirect"
        >
          <div v-if="setting_success" class="text-center">
            <font-awesome-icon
              :icon="['fas', 'check-circle']"
              class="my-3 text-success icon"
            />
            <h5 class="mb-0">ตั้งค่าสำเร็จ!</h5>
          </div>
          <div v-else class="text-center">
            <b-spinner
              style="width: 3rem; height: 3rem;"
              variant="primary"
              class="my-3"
            ></b-spinner>
            <h5 class="mb-0">ตั้งค่าการใช้งาน...</h5>
          </div>
        </b-modal>
      </b-col>
    </b-row>
  </b-container>
  <loading v-else />
</template>

<script>
import loading from '~/components/loading.vue'

export default {
  middleware: 'authenticated',
  components: {
    loading
  },
  data() {
    return {
      display: true,
      input_amount: null,
      setting_success: false,
      date: this.$moment()
        .add(7, 'days')
        .toDate(),
      items: []
    }
  },
  created() {
    this.check_fristTime()
  },
  methods: {
    check_fristTime() {
      if (this.$cookies.get('fristTime') !== 1) {
        this.redirect()
      }
    },
    starting() {
      if (
        this.input_amount === '' ||
        this.input_amount === null ||
        isNaN(this.input_amount)
      ) {
        this.$bvModal.show('modal-alert')
      } else {
        this.$bvModal.show('modal-setting')
        this.$fireStore
          .collection(this.$cookies.get('uid') + '_profile')
          .doc('data')
          .set({
            item_amount: parseInt(this.input_amount),
            item_lastSend: 0,
            item_left: parseInt(this.input_amount),
            name: this.$cookies.get('displayName')
          })
          .then(() => {
            this.$cookies.set('fristTime', 0, { expires: this.date })
            this.setting_success = true
          })
      }
    },
    redirect() {
      this.$router.push('/')
    }
  }
}
</script>
