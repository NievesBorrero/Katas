import { expect } from 'chai'
import { AgedBrie } from '../app/AgedBrie'
import { BackstagePass } from '../app/BackstagePass'
import { GildedRose } from '../app/GildedRose'
import { ItemQualityLegendary } from '../app/ItemQualityLegendary'
import { ItemQualityStandard } from '../app/ItemQualityStandard'
import { ItemSellIn } from '../app/ItemSellIn'
import { StandardItem } from '../app/StandardItem'
import { Sulfuras } from '../app/Sulfuras'

describe("Gilded Rose", function() {
  it("Should decrease sellIn value when is a commun item", function() {
    const itemQuality = new ItemQualityStandard(1)
    const itemSellIn = new ItemSellIn(10)
    const gildedRose = new GildedRose([new StandardItem("any item", itemSellIn, itemQuality)])
    const expectedResult = 9

    const items = gildedRose.updateQuality()

    expect(items[0].sellIn).to.equal(expectedResult)

  })

  it("Should decrease quality value when is a commun item", function() {
    const itemQuality = new ItemQualityStandard(10)
    const itemSellIn = new ItemSellIn(1)
    const gildedRose = new GildedRose([new StandardItem(
      "any item", itemSellIn, itemQuality)])
    const expectedResult = 9

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("Should decrease the quality twice as fast when the sell by date has passed", function() {
    const itemQuality = new ItemQualityStandard(10)
    const itemSellIn = new ItemSellIn(0)
    const gildedRose = new GildedRose([new StandardItem(
      "any item", itemSellIn, itemQuality)])
    const expectedResult = 8

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should not decrease the quality when it is zero", function() {
    const itemQuality = new ItemQualityStandard(0)
    const itemSellIn = new ItemSellIn(0)
    const gildedRose = new GildedRose([new StandardItem(
      "any item", itemSellIn, itemQuality)])
    const expectedResult = 0

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should increase the quality whith age when item is Aged brie", function() {
    const itemQuality = new ItemQualityStandard(1)
    const itemSellIn = new ItemSellIn(10)
    const gildedRose = new GildedRose([new AgedBrie(
      "Aged Brie", itemSellIn, itemQuality)])
    const expectedResult = 2

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should not increase the quality when it when fifty", function() {
    const itemQuality = new ItemQualityStandard(50)
    const itemSellIn = new ItemSellIn(1)
    const gildedRose = new GildedRose([new AgedBrie(
      "Aged Brie", itemSellIn, itemQuality)])
    const expectedResult = 50

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should not change when it is Sulfuras", function() {
    const itemQuality = new ItemQualityLegendary(80)
    const itemSellIn = new ItemSellIn(2)
    const gildedRose = new GildedRose([new Sulfuras(
      "Sulfuras, Hand of Ragnaros", itemSellIn, itemQuality)])
    const expectedSellIn = 2
    const expectedQuality = 80

    const items = gildedRose.updateQuality()

    expect(items[0].sellIn).to.equal(expectedSellIn)
    expect(items[0].quality).to.equal(expectedQuality)
  })

  it("should increase the quality by one when it is backstage pass and sellIn is greater than ten", function() {
    const itemQuality = new ItemQualityStandard(2)
    const itemSellIn = new ItemSellIn(11)
    const gildedRose = new GildedRose([new BackstagePass(
      "Backstage passes to a TAFKAL80ETC concert", itemSellIn, itemQuality)])
    const expectedResult = 3

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should increase the quality by two when it is backstage pass and sellIn is smaller than ten", function() {
    const itemQuality = new ItemQualityStandard(2)
    const itemSellIn = new ItemSellIn(9)
    const gildedRose = new GildedRose([new BackstagePass(
      "Backstage passes to a TAFKAL80ETC concert", itemSellIn, itemQuality)])
    const expectedResult = 4

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should increase the quality by three when it is backstage pass and sellIn is smaller than five", function() {
    const itemQuality = new ItemQualityStandard(2)
    const itemSellIn = new ItemSellIn(4)
    const gildedRose = new GildedRose([new BackstagePass(
      "Backstage passes to a TAFKAL80ETC concert", itemSellIn, itemQuality)])
    const expectedResult = 5

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should drop the quality to zero after the concert when it is backstage pass", function() {
    const itemQuality = new ItemQualityStandard(40)
    const itemSellIn = new ItemSellIn(0)
    const gildedRose = new GildedRose([new BackstagePass(
      "Backstage passes to a TAFKAL80ETC concert", itemSellIn, itemQuality)])
    const expectedResult = 0

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

 // TODO tests to conjured item: “Conjured Mana Cake” items degrade in Quality twice as fast as normal items

});
