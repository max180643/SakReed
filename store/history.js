export const state = () => ({
  detail: null,
  code: null
})

export const mutations = {
  setData(state, data) {
    state.detail = data
  },
  setCode(state, code) {
    state.code = code
  },
  removeData(state) {
    state.detail = null
    state.code = null
  }
}
