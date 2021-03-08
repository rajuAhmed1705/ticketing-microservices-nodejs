import colors from "vuetify/es5/util/colors";

export default {
    server: {
        port: 3000, // default: 3000
        host: "0.0.0.0", // default: localhost,
        timing: false,
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: "%s - client",
        title: "client",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ["~/plugins/bus", "~/plugins/notifier.js"],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        "@nuxtjs/vuetify",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],

    axios: {
        baseURL: "http://localhost:8000/api/",
        credentials: false,
        proxyHeaders: false,
        // proxy: true,
    },

    // proxy: {
    //   "/api/": {
    //     target: "http://10.10.10.208:80/",
    //     pathRewrite: {
    //       "/api/": "/hello",
    //     },
    //   },
    // },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ["~/assets/variables.scss"],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
};
