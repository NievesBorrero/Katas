import { Item } from "./Item"


export class GildedRose {
    items: Array<Item>

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality(): Array<Item> {
        this.items.map((item) => item.update())

        return this.items
    }

}
