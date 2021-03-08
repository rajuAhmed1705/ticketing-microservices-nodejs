import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _86f285da = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _2d194ca1 = () => interopDefault(import('../pages/custom/education.vue' /* webpackChunkName: "pages/custom/education" */))
const _531f25fe = () => interopDefault(import('../pages/hr/masterDB.vue' /* webpackChunkName: "pages/hr/masterDB" */))
const _5905b37e = () => interopDefault(import('../pages/hr/settings.vue' /* webpackChunkName: "pages/hr/settings" */))
const _b856655a = () => interopDefault(import('../pages/hr/configuration/bank.vue' /* webpackChunkName: "pages/hr/configuration/bank" */))
const _197317ae = () => interopDefault(import('../pages/hr/configuration/department.vue' /* webpackChunkName: "pages/hr/configuration/department" */))
const _746c2fb0 = () => interopDefault(import('../pages/hr/configuration/designation.vue' /* webpackChunkName: "pages/hr/configuration/designation" */))
const _d66be8f0 = () => interopDefault(import('../pages/hr/configuration/educationalLevel.vue' /* webpackChunkName: "pages/hr/configuration/educationalLevel" */))
const _93dc8ad2 = () => interopDefault(import('../pages/hr/configuration/employeeStatus.vue' /* webpackChunkName: "pages/hr/configuration/employeeStatus" */))
const _45d0751f = () => interopDefault(import('../pages/hr/configuration/employeeType.vue' /* webpackChunkName: "pages/hr/configuration/employeeType" */))
const _43da14ef = () => interopDefault(import('../pages/hr/configuration/language.vue' /* webpackChunkName: "pages/hr/configuration/language" */))
const _a340fb46 = () => interopDefault(import('../pages/hr/configuration/projectname.vue' /* webpackChunkName: "pages/hr/configuration/projectname" */))
const _0c93ba48 = () => interopDefault(import('../pages/hr/configuration/religion.vue' /* webpackChunkName: "pages/hr/configuration/religion" */))
const _4025fe13 = () => interopDefault(import('../pages/hr/configuration/rule.vue' /* webpackChunkName: "pages/hr/configuration/rule" */))
const _8acaac6c = () => interopDefault(import('../pages/hr/configuration/skill.vue' /* webpackChunkName: "pages/hr/configuration/skill" */))
const _fca7440e = () => interopDefault(import('../pages/hr/configuration/typeOfTurnover.vue' /* webpackChunkName: "pages/hr/configuration/typeOfTurnover" */))
const _31bd43b4 = () => interopDefault(import('../pages/hr/profile/_id.vue' /* webpackChunkName: "pages/hr/profile/_id" */))
const _4cc86b4b = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _86f285da,
    name: "inspire"
  }, {
    path: "/custom/education",
    component: _2d194ca1,
    name: "custom-education"
  }, {
    path: "/hr/masterDB",
    component: _531f25fe,
    name: "hr-masterDB"
  }, {
    path: "/hr/settings",
    component: _5905b37e,
    name: "hr-settings"
  }, {
    path: "/hr/configuration/bank",
    component: _b856655a,
    name: "hr-configuration-bank"
  }, {
    path: "/hr/configuration/department",
    component: _197317ae,
    name: "hr-configuration-department"
  }, {
    path: "/hr/configuration/designation",
    component: _746c2fb0,
    name: "hr-configuration-designation"
  }, {
    path: "/hr/configuration/educationalLevel",
    component: _d66be8f0,
    name: "hr-configuration-educationalLevel"
  }, {
    path: "/hr/configuration/employeeStatus",
    component: _93dc8ad2,
    name: "hr-configuration-employeeStatus"
  }, {
    path: "/hr/configuration/employeeType",
    component: _45d0751f,
    name: "hr-configuration-employeeType"
  }, {
    path: "/hr/configuration/language",
    component: _43da14ef,
    name: "hr-configuration-language"
  }, {
    path: "/hr/configuration/projectname",
    component: _a340fb46,
    name: "hr-configuration-projectname"
  }, {
    path: "/hr/configuration/religion",
    component: _0c93ba48,
    name: "hr-configuration-religion"
  }, {
    path: "/hr/configuration/rule",
    component: _4025fe13,
    name: "hr-configuration-rule"
  }, {
    path: "/hr/configuration/skill",
    component: _8acaac6c,
    name: "hr-configuration-skill"
  }, {
    path: "/hr/configuration/typeOfTurnover",
    component: _fca7440e,
    name: "hr-configuration-typeOfTurnover"
  }, {
    path: "/hr/profile/:id?",
    component: _31bd43b4,
    name: "hr-profile-id"
  }, {
    path: "/",
    component: _4cc86b4b,
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
