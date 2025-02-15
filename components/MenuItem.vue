<template>
  <div>
    <h3>{{ item.name }}</h3>
    <p>{{ item.price | currency }}</p>
    <button @click="addToOrder">Add to Order</button>
  </div>
</template>

<script setup>
import { useOrderStore } from '@/store/order'; // Import the order store

const orderStore = useOrderStore(); // Access the order store

const props = defineProps({
  item: Object
});

const addToOrder = (item) => {
  orderStore.addItem(item); // Add the selected item to the order
};
</script>
