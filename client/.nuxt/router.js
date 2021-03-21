import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0f084ea0 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _6a0f1846 = () => interopDefault(import('..\\pages\\custom\\education.vue' /* webpackChunkName: "pages/custom/education" */))
const _42c56a94 = () => interopDefault(import('..\\pages\\hr\\masterDB.vue' /* webpackChunkName: "pages/hr/masterDB" */))
const _15ff914e = () => interopDefault(import('..\\pages\\hr\\masterDB2.vue' /* webpackChunkName: "pages/hr/masterDB2" */))
const _79b92a52 = () => interopDefault(import('..\\pages\\hr\\settings.vue' /* webpackChunkName: "pages/hr/settings" */))
const _a58a3ea4 = () => interopDefault(import('..\\pages\\hr\\configuration\\bank.vue' /* webpackChunkName: "pages/hr/configuration/bank" */))
const _872d5178 = () => interopDefault(import('..\\pages\\hr\\configuration\\department.vue' /* webpackChunkName: "pages/hr/configuration/department" */))
const _60b4a016 = () => interopDefault(import('..\\pages\\hr\\configuration\\designation.vue' /* webpackChunkName: "pages/hr/configuration/designation" */))
const _373eee63 = () => interopDefault(import('..\\pages\\hr\\configuration\\educationalLevel.vue' /* webpackChunkName: "pages/hr/configuration/educationalLevel" */))
const _c2f0cf9c = () => interopDefault(import('..\\pages\\hr\\configuration\\employeeStatus.vue' /* webpackChunkName: "pages/hr/configuration/employeeStatus" */))
const _51c6fd7a = () => interopDefault(import('..\\pages\\hr\\configuration\\employeeType.vue' /* webpackChunkName: "pages/hr/configuration/employeeType" */))
const _3b0102ca = () => interopDefault(import('..\\pages\\hr\\configuration\\language.vue' /* webpackChunkName: "pages/hr/configuration/language" */))
const _099902a2 = () => interopDefault(import('..\\pages\\hr\\configuration\\projectname.vue' /* webpackChunkName: "pages/hr/configuration/projectname" */))
const _03baa823 = () => interopDefault(import('..\\pages\\hr\\configuration\\religion.vue' /* webpackChunkName: "pages/hr/configuration/religion" */))
const _498c116e = () => interopDefault(import('..\\pages\\hr\\configuration\\rule.vue' /* webpackChunkName: "pages/hr/configuration/rule" */))
const _4411fc62 = () => interopDefault(import('..\\pages\\hr\\configuration\\skill.vue' /* webpackChunkName: "pages/hr/configuration/skill" */))
const _6a223b94 = () => interopDefault(import('..\\pages\\hr\\configuration\\typeOfTurnover.vue' /* webpackChunkName: "pages/hr/configuration/typeOfTurnover" */))
const _42f697e5 = () => interopDefault(import('..\\pages\\hr\\profile\\_id.vue' /* webpackChunkName: "pages/hr/profile/_id" */))
const _4daafc18 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _0f084ea0,
    name: "inspire"
  }, {
    path: "/custom/education",
    component: _6a0f1846,
    name: "custom-education"
  }, {
    path: "/hr/masterDB",
    component: _42c56a94,
    name: "hr-masterDB"
  }, {
    path: "/hr/masterDB2",
    component: _15ff914e,
    name: "hr-masterDB2"
  }, {
    path: "/hr/settings",
    component: _79b92a52,
    name: "hr-settings"
  }, {
    path: "/hr/configuration/bank",
    component: _a58a3ea4,
    name: "hr-configuration-bank"
  }, {
    path: "/hr/configuration/department",
    component: _872d5178,
    name: "hr-configuration-department"
  }, {
    path: "/hr/configuration/designation",
    component: _60b4a016,
    name: "hr-configuration-designation"
  }, {
    path: "/hr/configuration/educationalLevel",
    component: _373eee63,
    name: "hr-configuration-educationalLevel"
  }, {
    path: "/hr/configuration/employeeStatus",
    component: _c2f0cf9c,
    name: "hr-configuration-employeeStatus"
  }, {
    path: "/hr/configuration/employeeType",
    component: _51c6fd7a,
    name: "hr-configuration-employeeType"
  }, {
    path: "/hr/configuration/language",
    component: _3b0102ca,
    name: "hr-configuration-language"
  }, {
    path: "/hr/configuration/projectname",
    component: _099902a2,
    name: "hr-configuration-projectname"
  }, {
    path: "/hr/configuration/religion",
    component: _03baa823,
    name: "hr-configuration-religion"
  }, {
    path: "/hr/configuration/rule",
    component: _498c116e,
    name: "hr-configuration-rule"
  }, {
    path: "/hr/configuration/skill",
    component: _4411fc62,
    name: "hr-configuration-skill"
  }, {
    path: "/hr/configuration/typeOfTurnover",
    component: _6a223b94,
    name: "hr-configuration-typeOfTurnover"
  }, {
    path: "/hr/profile/:id?",
    component: _42f697e5,
    name: "hr-profile-id"
  }, {
    path: "/",
    component: _4daafc18,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
