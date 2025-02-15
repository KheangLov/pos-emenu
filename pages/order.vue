<template>
  <div class="container mx-auto p-4">
    <h1 class="text-center text-4xl py-4 font-bold text-amber-500">Confirm Your Order</h1>
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div v-for="item in orderStore.items" :key="item.name" class="flex justify-between items-center border-b border-gray-200 py-2">
        <p class="text-gray-800">{{ item.name }}</p>
        <p class="text-gray-600">${{ item.price }}</p>
      </div>
      <div class="flex justify-between items-center mt-4">
        <p class="text-xl font-semibold text-gray-800">Total:</p>
        <p class="text-xl font-semibold text-gray-800">${{ totalPrice }}</p>
      </div>
      <button @click="placeOrder" class="mt-6 bg-amber-500 text-white px-6 py-3 rounded-full w-full hover:bg-amber-600 transition duration-300">Place Order</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useOrderStore } from '@/store/order'; // Import the order store

const { botToken, chatId } = useRuntimeConfig().public
const $router = useRouter(); // Access the router
const orderStore = useOrderStore(); // Access the store

const totalPrice = computed(() => {
  return orderStore.items.reduce((total, item) => total + item.price, 0);
});

onMounted(() => {
  if (orderStore.items.length === 0) {
    $router.push({ name: 'index' }); // Redirect to the home page if there are no items in the order
  }
});

const placeOrder = async () => {
  const orderMessage = orderStore.getOrderMessage(); // Get the order message
  const ids = chatId.split(',');
  let userName = '';

  if (window.Telegram?.WebApp?.initDataUnsafe) {
    const { user } = window.Telegram.WebApp.initDataUnsafe
    if (user) {
      userName = `${user.first_name} ${user.last_name}`; // Get userName
      user.id && ids.push(user.id); // Add the chatId from the Telegram WebApp
    }
  }

  const promises = ids.map(chat_id => $fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    body: {
      chat_id,
      text: `New Order${userName && ' from '}${userName || ''}:\n${orderMessage}`,
    },
  }));

  try {
    // Send the order to Telegram using $fetch
    const [response] = await Promise.all(promises);

    if (response.ok) {
      alert('Your order has been sent to the restaurant!');
      orderStore.clearOrder(); // Clear the order after sending
      $router.push({ name: 'index' }); // Navigate back to the home page
    } else {
      alert('Failed to place the order.');
    }
  } catch (error) {
    console.error('Error placing the order:', error);
    alert('There was an error placing your order.');
  }
};
</script>
