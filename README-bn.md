<p align="center">
  <img width="120" src="public/img/cuet-logo.png">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.15.1-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://circleci.com/gh/Armour/vue-typescript-admin-template/tree/master">
    <img src="https://circleci.com/gh/Armour/vue-typescript-admin-template/tree/master.svg?style=shield" alt="CircleCI">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
  <a href="https://github.com/Armour/Jarvis">
    <img src="https://img.shields.io/badge/Hi-Jarvis-ff69b4.svg" alt="Template from jarvis">
  </a>
</p>

[English](./README.md) | বাংলা

## Overview

[চুয়েট ট্রান্সপোর্ট অটোমেশন সিস্টেম](https://github.com/tajirhas9/CUET-Transport-Automation-System) হল চুয়েটের পরিবহন ব্যবস্থা পরিচালনার জন্য একটি উৎপাদন-প্রস্তুত ফ্রন্ট-এন্ড সমাধান। এটি পরিবহন সম্পর্কিত অনেক কিছু পরিচালনা করতে পারে। যেমন:
- বাস শিডিউল করতে
- ড্রাইভার ম্যানেজ করতে
- বাসের অবস্থা যাচাই করতে, এবং আরো অনেক

## Features

```txt
- লগইন / লগআউট

- বাসের তথ্য আপডেট করা
- ড্রাইভারের তথ্য আপডেট করা
- বাসের সময়সূচী আপডেট করা
```

## Preparation

আপনাকে locally [নোড](http://nodejs.org/) এবং [গিট](https://git-scm.com/) ইনস্টল করতে হবে। এই প্রকল্পটি [typescript](https://www.typescriptlang.org/), [vue](https://vuejs.org/index.html) এর উপর ভিত্তি করে তৈরি করা হয়েছে।

## Project Structure

```bash
├── mock/                      # mock server & mock data
├── public                     # public static assets (directly copied)
│   │── favicon.ico            # favicon
│   │── manifest.json          # PWA config file
│   └── index.html             # index.html template
├── src                        # main source code
│   ├── api                    # api service
│   ├── assets                 # module assets like fonts, images (processed by webpack)
│   ├── components             # global components
│   ├── directives             # global directives
│   ├── filters                # global filter
│   ├── icons                  # svg icons
│   ├── lang                   # i18n language
│   ├── layout                 # global layout
│   ├── pwa                    # PWA service worker related files
│   ├── router                 # router
│   ├── store                  # store
│   ├── styles                 # global css
│   ├── utils                  # global utils
│   ├── views                  # views
│   ├── App.vue                # main app component
│   ├── main.ts                # app entry file
│   ├── permission.ts          # permission authentication
│   ├── settings.ts            # setting file
│   └── shims.d.ts             # type definition shims
├── tests/                     # tests
├── .circleci/                 # automated CI configuration
├── .browserslistrc            # browserslist config file (to support Autoprefixer)
├── .editorconfig              # editor code format consistency config
├── .env.xxx                   # env variable configuration
├── .eslintrc.js               # eslint config
├── babel.config.js            # babel config
├── jest.config.js             # jest unit test config
├── package.json               # package.json
├── postcss.config.js          # postcss config
├── tsconfig.json              # typescript config
└── vue.config.js              # vue-cli config
```

## Project setup

[yarn](https://yarnpkg.com/lang/en/) অথবা [npm](https://www.npmjs.com/get-npm) এর মাধ্যমে:

#### Install dependencies

```bash
npm install
```

#### Compiles and hot-reloads for development

```bash
npm run serve
```

#### Compiles and minifies for production

```bash
npm run build:prod
```

#### Lints and fixes files

```bash
npm run lint
```

#### Run your unit tests

```bash
npm run test:unit
```

#### Generate all svg components

```bash
npm run svg
```

## Browsers support

আধুনিক ব্রাউজার এবং ইন্টারনেট এক্সপ্লোরার 10+।

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT License](https://github.com/Armour/vue-typescript-admin-template/blob/master/LICENSE)
