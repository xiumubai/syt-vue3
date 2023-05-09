import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    count: 1
  }),
  actions: {},
  getters: {}
})
export const a = 2
