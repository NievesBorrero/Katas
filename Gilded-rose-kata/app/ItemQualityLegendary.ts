import { ItemQuality } from "./ItemQuality"

export class ItemQualityLegendary implements ItemQuality{
    private _value: number

    constructor (value: number) {
        this._value = value
    }

    get value(): number {
        return this._value
    }

    increase = () => this

    decrease = () => this

    reset = () => this
}
