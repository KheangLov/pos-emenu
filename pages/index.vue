<template>
  <div>
    <h1 class="text-center text-4xl py-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
      POS EMenu
    </h1>
    <div class="container mx-auto p-4 relative">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="item in menuItems" :key="item.id" class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
          <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover">
          <div class="p-4 flex justify-between items-center">
            <div>
              <h2 class="text-xl font-semibold text-gray-800">{{ item.name }}</h2>
              <p class="text-gray-600">${{ item.price }}</p>
            </div>
            <button @click="addToOrder(item)" class="h-max border border-amber-300 text-amber-300 px-4 py-2 rounded-full hover:text-white hover:bg-amber-400 transition duration-300">+</button>
          </div>
        </div>
      </div>
      <button
        v-if="items.length > 0"
        class="mb-8 bg-amber-300 text-white px-6 py-3 rounded block mx-auto hover:bg-amber-500 rounded-full w-full transition duration-300 sticky bottom-4"
        @click="goToOrderPage"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useOrderStore } from '@/store/order'; // Import the order store

const orderStore = useOrderStore(); // Access the store
const $router = useRouter(); // Access the router

const { items } = storeToRefs(orderStore); // Get the items from the store

const menuItems = ref([]);

onBeforeMount(async () => {
  const response = await $fetch('/api/menu');
  menuItems.value = response;
});

const addToOrder = (item) => {
  orderStore.addItem(item); // Add the item to the order store
};

const goToOrderPage = () => {
  // Navigate to the order page with selected items
  $router.push({ name: 'order' });
};

useHead({
  title: 'POS EMenu',
  meta: [
    {
      name: 'description',
      content: 'A simple POS EMenu application',
    },
  ],
});
</script>
