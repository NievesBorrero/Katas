export class ItemSellIn {
    private readonly SELL_IN_UNIT: number = 1
    private _value: number

    constructor (value: number) {
        this._value = value
    }

    get value(): number {
        return this._value
    }

    decrease() {
        return new ItemSellIn(this._value -= this.SELL_IN_UNIT)
    }

}
