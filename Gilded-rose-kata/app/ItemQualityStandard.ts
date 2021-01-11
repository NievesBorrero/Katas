import { ItemQualityOutOfRangeException } from "./errors/ItemQualityOutOfRangeException"
import { ItemQuality } from "./ItemQuality"

export class ItemQualityStandard implements ItemQuality{
    protected MAX_VALUE: number = 50
    private readonly MIN_VALUE: number = 0
    private readonly QUALITY_UNIT: number = 1
    private _value: number

    constructor (value: number) {
        if (value < this.MIN_VALUE || value > this.MAX_VALUE) {
            throw new ItemQualityOutOfRangeException(
                `Item quality should be between ${this.MIN_VALUE} - ${this.MAX_VALUE}`)
        }
        this._value = value
    }

    get value(): number {
        return this._value
    }

    increase = (): ItemQualityStandard => {
        if(this._value == this.MAX_VALUE) return this

        return new ItemQualityStandard(this._value += this.QUALITY_UNIT)
    }

    decrease = (): ItemQualityStandard => {
        if(this._value == this.MIN_VALUE) return this

        return new ItemQualityStandard(this._value -= this.QUALITY_UNIT)
    }

    reset = (): ItemQualityStandard => {
        return new ItemQualityStandard(this.MIN_VALUE)
    }
}
