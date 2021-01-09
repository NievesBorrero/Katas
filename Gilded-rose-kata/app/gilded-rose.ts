import {
    BACKSTAGE_PASS_DAY_LIMIT,
    LIMIT_SELL_IN, ITEM_NAME,
    MAX_QUALITY,
    MIN_QUALITY,
    QUALITY_UNIT,
    SELL_IN_UNIT,
    INITIAL_QUALITY
} from "./constants"
import { Item } from "./item"


export class GildedRose {
    items: Array<Item>

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items.map((item) => {
            switch(item.name){
                case ITEM_NAME.AGED_BRIE:
                    this.decreaseSellIn(item)
                    this.updateAgeBrieQuality(item)
                    break
                case ITEM_NAME.BACKSTAGE_PASSES:
                    this.decreaseSellIn(item)
                    this.updateBackstagePassesQuality(item)
                    break
                case ITEM_NAME.SULFURAS:
                    break
                default:
                    this.decreaseSellIn(item)
                    this.updateCommonItemQuality(item)
                    break
            }
        })

        return this.items
    }

    decreaseSellIn = (item: Item) => {
        item.sellIn -= SELL_IN_UNIT
    }

    updateAgeBrieQuality = (item: Item) => {
        this.increaseQuality(item)

        if(item.sellIn < LIMIT_SELL_IN){
            this.increaseQuality(item)
        }
    }

    updateBackstagePassesQuality(item: Item) {
        this.increaseQuality(item)

        if (item.sellIn < BACKSTAGE_PASS_DAY_LIMIT.DOUBLE_QUALITY_INCREASE) {
            this.increaseQuality(item);
        }

        if (item.sellIn < BACKSTAGE_PASS_DAY_LIMIT.TRIPLE_QUALITY_INCREASE) {
            this.increaseQuality(item);
        }

        if (item.sellIn < LIMIT_SELL_IN) {
            this.resetQuality(item);
        }
    }

    increaseQuality = (item: Item) => {
        if (item.quality >= MAX_QUALITY) return

        item.quality += QUALITY_UNIT
    }

    updateCommonItemQuality = (item: Item) => {
        this.decreaseQuality(item)

        if (item.sellIn < LIMIT_SELL_IN){
            this.decreaseQuality(item)
        }
    }

    decreaseQuality = (item: Item) => {
        if (item.quality <= MIN_QUALITY) return

        item.quality -= QUALITY_UNIT
    }

    resetQuality = (item: Item) => {
        item.quality = INITIAL_QUALITY
    }

}
