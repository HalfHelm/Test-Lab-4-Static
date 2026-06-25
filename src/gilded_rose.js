function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality() {

  for (const item of items) {

    let isAgedBrie = item.name === 'Aged Brie';
    let isBackstage = item.name === 'Backstage passes to a TAFKAL80ETC concert';
    let isSulfuras = item.name === 'Sulfuras, Hand of Ragnaros';
    let isConjured = item.name.indexOf('Conjured') === 0;

    // Sulfuras does not change
    if (isSulfuras) {
      continue;
    }

    // sell_in always decreases (except Sulfuras)
    item.sell_in--;

    // Aged brie check
    if (isAgedBrie) {
      if (item.quality < 50) {
        item.quality++;
      }
      if (item.sell_in < 0 && item.quality < 50) {
        item.quality++;
      }
    }
    // Backstage pass check
    else if (isBackstage) {

      if (item.quality < 50) {
        item.quality++;

        if (item.sell_in < 10 && item.quality < 50) {
          item.quality++;
        }

        if (item.sell_in < 5 && item.quality < 50) {
          item.quality++;
        }
      }

      if (item.sell_in < 0) {
        item.quality = 0;
      }
    }

    // Normal and conjured items check
    else {

      let decrease = isConjured ? 2 : 1;

      if (item.quality > 0) {
        item.quality -= decrease;
      }

      if (item.sell_in < 0 && item.quality > 0) {
        item.quality -= decrease;
      }
    }
    // Quality boundary checks
    if (item.quality < 0) {
      item.quality = 0;
    }

    if (item.quality > 50) {
      item.quality = 50;
    }
  }
}