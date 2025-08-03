export type StarType = 'full' | 'half' | 'empty'

export function getStarTypes(rating: number): StarType[] {
  const fullCount = Math.floor(rating)
  const hasHalf = rating - fullCount >= 0.5 ? 1 : 0
  const emptyCount = 5 - fullCount - hasHalf

  return [
    ...Array(fullCount).fill('full'),
    ...Array(hasHalf).fill('half'),
    ...Array(emptyCount).fill('empty'),
  ]
}
