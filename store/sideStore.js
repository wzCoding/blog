import { defineStore } from 'pinia'
import { Propertys } from '@data/css/property.js'

export const useSideStore = defineStore('customSide', {
    state: () => {
        return {
            hasSide: false,
            sideActive: false,
            sideId: 'A'
        }
    },
    getters: {
        sideList: (state) => {
            return Propertys[state.sideId] ? Propertys[state.sideId] : []
        }
    }
})