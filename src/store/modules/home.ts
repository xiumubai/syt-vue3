import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    count: 2
  }),
  actions: {},
  getters: {}
})
