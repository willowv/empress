import { generateSeed, validateSeed, weightedSelect } from './random'

describe('weightedSelect', () => {
    it('should select first index when first weight is 1 and others are 0', () => {
        const mockRand = () => 0
        const weights = [1, 0, 0]
        expect(weightedSelect(weights, mockRand)).toBe(0)
    })

    it('should select middle index with appropriate weights', () => {
        const mockRand = () => 0.5
        const weights = [1, 1, 1]
        expect(weightedSelect(weights, mockRand)).toBe(1)
    })

    it('should select last index with high random value', () => {
        const mockRand = () => 0.99
        const weights = [1, 1, 1]
        expect(weightedSelect(weights, mockRand)).toBe(2)
    })

    it('should handle single weight array', () => {
        const mockRand = () => 0
        const weights = [1]
        expect(weightedSelect(weights, mockRand)).toBe(0)
    })

    it('should handle weights with different magnitudes', () => {
        const mockRand = () => 0.7
        const weights = [1, 10, 1]
        expect(weightedSelect(weights, mockRand)).toBe(1)
    })

    it('should handle zero weights', () => {
        const mockRand = () => 0.5
        const weights = [0, 1, 0]
        expect(weightedSelect(weights, mockRand)).toBe(1)
    })
})

describe('generateSeed', () => {
    it('should always be valid', () => {
        // Generate a seed after 5pm pacific time
        const gameDate = new Date('2025-10-05')
        const currentLocalDate = new Date('2025-10-04T17:01-07:00')
        const seed = generateSeed(gameDate, currentLocalDate)

        // Try to validate that seed
        expect(validateSeed(gameDate, `${seed}`)).toBe(true)
    })
})
