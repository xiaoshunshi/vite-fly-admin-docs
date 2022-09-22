# eslint 的配置

## 配置 eslint

- 安装 eslint `yarn add eslint -D`

- 初始化 eslint `npx eslint --init `

  ```
  You can also run this command directly using 'npm init @eslint/config'.
  Need to install the following packages:
    @eslint/create-config
  Ok to proceed? (y)

  // To check syntax, find problems, and enforce code style
  ? How would you like to use ESLint? ...
    To check syntax only
    To check syntax and find problems
  > To check syntax, find problems, and enforce code style

  // JavaScript modules
  ? What type of modules does your project use? ...
  > JavaScript modules (import/export)
    CommonJS (require/exports)
    None of these

  // vue.js
  ? Which framework does your project use? ...
    React
  > Vue.js
    None of these

  // yes
  ? Does your project use TypeScript? » No / Yes


  // 使用空格选择两个
  ? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
  √ Browser
  √ Node


  //  Use a popular style guide
  ? How would you like to define a style for your project? ...
  > Use a popular style guide
    Answer questions about your style

  // Standard
  ? Which style guide do you want to follow? ...
    Airbnb: https://github.com/airbnb/javascript
  > Standard: https://github.com/standard/standard
    Google: https://github.com/google/eslint-config-google
    XO: https://github.com/xojs/eslint-config-xo

  // JavaScript
  ? What format do you want your config file to be in? ...
  > JavaScript
    YAML
    JSON

  // 根据自己的环境选择
  Checking peerDependencies of eslint-config-standard@latest
  The config that you've selected requires the following dependencies:

  eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-standard@latest eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 @typescript-eslint/parser@latest
  √ Would you like to install them now? · No / Yes
  ? Which package manager do you want to use? ...
    npm
  > yarn
    pnpm
  ```

- 配置 vue3 的校验

  ```js
  // .eslintrc.js

  module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    globals: {
      $: "readonly",
      $$: "readonly",
      $ref: "readonly",
      $shallowRef: "readonly",
      $computed: "readonly",
      Fn: "readonly",
      PromiseFn: "readonly",
      RefType: "readonly",
      LabelValueOptions: "readonly",
      EmitType: "readonly",
      TargetContext: "readonly",
      ComponentElRef: "readonly",
      ComponentRef: "readonly",
      ElRef: "readonly",
      global: "readonly",
      ForDataType: "readonly",
      ComponentRoutes: "readonly",
      Recordable: "readonly",
      // CanvasTextBaseline: "readonly",
      // NodeJS: "readonly",

      // script setup
      defineOptions: "readonly",
      defineProps: "readonly",
      defineEmits: "readonly",
      defineExpose: "readonly",
      withDefaults: "readonly",

      document: "readonly",
      localStorage: "readonly",
      baiduMap: "readonly",
      window: "readonly",
      // 腾讯地图
      TMap: "readonly",
    },
    extends: [
      // 'plugin:vue/essential',
      // 使用 vue3 规则
      "plugin:vue/vue3-strongly-recommended",
      "standard",
    ],
    parserOptions: {
      ecmaVersion: "latest",
      parser: "@typescript-eslint/parser",
      sourceType: "module",
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {
      // 在写变量const {} 写一半时就会在vscode提示出错误来，非常的烦锁
      // indent : 'off',
      // 允许使用下划线命名
      "@typescript-eslint/indent": ["error", 2],
      camelcase: "off",
      // vue的index.vue不需要使用驼峰命名
      // 'vue/multi-word-component-names': [
      //   'error',
      //   {
      //     ignores: ['index'] // 需要忽略的组件名
      //   }
      // ],
      "vue/multi-word-component-names": "off",
      // vue的属性超过3个就换行显示
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: 3,
          multiline: 1,
        },
      ],
      // 可以debugger
      // 'no-debugger' : 'off',
      // 可以使用构造函数创建数组
      "no-array-constructor": "off",
      "@typescript-eslint/no-array-constructor": "off",
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "import/no-unresolved": "off",
      "import/extensions": "off",
      "import/no-absolute-path": "off",
      "import/no-extraneous-dependencies": "off",
      // 'vue/multi-word-component-names' : 'off',
      "vue/no-v-html": "off",
      "no-plusplus": [
        "off",
        {
          allowForLoopAfterthoughts: true,
        },
      ],
      // 'vue/max-attributes-per-line' : [2, {
      //   singleline : {
      //     max : 10
      //   },
      //   multiline : {
      //     max : 1
      //   }
      // }],
      "vue/no-use-v-if-with-v-for": 1,
      "vue/require-prop-types": "off",
      "vue/require-default-prop": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
      "accessor-pairs": 2,
      // 箭头函数前后空格
      "arrow-spacing": [
        2,
        {
          before: true,
          after: true,
        },
      ],
      "block-spacing": [2, "always"],
      "brace-style": [
        2,
        "1tbs",
        {
          allowSingleLine: true,
        },
      ],
      // camelcase : 'off',
      "comma-dangle": [2, "never"],
      "comma-spacing": [
        2,
        {
          before: false,
          after: true,
        },
      ],
      "comma-style": [2, "last"],
      "constructor-super": 2,
      curly: [2, "multi-line"],
      "dot-location": [2, "property"],
      "default-case": 2,
      "eol-last": 2,
      eqeqeq: [0, "always", { null: "ignore" }],
      "generator-star-spacing": [
        2,
        {
          before: true,
          after: true,
        },
      ],
      "handle-callback-err": [2, "^(err|error)$"],
      indent: [
        2,
        2,
        {
          SwitchCase: 1,
        },
      ],
      "jsx-quotes": [2, "prefer-single"],
      "key-spacing": [
        2,
        {
          beforeColon: false,
          afterColon: true,
        },
      ],
      "keyword-spacing": [
        2,
        {
          before: true,
          after: true,
        },
      ],
      "new-cap": "off",
      "new-parens": 2,
      "no-caller": 2,
      "no-console": "off",
      "no-class-assign": 2,
      "no-cond-assign": 2,
      "no-const-assign": 2,
      "no-control-regex": 0,
      "no-delete-var": 2,
      "no-dupe-args": 2,
      "no-dupe-class-members": 2,
      "no-dupe-keys": 2,
      "no-duplicate-case": 2,
      "no-empty": 0,
      "no-empty-character-class": 2,
      "no-empty-pattern": 0,
      "no-eval": 2,
      "no-ex-assign": 2,
      "no-extend-native": 2,
      "no-extra-bind": 2,
      "no-extra-boolean-cast": 2,
      "no-extra-parens": [2, "functions"],
      "no-fallthrough": 2,
      "no-floating-decimal": 2,
      "no-func-assign": 2,
      "no-implied-eval": 2,
      "no-inner-declarations": [2, "functions"],
      "no-invalid-regexp": 2,
      "no-irregular-whitespace": 2,
      "no-iterator": 2,
      "no-label-var": 2,
      "no-labels": [
        2,
        {
          allowLoop: false,
          allowSwitch: false,
        },
      ],
      "no-lone-blocks": 2,
      "no-mixed-spaces-and-tabs": 2,
      "no-multi-spaces": 2,
      "no-multi-str": 2,
      "no-multiple-empty-lines": [
        2,
        {
          max: 1,
        },
      ],
      "no-native-reassign": 2,
      "no-negated-in-lhs": 2,
      "no-new-object": 2,
      "no-new-require": 2,
      "no-new-symbol": 2,
      "no-new-wrappers": 2,
      "no-obj-calls": 2,
      "no-octal": 2,
      "no-octal-escape": 2,
      "no-path-concat": 2,
      "no-proto": 2,
      "no-redeclare": 2,
      "no-regex-spaces": 2,
      "no-return-assign": [2, "except-parens"],
      "no-self-assign": 2,
      "no-self-compare": 2,
      "no-sequences": 2,
      "no-shadow-restricted-names": 2,
      "no-spaced-func": 2,
      "no-sparse-arrays": 2,
      "no-this-before-super": 2,
      "no-throw-literal": 0,
      "no-trailing-spaces": 2,
      "no-undef": 2,
      "no-undef-init": 0,
      "no-unexpected-multiline": 2,
      "no-unmodified-loop-condition": 0,
      "no-unneeded-ternary": [
        2,
        {
          defaultAssignment: false,
        },
      ],
      "no-unreachable": 2,
      "no-unsafe-finally": 2,
      "no-unused-vars": [
        2,
        {
          vars: "all",
          args: "none",
        },
      ],
      "no-var": 0,
      "no-void": 2,
      "no-useless-call": 2,
      "no-useless-computed-key": 2,
      "no-useless-constructor": 2,
      "no-useless-escape": 0,
      "no-whitespace-before-property": 2,
      "no-with": 2,
      "one-var": [
        2,
        {
          initialized: "never",
        },
      ],
      "operator-linebreak": [
        2,
        "after",
        {
          overrides: {
            "?": "before",
            ":": "before",
          },
        },
      ],
      "padded-blocks": [2, "never"],
      quotes: [
        2,
        "single",
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      semi: [2, "never"],
      "semi-spacing": [
        2,
        {
          before: false,
          after: true,
        },
      ],
      "space-before-blocks": [2, "always"],
      "space-before-function-paren": [2, "never"],
      "space-in-parens": [2, "always"],
      "space-infix-ops": 2,
      "space-unary-ops": [
        2,
        {
          words: true,
          nonwords: false,
        },
      ],
      "spaced-comment": [
        2,
        "always",
        {
          markers: [
            "global",
            "globals",
            "eslint",
            "eslint-disable",
            "*package",
            "!",
            ",",
          ],
        },
      ],
      "template-curly-spacing": [2, "never"],
      "use-isnan": 2,
      "valid-typeof": 2,
      "wrap-iife": [2, "any"],
      "yield-star-spacing": [2, "both"],
      yoda: [2, "never"],
      "prefer-const": 2,
      "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
      "object-curly-spacing": [
        2,
        "always",
        {
          objectsInObjects: false,
        },
      ],
      "array-bracket-spacing": [2, "never"],
    },
  };
  ```

- 添加校验脚本

  ```
  "lint": "eslint src/**/*.{js,jsx,vue,ts,tsx} --fix"
  ```

- 在 vscode 编辑器扩展中禁用 Vetur

- 在 vscode 编辑器扩展中安装 eslint 插件

- 在 vscode 编辑器扩展中安装 Vue Language Features (Volar)
