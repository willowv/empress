import _ from 'lodash'
import { addDays } from './util'

/*
    cyrb53 (c) 2018 bryc (github.com/bryc)
    License: Public domain (or MIT if needed). Attribution appreciated.
    A fast and simple 53-bit string hash function with decent collision resistance.
    Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
*/
export const hash_cyrb53 = function (str: string, seed = 0): number {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i)
        h1 = Math.imul(h1 ^ ch, 2654435761)
        h2 = Math.imul(h2 ^ ch, 1597334677)
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)
    return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}

export function random_splitmix32(seed: number): () => number {
    return function () {
        seed |= 0
        seed = (seed + 0x9e3779b9) | 0
        let t = seed ^ (seed >>> 16)
        t = Math.imul(t, 0x21f0aaad)
        t = t ^ (t >>> 15)
        t = Math.imul(t, 0x735a2d97)
        return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296
    }
}

// Between 1 and Max
export function randomRoll(maxValue: number, rand: () => number) {
    return randomNum(1, maxValue, rand)
}

// Between Min and Max inclusive
export function randomNum(
    minValue: number,
    maxValue: number,
    rand: () => number
) {
    if (minValue == maxValue) return minValue

    const diff = maxValue - minValue
    // We want an even distribution of probability for each integer; using Round would result
    // in the min and max being less likely. Floor of +1 gives every integer outcome an even
    // chance
    return Math.floor(rand() * (diff + 1)) + minValue
}

// Returns the index of the weights array that is randomly chosen
export function weightedSelect(weights: number[], rand: () => number): number {
    const weightTotal = weights.reduce(
        (weightTotal, weight) => weightTotal + weight,
        0
    )
    let selectValue = randomNum(1, weightTotal, rand)
    return weights.findIndex((weight) => {
        selectValue -= weight
        return selectValue <= 0
    })
}

export function generateSeed(date: Date): number {
    const currentDateTime = new Date()
    const seedDate = _.cloneDeep(date)
    seedDate.setHours(currentDateTime.getUTCHours())
    seedDate.setMinutes(currentDateTime.getUTCMinutes())
    seedDate.setSeconds(currentDateTime.getUTCSeconds())
    seedDate.setMilliseconds(currentDateTime.getUTCMilliseconds())
    return seedDate.valueOf()
}

export function validateSeed(date: Date, seed: string) {
    // validate that seed is correct for date
    // The seed is Date.now().toString(), so it should lie between the epoch time of date and the next date
    const epochDate = date.valueOf()
    const epochNextDate = addDays(date, 1).valueOf()
    const epochSeed = parseInt(seed)
    return epochSeed >= epochDate && epochSeed < epochNextDate
}
