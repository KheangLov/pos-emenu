export default defineEventHandler(async () => {
  const { appUrl } = useRuntimeConfig().public;
  try {
    const menuItems = await $fetch(`${appUrl}/menu.json`);
    return menuItems;
  } catch (error) {
    return { error: appUrl };
  }
});
