import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';

export const router = createRouter({
  history: createWebHistory(),
  // pass the generated routes written by the plugin 🤖
  routes,
});

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router);
}
