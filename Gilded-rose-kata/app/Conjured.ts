import { Item } from "./Item"

export class Conjured extends Item {
    LIMIT_SELL_IN = 0

    update(): void {
        this.decreaseSellIn()

        this.decreaseQuality()
        this.decreaseQuality()

        if (this.hasPassedDayToSell(this.LIMIT_SELL_IN)) {
            this.decreaseQuality()
            this.decreaseQuality()
        }
    }
}
