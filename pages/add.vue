<template>
  <b-container fluid="sm">
    <b-row>
      <b-col cols="12">
        <div class="bg-white round mt-3 pt-2 px-2">
          <h4 class="mx-2">
            <font-awesome-icon :icon="['fas', 'list']" />
            รายการ
          </h4>
          <b-row>
            <b-col cols="12">
              <hr class="mt-0 mb-2" />
              <b-row>
                <b-col cols="7"
                  ><p class="m-0 text-left description">
                    รายละเอียด
                  </p></b-col
                >
                <b-col cols="5"
                  ><p class="m-0 text-right description">
                    จำนวน(ชิ้น)
                  </p></b-col
                >
              </b-row>
            </b-col>
          </b-row>
          <!-- display item -->
          <div id="list">
            <div v-for="(item, index) in items" :key="index">
              <b-row class="mt-1 mb-1">
                <b-col cols="8"
                  ><h4 class="m-0 item-list">
                    {{ item.detail }}
                    <b-button
                      size="sm"
                      variant="danger"
                      class="p-0"
                      @click="deleteData(index)"
                      >ลบ</b-button
                    >
                  </h4>
                </b-col>
                <b-col cols="4"
                  ><h4 class="m-0 mr-4 text-right item-amount">
                    {{ item.amount }}
                  </h4></b-col
                >
              </b-row>
              <hr />
            </div>
          </div>
          <!-- add item -->
          <b-row class="mb-2">
            <b-col cols="8" class="pl-3 pr-1">
              <b-form-input
                id="detail"
                class="small-placeholder"
                placeholder="ระบุรายละเอียด"
              ></b-form-input>
            </b-col>
            <b-col cols="4" class="pl-1 pr-3">
              <b-form-input
                id="amount"
                class="small-placeholder"
                placeholder="จำนวน"
                type="number"
                step="1"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="px-3 pb-2">
              <b-button block variant="primary" @click="addData()"
                ><font-awesome-icon :icon="['fas', 'plus']" />
                เพิ่มรายการ</b-button
              >
            </b-col>
            <b-col cols="12" class="px-3 pb-2">
              <b-button block variant="success" @click="saveModal"
                ><font-awesome-icon :icon="['fas', 'save']" /> บันทึก</b-button
              >
              <!-- save modal -->
              <b-modal
                id="modal-save"
                centered
                title="บันทึก?"
                ok-title="บันทึก"
                ok-variant="success"
                cancel-title="ยกเลิก"
                cancel-variant="danger"
                @ok="saveData"
              >
                <h5 class="mt-2">รายละเอียด</h5>
                <b-row>
                  <b-col cols="8"
                    ><p class="mb-2">จำนวนที่ส่งซักได้ :</p></b-col
                  >
                  <b-col cols="4"
                    ><p class="mb-2 text-right">{{ item_left }} ชิ้น</p></b-col
                  >
                </b-row>
                <b-row>
                  <b-col cols="8"
                    ><p class="mb-2">จำนวนที่ส่งในรอบนี้ :</p></b-col
                  >
                  <b-col cols="4"
                    ><p class="mb-2 text-right">{{ item_total }} ชิ้น</p></b-col
                  >
                </b-row>
                <b-row>
                  <b-col cols="7"><p class="mb-2">จำนวนที่เหลือ :</p></b-col>
                  <b-col cols="5"
                    ><p class="mb-2 text-right">
                      {{ item_now_left }} ชิ้น
                    </p></b-col
                  >
                </b-row>
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
                  <h5 class="mb-0 alert-text">กรุณากรอกข้อมูลให้ครบถ้วน!</h5>
                </div>
              </b-modal>

              <!-- alert item modal -->
              <b-modal
                id="modal-alert-item"
                centered
                title="คำเตือน!"
                ok-only
                ok-title="ตกลง"
                ok-variant="primary"
              >
                <div class="text-center">
                  <font-awesome-icon
                    :icon="['fas', 'times-circle']"
                    class="my-3 text-danger icon"
                  />
                  <h5 class="mb-0 alert-text">กรุณากรอกจำนวนใหม่อีกครั้ง!</h5>
                </div>
              </b-modal>

              <!-- db modal -->
              <b-modal
                id="modal-db"
                centered
                title="คำเตือน!"
                ok-only
                ok-title="ตกลง"
                ok-variant="primary"
              >
                <div class="text-center">
                  <font-awesome-icon
                    :icon="['fas', 'times-circle']"
                    class="my-3 text-danger icon"
                  />
                  <h5 class="my-2 alert-text">
                    ไม่สามารถเชื่อมต่อฐานข้อมูลได้!
                  </h5>
                  <h5 class="mb-0 alert-text">โปรดลองอีกครั้งในภายหลัง</h5>
                </div>
              </b-modal>

              <!-- no-list modal -->
              <b-modal
                id="modal-no-list"
                centered
                title="คำเตือน!"
                ok-only
                ok-title="ตกลง"
                ok-variant="primary"
              >
                <div class="text-center">
                  <font-awesome-icon
                    :icon="['fas', 'times-circle']"
                    class="my-3 text-danger icon"
                  />
                  <h5 class="my-2 alert-text">
                    รายการของคุณว่างเปล่า!
                  </h5>
                  <h5 class="mb-0 alert-text">
                    กรุณาเพิ่มรายการก่อนทำการบันทึก
                  </h5>
                </div>
              </b-modal>

              <!-- unsave modal -->
              <b-modal
                id="modal-unsave"
                centered
                title="คำเตือน!"
                ok-only
                ok-title="ตกลง"
                ok-variant="primary"
              >
                <div class="text-center">
                  <font-awesome-icon
                    :icon="['fas', 'times-circle']"
                    class="my-3 text-danger icon"
                  />
                  <h5 class="my-2">ไม่สามารถบันทึกได้!</h5>
                  <h5 class="my-2">
                    เนื่องจากจำนวนในรอบนี้
                  </h5>
                  <h5 class="mb-0">
                    เกินกว่าจำนวนที่ส่งได้
                  </h5>
                </div>
              </b-modal>

              <!-- saving modal -->
              <b-modal
                id="modal-saving"
                centered
                title="บันทึกข้อมูล!"
                ok-only
                ok-title="ตกลง"
                ok-variant="primary"
                no-close-on-backdrop
                no-close-on-esc
                hide-header-close
                @ok="savingRedirect"
              >
                <div v-if="save_success" class="text-center">
                  <font-awesome-icon
                    :icon="['fas', 'check-circle']"
                    class="my-3 text-success icon"
                  />
                  <h5 class="mb-0">บันทึกข้อมูลสำเร็จ!</h5>
                </div>
                <div v-else class="text-center">
                  <b-spinner
                    style="width: 3rem; height: 3rem;"
                    variant="primary"
                    class="my-3"
                  ></b-spinner>
                  <h5 class="mb-0">กำลังบันทึกข้อมูล...</h5>
                </div>
              </b-modal>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      items: [],
      item_left: null,
      save_success: false
    }
  },
  computed: {
    item_total() {
      let total = 0
      for (let i = 0; i < this.items.length; i++) {
        total += parseInt(this.items[i].amount)
      }
      return total
    },
    item_now_left() {
      return this.item_left - this.item_total
    }
  },
  created() {
    this.getAmount()
  },
  methods: {
    getAmount() {
      this.$fireStore
        .collection(this.$cookies.get('uid') + '_profile')
        .doc('data')
        .get()
        .then((data) => {
          this.item_left = data.data().item_left
        })
    },
    addData() {
      const getDetail = document.getElementById('detail')
      const getAmount = document.getElementById('amount')
      if (
        getDetail.value !== '' &&
        getAmount.value !== '' &&
        parseInt(getAmount.value) > 0
      ) {
        this.items.push({
          detail: getDetail.value,
          amount: parseInt(getAmount.value)
        })
        getDetail.value = ''
        getAmount.value = ''
      } else if (getDetail.value === '' && getAmount.value === '') {
        this.$bvModal.show('modal-alert')
      } else {
        this.$bvModal.show('modal-alert-item')
        getAmount.value = ''
      }
    },
    deleteData(index) {
      this.items.splice(index, 1)
    },
    saveModal() {
      if (this.item_left === null) {
        this.$bvModal.show('modal-db')
      } else if (this.item_total <= 0) {
        this.$bvModal.show('modal-no-list')
      } else {
        this.$bvModal.show('modal-save')
      }
    },
    saveData() {
      if (this.item_now_left >= 0) {
        this.$bvModal.show('modal-saving')
        this.$fireStore
          .collection(this.$cookies.get('uid') + '_data')
          .add({
            items: this.items,
            time: this.$fireStoreObj.FieldValue.serverTimestamp()
          })
          .then(() => {
            this.$fireStore
              .collection(this.$cookies.get('uid') + '_profile')
              .doc('data')
              .update({
                item_lastSend: parseInt(this.item_total),
                item_left: parseInt(this.item_now_left)
              })
              .then(() => {
                this.save_success = true
              })
          })
      } else {
        this.$bvModal.show('modal-unsave')
      }
    },
    savingRedirect(modal) {
      if (this.save_success) {
        this.$router.push('/')
      } else {
        modal.preventDefault()
      }
    }
  }
}
</script>

<style>
.description {
  font-size: 0.95rem;
}

.item-list {
  font-size: 1.3rem;
  line-height: 1.4;
}

.item-amount {
  font-size: 1.4rem;
  font-weight: bold;
}

.modal-title {
  font-size: 1.4rem;
}

.alert-text {
  font-size: 1.16rem;
}
</style>
