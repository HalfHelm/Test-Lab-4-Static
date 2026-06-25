function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

let items = [];

items.push(
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Conjured Mana Cake', 3, 6)
);

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';

function update_quality() {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const isBrie = item.name === AGED_BRIE;
    const isBackstage = item.name === BACKSTAGE;
    const isSulfuras = item.name === SULFURAS;
    const isConjured = item.name.startsWith('Conjured');

    const decrement = isConjured ? 2 : 1;

    if (!isBrie && !isBackstage) {
      if (!isSulfuras && item.quality > 0) {
        item.quality = Math.max(0, item.quality - decrement);
      }
    } else {
      if (item.quality < 50) {
        item.quality++;

        if (isBackstage) {
          if (item.sell_in < 11 && item.quality < 50) {
            item.quality++;
          }

          if (item.sell_in < 6 && item.quality < 50) {
            item.quality++;
          }
        }
      }
    }

    if (!isSulfuras) {
      item.sell_in--;
    }

    if (item.sell_in < 0) {
      if (isBrie) {
        if (item.quality < 50) {
          item.quality++;
        }
      } else if (isBackstage) {
        item.quality = 0;
      } else if (!isSulfuras && item.quality > 0) {
        item.quality = Math.max(0, item.quality - decrement);
      }
    }
  }
}

