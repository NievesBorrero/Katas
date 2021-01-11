import { Item } from "./Item"

export class AgedBrie extends Item {
    LIMIT_SELL_IN = 0

    update(): void {
        this.decreaseSellIn()

        this.increaseQuality()

        if (this.hasPassedDayToSell(this.LIMIT_SELL_IN)) {
            this.increaseQuality()
        }
    }
}
