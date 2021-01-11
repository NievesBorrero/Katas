import { ItemName } from "./ItemName"
import { ItemQuality } from "./ItemQuality"
import { ItemSellIn } from "./ItemSellIn"

export abstract class Item {
    private itemName: ItemName
    private itemSellIn: ItemSellIn
    private itemQuality: ItemQuality

    constructor (name: ItemName, itemSellIn: ItemSellIn, itemQuality: ItemQuality) {
        this.itemName = name
        this.itemSellIn = itemSellIn
        this.itemQuality = itemQuality
    }

    get quality(): number {
        return this.itemQuality.value
    }

    get sellIn(): number {
        return this.itemSellIn.value
    }

    get name(): string {
        return this.itemName.value
    }

    abstract update(): void

    increaseQuality (): void {
        this.itemQuality = this.itemQuality.increase()
    }

    decreaseQuality (): void {
        this.itemQuality = this.itemQuality.decrease()
    }

    resetQuality (): void {
        this.itemQuality = this.itemQuality.reset()
    }

    decreaseSellIn (): void {
        this.itemSellIn = this.itemSellIn.decrease()
    }

    hasPassedDayToSell(dayToSell: number): boolean {
        return this.itemSellIn.value < dayToSell
    }
}
