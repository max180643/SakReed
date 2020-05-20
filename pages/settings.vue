<template>
  <loading v-if="loading" />
  <b-container v-else fluid="sm">
    <b-row>
      <b-col cols="12">
        <div class="bg-white round mt-3 py-3 px-2">
          <div class="text-center">
            <!-- profile -->
            <div v-lazy-container="{ selector: 'img' }">
              <img
                :data-src="photoURL"
                data-loading="/profile.png"
                alt="profile's image"
                class="profile my-2"
              />
            </div>
            <h4 class="mt-2 mb-3">{{ displayName }}</h4>
            <hr />
            <!-- button list -->
            <div class="my-3">
              <b-button v-b-modal.modal-amount block variant="primary"
                ><font-awesome-icon :icon="['fas', 'tshirt']" />
                ตั้งค่าจำนวนชิ้น</b-button
              >
              <b-button v-b-modal.modal-history block variant="info"
                ><font-awesome-icon :icon="['fas', 'trash']" />
                รีเซ็ตประวัติทั้งหมด</b-button
              >
              <b-button v-b-modal.modal-reset block variant="success"
                ><font-awesome-icon :icon="['fas', 'sync-alt']" />
                รีเซ็ตจำนวนชิ้น</b-button
              >
              <b-button v-b-modal.modal-logout block variant="danger"
                ><font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                ออกจากระบบ</b-button
              >
            </div>
          </div>
          <!-- amount modal -->
          <b-modal
            id="modal-amount"
            centered
            title="ตั้งค่าจำนวนชิ้น!"
            ok-title="ยืนยัน"
            ok-variant="success"
            cancel-title="ยกเลิก"
            cancel-variant="danger"
            @ok="set_amount"
          >
            <h5 class="text-center">ใส่จำนวนเพื่อทำการตั้งค่า</h5>
            <b-form-input
              v-model="input_amount"
              placeholder="กรอกจำนวนที่ต้องการตั้งค่า"
              type="number"
              step="1"
            ></b-form-input>
          </b-modal>

          <!-- amounting modal -->
          <b-modal
            id="modal-amounting"
            centered
            title="ตั้งค่าจำนวนชิ้น!"
            ok-only
            ok-title="ตกลง"
            ok-variant="primary"
            no-close-on-backdrop
            no-close-on-esc
            hide-header-close
            @ok="amountingRedirect"
          >
            <div v-if="amount_success" class="text-center">
              <font-awesome-icon
                :icon="['fas', 'check-circle']"
                class="my-3 text-success icon"
              />
              <h5 class="mb-0">รีเซ็ตข้อมูลสำเร็จ!</h5>
            </div>
            <div v-else class="text-center">
              <b-spinner
                style="width: 3rem; height: 3rem;"
                variant="primary"
                class="my-3"
              ></b-spinner>
              <h5 class="mb-0">กำลังรีเซ็ตข้อมูล...</h5>
            </div>
          </b-modal>

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

          <!-- reset modal -->
          <b-modal
            id="modal-reset"
            centered
            title="รีเซ็ตจำนวนชิ้น?"
            ok-title="รีเซ็ต"
            ok-variant="danger"
            cancel-title="ยกเลิก"
            cancel-variant="primary"
            @ok="reset"
          >
            <h5 class="text-center">คุณแน่ใจหรือไม่ว่าจะรีเซ็ต?</h5>
            <p class="text-center m-0">
              1. รีเซ็ตจำนวนชิ้นที่เหลือ<br />
              2. รีเซ็ตจำนวนที่ส่งผ้า<br />
              3. รีเซ็ตประวัติการส่งผ้าทั้งหมด<br />
            </p>
          </b-modal>

          <!-- reseting modal -->
          <b-modal
            id="modal-reseting"
            centered
            title="รีเซ็ตจำนวนชิ้น!"
            ok-only
            ok-title="ตกลง"
            ok-variant="primary"
            no-close-on-backdrop
            no-close-on-esc
            hide-header-close
            @ok="resetRedirect"
          >
            <div v-if="reset_success" class="text-center">
              <font-awesome-icon
                :icon="['fas', 'check-circle']"
                class="my-3 text-success icon"
              />
              <h5 class="mb-0">ตั้งค่าจำนวนชิ้นสำเร็จ!</h5>
            </div>
            <div v-else class="text-center">
              <b-spinner
                style="width: 3rem; height: 3rem;"
                variant="primary"
                class="my-3"
              ></b-spinner>
              <h5 class="mb-0">ตั้งค่าจำนวนชิ้น...</h5>
            </div>
          </b-modal>

          <!-- history modal -->
          <b-modal
            id="modal-history"
            centered
            title="รีเซ็ตประวัติทั้งหมด?"
            ok-title="รีเซ็ต"
            ok-variant="danger"
            cancel-title="ยกเลิก"
            cancel-variant="primary"
            @ok="deleteHistory"
          >
            <p class="text-center m-0">
              คุณแน่ใจหรือไม่ว่าจะรีเซ็ตประวัติการส่งผ้าทั้งหมด?
            </p>
          </b-modal>

          <!-- delete modal -->
          <b-modal
            id="modal-delete"
            centered
            title="รีเซ็ตประวัติการส่งผ้า!"
            ok-only
            ok-title="ตกลง"
            ok-variant="primary"
            no-close-on-backdrop
            no-close-on-esc
            hide-header-close
          >
            <div v-if="delete_success" class="text-center">
              <font-awesome-icon
                :icon="['fas', 'check-circle']"
                class="my-3 text-success icon"
              />
              <h5 class="mb-0">รีเซ็ตประวัติการส่งผ้าสำเร็จ!</h5>
            </div>
            <div v-else class="text-center">
              <b-spinner
                style="width: 3rem; height: 3rem;"
                variant="primary"
                class="my-3"
              ></b-spinner>
              <h5 class="mb-0">รีเซ็ตประวัติการส่งผ้า...</h5>
            </div>
          </b-modal>

          <!-- logout modal -->
          <b-modal
            id="modal-logout"
            centered
            title="ออกจากระบบ?"
            ok-title="ออกจากระบบ"
            ok-variant="danger"
            cancel-title="ยกเลิก"
            cancel-variant="primary"
            @ok="logout"
          >
            <p class="text-center m-0">คุณแน่ใจหรือไม่ว่าจะออกจากระบบ?</p>
          </b-modal>
        </div>
      </b-col>
    </b-row>
  </b-container>
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
      displayName: this.$cookies.get('displayName'),
      photoURL: this.$cookies.get('photoURL') + '?height=512&width=512',
      loading: true,
      reset_success: false,
      amount_success: false,
      delete_success: false,
      item_amount: null,
      input_amount: null
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$fireStore
        .collection(this.$cookies.get('uid') + '_profile')
        .doc('data')
        .get()
        .then((data) => {
          this.item_amount = data.data().item_amount
          this.loading = false
        })
    },
    logout() {
      this.$fireAuth.signOut().then(() => {
        this.$cookies.remove('uid')
        this.$cookies.remove('displayName')
        this.$cookies.remove('photoURL')
        this.$cookies.remove('fristTime')
        location.replace('/')
      })
    },
    resetRedirect(modal) {
      if (this.reset_success) {
        this.$router.push('/')
      } else {
        modal.preventDefault()
      }
    },
    reset() {
      this.$bvModal.show('modal-reseting')
      this.$fireStore
        .collection(this.$cookies.get('uid') + '_profile')
        .doc('data')
        .update({
          item_lastSend: 0,
          item_left: parseInt(this.item_amount)
        })
        .then(() => {
          this.deleteAllItem()
          this.reset_success = true
        })
    },
    amountingRedirect(modal) {
      if (this.amount_success) {
        this.$router.push('/')
      } else {
        modal.preventDefault()
      }
    },
    set_amount() {
      if (
        this.input_amount === '' ||
        this.input_amount === null ||
        isNaN(this.input_amount)
      ) {
        this.$bvModal.show('modal-alert')
      } else {
        this.$bvModal.show('modal-amounting')
        this.$fireStore
          .collection(this.$cookies.get('uid') + '_profile')
          .doc('data')
          .update({
            item_amount: parseInt(this.input_amount),
            item_lastSend: 0,
            item_left: parseInt(this.input_amount)
          })
          .then(() => {
            this.amount_success = true
          })
      }
    },
    deleteAllItem() {
      this.$fireStore
        .collection(this.$cookies.get('uid') + '_data')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.$fireStore
              .collection(this.$cookies.get('uid') + '_data')
              .doc(doc.id)
              .delete()
          })
          this.delete_success = true
        })
    },
    deleteHistory() {
      this.delete_success = false
      this.$bvModal.show('modal-delete')
      this.deleteAllItem()
    }
  }
}
</script>

<style scoped>
.profile {
  height: 25vh;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
