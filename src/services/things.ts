import { writable, type Writable } from 'svelte/store'
import thingsList from '../assets/things.json'

export interface Thing {
    name: string
    level: number
    x: number
    y: number
}

export const things: Writable<Thing[]> = writable([]) // could do the array of arrays thingy but im too lazy

export type ThingResult = 'move'
                        | 'delete'

export type InvThing = {
    name: string
    level: number
}

export const inventory: Writable<InvThing[]> = writable([{name: 'grass', level: 0}, {name: 'grass', level: 0},{name: 'grass', level: 0}])

export interface ThingData {
    description: string
    levels: {
        cost: number
        earnings: number
        src: string
    }[]
}

let thingDataMemo: { [key: string]: ThingData } = {}
export const thingData = async () => {
    if (Object.keys(thingDataMemo).length > 0) return thingDataMemo
    
    for (let name of thingsList) {
        thingDataMemo[name] = await import(`../assets/thing/${name}.json`)
    }
 
    return thingDataMemo
}