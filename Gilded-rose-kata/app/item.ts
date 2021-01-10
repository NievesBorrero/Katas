import { ItemQuality } from "./ItemQuality"
import { ItemSellIn } from "./ItemSellIn"

export abstract class Item {
    private _name: string
    private itemSellIn: ItemSellIn
    private itemQuality: ItemQuality

    constructor (name: string, itemSellIn: ItemSellIn, itemQuality: ItemQuality) {
        this._name = name
        this.itemSellIn = itemSellIn
        this.itemQuality = itemQuality
    }

    get quality(): number {
        return this.itemQuality.value
    }

    get sellIn(): number {
        return this.itemSellIn.value
    }

    abstract update()

    get name(): string {
        return this._name
    }

    increaseQuality () {
        this.itemQuality = this.itemQuality.increase()
    }

    decreaseQuality () {
        this.itemQuality = this.itemQuality.decrease()
    }

    resetQuality () {
        this.itemQuality = this.itemQuality.reset()
    }

    decreaseSellIn () {
        this.itemSellIn = this.itemSellIn.decrease()
    }

    hasPassedDayToSell(dayToSell: number) {
        return this.itemSellIn.value < dayToSell
    }
}
