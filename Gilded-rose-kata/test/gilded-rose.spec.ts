import { expect } from 'chai'
import { GildedRose } from '../app/GildedRose'
import { ItemFactory } from '../app/ItemFactory'
import { ITEM_NAME } from '../app/constants/item_name'
import { ItemQualityStandard } from '../app/ItemQualityStandard'

describe("Gilded Rose", function() {
  it("Should decrease sellIn value when is a standard item", function() {
    const item = ItemFactory.basedOn("any item", 10, 1)
    const gildedRose = new GildedRose([item])
    const expectedResult = 9

    const items = gildedRose.updateQuality()

    expect(items[0].sellIn).to.equal(expectedResult)

  })

  it("Should decrease quality value when is a standard item", function() {
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

  it("should not increase the quality when it is fifty", function() {
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

  it("should not allow a quality bellow zero when it is a standard item", function() {
    const errorMessage = 'Item quality should be between 0 - 50'

    expect(() => {
      new ItemQualityStandard(-1)
    }).to.throw(Error, errorMessage)
  })

  it("should not allow a quality over fifty when it is a standard item", function() {
    const errorMessage = 'Item quality should be between 0 - 50'

    expect(() => {
      new ItemQualityStandard(51)
    }).to.throw(Error, errorMessage)
  })

  it("Should decrease quality value twice when is Conjured Mana Cake", function() {
    const item = ItemFactory.basedOn(ITEM_NAME.CONJURED, 1, 10)
    const gildedRose = new GildedRose([item])
    const expectedResult = 8

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("Should decrease the quality fourfold as fast when the sell by date has \
    passed and it is Conjured Mana Cake", function() {
    const item = ItemFactory.basedOn(ITEM_NAME.CONJURED, 0, 10)
    const gildedRose = new GildedRose([item])
    const expectedResult = 6

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

});
