import { defineStore } from 'pinia'
import { useSideStore } from './sideStore'
export const useCardStore = defineStore('customCard', {
    getters: {
        activeItemList: () => {
            const sideStore = useSideStore()
            return sideStore.sideList.map(item => {
                item.active = false
                return item
            })
        }
    }
})