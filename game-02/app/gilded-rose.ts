export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items: Array<Item> = []) {
        this.items = items;
    }

    // Actualiza la calidad y el sellIn de los items
    updateQuality(): Array<Item> {
        for (const item of this.items) {
            if (item.name === 'Sulfuras') {
                continue;
            }

            this.updateItem(item);

            if (item.sellIn < 0) {
                this.handleExpiredItem(item);
            }
        }
        return this.items;
    }

    // Actualiza la calidad de un item basado en su tipo
    private updateItem(item: Item): void {
        switch (true) {
            case item.name === 'Aged Brie':
                this.updateAgedBrie(item);
                break;
            case item.name === 'Backstage passes':
                this.updateBackstagePasses(item);
                break;
            case item.name.indexOf('Conjured') === 0:
                this.updateConjuredItem(item);
                break;
            default:
                this.updateNormalItem(item);
                break;
        }
        item.sellIn -= 1;
    }

    // Aumenta la calidad de Aged Brie
    private updateAgedBrie(item: Item): void {
        if (item.quality < 50) {
            item.quality += 1;
        }
    }

    // Actualiza la calidad de Backstage passes
    private updateBackstagePasses(item: Item): void {
        if (item.quality < 50) {
            item.quality += 1;
            if (item.sellIn < 11 && item.quality < 50) {
                item.quality += 1;
            }
            if (item.sellIn < 6 && item.quality < 50) {
                item.quality += 1;
            }
        }
    }

    // Disminuye la calidad de los items Conjured
    private updateConjuredItem(item: Item): void {
        if (item.quality > 0) {
            item.quality -= 2;
        }
    }

    // Disminuye la calidad de los items normales
    private updateNormalItem(item: Item): void {
        if (item.quality > 0) {
            item.quality -= 1;
        }
    }

    // Maneja la degradación de items expirados
    private handleExpiredItem(item: Item): void {
        switch (true) {
            case item.name === 'Aged Brie':
                if (item.quality < 50) {
                    item.quality += 1;
                }
                break;
            case item.name === 'Backstage passes':
                item.quality = 0;
                break;
            case item.name.indexOf('Conjured') === 0:
                if (item.quality > 0) {
                    item.quality -= 2;
                }
                break;
            default:
                if (item.quality > 0) {
                    item.quality -= 1;
                }
                break;
        }
    }
}
