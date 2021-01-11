import { assert, expect } from 'chai'
import { GildedRose } from '../app/GildedRose'
import { ItemName } from '../app/ItemName'
import { ItemFactory } from '../app/ItemFactory'
import { ITEM_NAME } from '../app/constants/item_name'
import { ItemQualityStandard } from '../app/ItemQualityStandard'
import { ItemQualityOutOfRangeException } from '../app/errors/ItemQualityOutOfRangeException'

describe("Gilded Rose", function() {
  it("Should decrease sellIn value when is a commun item", function() {
    const item = ItemFactory.basedOn("any item", 10, 1)
    const gildedRose = new GildedRose([item])
    const expectedResult = 9

    const items = gildedRose.updateQuality()

    expect(items[0].sellIn).to.equal(expectedResult)

  })

  it("Should decrease quality value when is a commun item", function() {
    const item = ItemFactory.basedOn("any item", 1, 10)
    const gildedRose = new GildedRose([item])
    const expectedResult = 9

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("Should decrease the quality twice as fast when the sell by date has passed", function() {
    const item = ItemFactory.basedOn("any item", 0, 10)
    const gildedRose = new GildedRose([item])
    const expectedResult = 8

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should not decrease the quality when it is zero", function() {
    const item = ItemFactory.basedOn("any item", 0, 0)
    const gildedRose = new GildedRose([item])
    const expectedResult = 0

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should increase the quality whith age when item is Aged brie", function() {
    const item = ItemFactory.basedOn(ITEM_NAME.AGED_BRIE, 10, 1)
    const gildedRose = new GildedRose([item])
    const expectedResult = 2

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should not increase the quality when it when fifty", function() {
    const item = ItemFactory.basedOn(ITEM_NAME.AGED_BRIE, 1, 50)
    const gildedRose = new GildedRose([item])
    const expectedResult = 50

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should not change when it is Sulfuras", function() {
    const item = ItemFactory.basedOn(ITEM_NAME.SULFURAS, 2, 80)
    const gildedRose = new GildedRose([item])
    const expectedSellIn = 2
    const expectedQuality = 80

    const items = gildedRose.updateQuality()

    expect(items[0].sellIn).to.equal(expectedSellIn)
    expect(items[0].quality).to.equal(expectedQuality)
  })

  it("should increase the quality by one when it is backstage pass and sellIn is greater than ten", function() {
    const item = ItemFactory.basedOn(ITEM_NAME.BACKSTAGE_PASSES, 11, 2)
    const gildedRose = new GildedRose([item])
    const expectedResult = 3

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should increase the quality by two when it is backstage pass and sellIn is smaller than ten", function() {
    const itemName = new ItemName(ITEM_NAME.BACKSTAGE_PASSES)
    const item = ItemFactory.basedOn(ITEM_NAME.BACKSTAGE_PASSES, 9, 2)
    const gildedRose = new GildedRose([item])
    const expectedResult = 4

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should increase the quality by three when it is backstage pass and sellIn is smaller than five", function() {
    const item = ItemFactory.basedOn(ITEM_NAME.BACKSTAGE_PASSES, 4, 2)
    const gildedRose = new GildedRose([item])
    const expectedResult = 5

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should drop the quality to zero after the concert when it is backstage pass", function() {
    const item = ItemFactory.basedOn(ITEM_NAME.BACKSTAGE_PASSES, 0, 40)
    const gildedRose = new GildedRose([item])
    const expectedResult = 0

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  // TODO tests to conjured item: “Conjured Mana Cake” items degrade in Quality twice as fast as normal items

});
