import { expect } from 'chai'
import { GildedRose } from '../app/gilded-rose'
import { Item } from '../app/item'

describe("Gilded Rose", function() {
  it("Should decrease sellIn value when is a commun item", function() {
    const gildedRose = new GildedRose([new Item("any item", 10, 1)])
    const expectedResult = 9

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(expectedResult);
  })

  it("Should decrease quality value when is a commun item", function() {
    const gildedRose = new GildedRose([new Item("any item", 1, 10)])
    const expectedResult = 9

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("Should decrease the quality twice as fast when the sell by date has passed", function() {
    const gildedRose = new GildedRose([new Item("any item", 0, 10)])
    const expectedResult = 8

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should not decrease the quality when it is zero", function() {
    const gildedRose = new GildedRose([new Item("any item", 0, 0)])
    const expectedResult = 0

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should increase the quality whith age when item is Aged brie", function() {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 1)])
    const expectedResult = 2

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should not increase the quality when it when fifty", function() {
    const gildedRose = new GildedRose([new Item("Aged Brie", 1, 50)])
    const expectedResult = 50

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should not change when it is Sulfuras", function() {
    const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 2, 80)])
    const expectedSellIn = 2
    const expectedQuality = 80

    const items = gildedRose.updateQuality()

    expect(items[0].sellIn).to.equal(expectedSellIn)
    expect(items[0].quality).to.equal(expectedQuality)
  })

  it("should increase the quality by one when it is backstage pass and sellIn is greater than ten", function() {
    const gildedRose = new GildedRose([new Item(
      "Backstage passes to a TAFKAL80ETC concert", 11, 2)])
    const expectedResult = 3

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should increase the quality by two when it is backstage pass and sellIn is smaller than ten", function() {
    const gildedRose = new GildedRose([new Item(
      "Backstage passes to a TAFKAL80ETC concert", 9, 2)])
    const expectedResult = 4

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should increase the quality by three when it is backstage pass and sellIn is smaller than five", function() {
    const gildedRose = new GildedRose([new Item(
      "Backstage passes to a TAFKAL80ETC concert", 4, 2)])
    const expectedResult = 5

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

  it("should drop the quality to zero after the concert when it is backstage pass", function() {
    const gildedRose = new GildedRose([new Item(
      "Backstage passes to a TAFKAL80ETC concert", 0, 50)])
    const expectedResult = 0

    const items = gildedRose.updateQuality()

    expect(items[0].quality).to.equal(expectedResult)
  })

 // TODO tests to conjured item: “Conjured” items degrade in Quality twice as fast as normal items

});
