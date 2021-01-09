export interface ItemQuality {
    value: number

    increase(): ItemQuality

    decrease(): ItemQuality

    reset(): ItemQuality
}
