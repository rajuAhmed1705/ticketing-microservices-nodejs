export { default as DateDisplay } from '../..\\components\\DateDisplay.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Snackbar } from '../..\\components\\Snackbar.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'
export { default as Footer } from '../..\\components\\ui\\Footer.vue'
export { default as Navbar } from '../..\\components\\ui\\Navbar.vue'
export { default as Sidebar } from '../..\\components\\ui\\Sidebar.vue'

export const LazyDateDisplay = import('../..\\components\\DateDisplay.vue' /* webpackChunkName: "components/date-display" */).then(c => c.default || c)
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
export const LazySnackbar = import('../..\\components\\Snackbar.vue' /* webpackChunkName: "components/snackbar" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => c.default || c)
export const LazyFooter = import('../..\\components\\ui\\Footer.vue' /* webpackChunkName: "components/footer" */).then(c => c.default || c)
export const LazyNavbar = import('../..\\components\\ui\\Navbar.vue' /* webpackChunkName: "components/navbar" */).then(c => c.default || c)
export const LazySidebar = import('../..\\components\\ui\\Sidebar.vue' /* webpackChunkName: "components/sidebar" */).then(c => c.default || c)
