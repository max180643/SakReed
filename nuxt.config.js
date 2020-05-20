export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: 'ซักรีด',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Mali&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Mitr:wght@500&display=swap'
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: 'icon.png'
      },
      // iOS Homescreen icon
      {
        rel: 'apple-touch-icon',
        href: 'icon/apple-touch-icon.png'
      },
      {
        rel: 'apple-touch-icon',
        size: '57x57',
        href: 'icon/apple-touch-icon.png'
      },
      {
        rel: 'apple-touch-icon',
        size: '72x72',
        href: 'icon/apple-touch-icon.png'
      },
      {
        rel: 'apple-touch-icon',
        size: '76x76',
        href: 'icon/apple-touch-icon.png'
      },
      {
        rel: 'apple-touch-icon',
        size: '114x114',
        href: 'icon/apple-touch-icon.png'
      },
      {
        rel: 'apple-touch-icon',
        size: '120x120',
        href: 'icon/apple-touch-icon.png'
      },
      {
        rel: 'apple-touch-icon',
        size: '144x144',
        href: 'icon/apple-touch-icon.png'
      },
      {
        rel: 'apple-touch-icon',
        size: '152x152',
        href: 'icon/apple-touch-icon.png'
      },
      {
        rel: 'apple-touch-icon',
        size: '180x180',
        href: 'icon/apple-touch-icon.png'
      },
      // iOS Splash Screen
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-2048-2732.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-2732-2048.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-1668-2388.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-2388-1668.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-1668-2224.png',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-2224-1668.png',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-1536-2048.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-2048-1536.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-1242-2688.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-2688-1242.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-1125-2436.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-2436-1125.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-828-1792.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-1792-828.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-1242-2208.png',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-2208-1242.png',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-750-1334.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-1334-750.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-640-1136.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: 'splash/apple-splash-1136-640.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      }
    ]
  },
  /*
   ** PWA
   */
  pwa: {
    meta: {
      mobileAppIOS: true,
      appleStatusBarStyle: 'black',
      description: 'แอพสำหรับคนที่ใช้บริการซักผ้าแบบรายเดือน',
      theme_color: '#325df6',
      lang: 'en-TH',
      ogSiteName: 'SakReed',
      ogTitle: 'ซักรีด | SakReed',
      ogDescription: 'แอพสำหรับคนที่ใช้บริการซักผ้าแบบรายเดือน',
      ogHost: 'https://sakreed.chnwt.dev/',
      ogImage: {
        path: 'icon_white.png',
        width: 180,
        height: 180
      }
    },
    manifest: {
      name: 'Sakreed',
      short_name: 'ซักรีด',
      theme_color: '#325df6',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      Scope: '/',
      start_url: '/',
      lang: 'en-TH'
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#325df6',
    background: 'white'
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-lazyload'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@aceforth/nuxt-optimized-images'
  ],
  optimizedImages: {
    optimizeImages: true
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: '',
          authDomain: '',
          databaseURL: '',
          projectId: '',
          storageBucket: '',
          messagingSenderId: '',
          appId: ''
        },
        services: {
          auth: true,
          firestore: true
        }
      }
    ],
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          }
        ]
      }
    ],
    [
      '@nuxtjs/moment',
      {
        moment: {
          defaultTimezone: 'Asia/Bangkok'
        }
      }
    ],
    ['cookie-universal-nuxt', { alias: 'cookies' }]
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
  // server: {
  //   port: 3000, // default: 3000
  //   host: '0.0.0.0' // default: localhost
  // }
}
