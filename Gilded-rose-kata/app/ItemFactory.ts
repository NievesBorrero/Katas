import { AgedBrie } from "./AgedBrie"
import { BackstagePass } from "./BackstagePass"
import { Conjured } from "./Conjured"
import { ItemName } from "./ItemName"
import { ItemQuality } from "./ItemQuality"
import { ItemQualityLegendary } from "./ItemQualityLegendary"
import { ItemQualityStandard } from "./ItemQualityStandard"
import { ItemSellIn } from "./ItemSellIn"
import { StandardItem } from "./StandardItem"
import { Sulfuras } from "./Sulfuras"

export class ItemFactory {
    static basedOn(name: string, sellIn: number, quality: number) {
        const itemName: ItemName = new ItemName(name)
        const itemSellIn: ItemSellIn = new ItemSellIn(sellIn)
        const itemQuality: ItemQuality = itemName.isSulfuras() ?
            new ItemQualityLegendary(quality) : new ItemQualityStandard(quality)

        switch(true){
            case itemName.isAgedBrie():
                return new AgedBrie(itemName, itemSellIn, itemQuality)
            case itemName.isBackstagePasses():
                return new BackstagePass(itemName, itemSellIn, itemQuality)
            case itemName.isSulfuras():
                return new Sulfuras(itemName, itemSellIn, itemQuality)
            case itemName.isConjured():
                return new Conjured(itemName, itemSellIn, itemQuality)
            default:
                return new StandardItem(itemName, itemSellIn, itemQuality)
        }
    }
}
