import { Item } from "./Item"

export class BackstagePass extends Item {
    LIMIT_SELL_IN = 0
    DAY_LIMIT_TO_INCREASE_QUALITY = {
        DOUBLE: 10,
        TRIPLE: 5
    }

    update(): void {
        this.decreaseSellIn()
        this.increaseQuality()

        if (this.sellIn < this.DAY_LIMIT_TO_INCREASE_QUALITY.DOUBLE) {
            this.increaseQuality()
        }

        if (this.sellIn < this.DAY_LIMIT_TO_INCREASE_QUALITY.TRIPLE) {
            this.increaseQuality()
        }

        if (this.sellIn <= this.LIMIT_SELL_IN) {
            this.resetQuality()
        }
    }
}
