import { ITEM_NAME } from "./constants/item_name"

export class ItemName {
    private readonly AGED_BRIE: string = ITEM_NAME.AGED_BRIE
    private readonly BACKSTAGE_PASSES: string = ITEM_NAME.BACKSTAGE_PASSES
    private readonly SULFURAS: string = ITEM_NAME.SULFURAS

    value: string

    constructor(value: string) {
        this.value = value
    }

    isAgedBrie(): boolean {
        return this.AGED_BRIE === this.value
    }

    isBackstagePasses(): boolean {
        return this.BACKSTAGE_PASSES === this.value
    }

    isSulfuras(): boolean {
        return this.SULFURAS === this.value
    }
}
