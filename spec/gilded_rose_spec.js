describe("Gilded Rose", function() {

it("normal item decreases quality by 1 before sell date", function() {

items = [new Item("foo", 10, 20)];

update_quality();

expect(items[0].sell_in).toEqual(9);
expect(items[0].quality).toEqual(19);

});

it("normal item decreases quality by 2 after sell date", function() {

items = [new Item("foo", 0, 20)];

update_quality();

expect(items[0].sell_in).toEqual(-1);
expect(items[0].quality).toEqual(18);
});

it("quality of an item is never negative", function() {

items = [new Item("foo", 10, 0)];

update_quality();

expect(items[0].sell_in).toEqual(9);
expect(items[0].quality).toEqual(0);    
});

it("Aged Brie increases in quality the older it gets", function() {

items = [new Item("Aged Brie", 2, 0)];

update_quality();

expect(items[0].sell_in).toEqual(1);
expect(items[0].quality).toEqual(1);

});

it("quality of an item is never more than 50", function() {

items = [new Item("Aged Brie", 2, 50)];

update_quality();

expect(items[0].sell_in).toEqual(1);
expect(items[0].quality).toEqual(50);    

});

it("backstage pass increases quality by 1 when more than 10 days remain", function() {

    items = [new Item("Backstage passes to a TAFKAL80ETC concert",15,20)];

    update_quality();

    expect(items[0].sell_in).toEqual(14);
    expect(items[0].quality).toEqual(21);

});

it("backstage pass increases quality by 2 when 10 days or less remain", function() {

    items = [new Item("Backstage passes to a TAFKAL80ETC concert",10,20)];

    update_quality();

    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(22);

});

it("backstage pass increases quality by 3 when 5 days or less remain", function() {

    items = [new Item("Backstage passes to a TAFKAL80ETC concert",5,20)];

    update_quality();

    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(23);

});

it("backstage pass quality drops to 0 after concert", function() {

    items = [new Item("Backstage passes to a TAFKAL80ETC concert",0,20)];

    update_quality();

    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(0);

});

it("backstage pass quality does not exceed 50", function() {

    items = [new Item("Backstage passes to a TAFKAL80ETC concert",5,49)];

    update_quality();

    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(50);
});

it("Sulfuras never has to be sold or decreases in quality", function() {

    items = [new Item("Sulfuras, Hand of Ragnaros",0,80)];

    update_quality();

    expect(items[0].sell_in).toEqual(0);
    expect(items[0].quality).toEqual(80);

});
it("conjured items degrade twice as fast as normal items", function() {

    items = [new Item("Conjured Mana Cake", 3, 6)];

    update_quality();

    expect(items[0].sell_in).toEqual(2);
    expect(items[0].quality).toEqual(4);

});
});
