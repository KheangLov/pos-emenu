import { defineStore } from 'pinia';

interface MenuItem {
  name: string;
  price: number;
}

interface OrderState {
  items: MenuItem[];
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    items: [],
  }),

  actions: {
    addItem(item: MenuItem) {
      this.items.push(item);
    },

    clearOrder() {
      this.items = [];
    },

    getOrderMessage() {
      return this.items.map(item => `${item.name} - ${item.price}`).join('\n');
    },
  },
});
