module.exports = {
  root: true, // 该配置文件为项目的根配置文件
  parser: '@typescript-eslint/parser', // 使用 TypeScript 解析器
  parserOptions: {
    ecmaVersion: 2020, // 使用 ECMAScript 2020 标准
    sourceType: 'module', // 使用 ECMAScript 模块
    ecmaFeatures: {
      jsx: true, // 支持 JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // 自动检测 React 版本
    },
    'import/resolver': {
      node: {
        paths: ['src'], // 设置 import 模块解析的根路径为 src 目录
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // 指定解析模块时的文件扩展名
      },
    },
  },
  env: {
    browser: true, // 代码运行在浏览器中
    amd: true, // 代码使用 AMD 模块
    node: true, // 代码使用 Node.js 模块
  },
  extends: [
    'eslint:recommended', // ESLint 推荐规则
    'plugin:@typescript-eslint/recommended', // 使用 @typescript-eslint 推荐规则
    'plugin:react/recommended', // 使用 React 推荐规则
    'plugin:jsx-a11y/recommended', // 使用 jsx-a11y 推荐规则
    'plugin:prettier/recommended', // 使用 Prettier 推荐规则，需要放在最后
  ],
  plugins: ['simple-import-sort', 'prettier', 'react'], // 使用 simple-import-sort 和 prettier 、react 插件
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }], // 指定 prettier 规则
    'react/react-in-jsx-scope': 'off', // 关闭无需 import React 的规则
    'jsx-a11y/accessible-emoji': 'off', // 关闭 emoji 的可访问性检查
    'react/prop-types': 'off', // 关闭 propTypes 检查
    '@typescript-eslint/explicit-function-return-type': 'off', // 关闭函数返回值类型声明的检查
    'simple-import-sort/imports': 'error', // 强制使用简单导入排序规则
    'simple-import-sort/exports': 'error', // 强制使用简单导出排序规则
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': [
      // 指定 a 标签的 href 属性要么为空字符串，要么是有效的 URL
      'error',
      {
        components: ['Link'], // a 标签的替代组件
        specialLink: ['hrefLeft', 'hrefRight'], // 特殊链接属性名
        aspects: ['invalidHref', 'preferButton'], // 违规情况和优先使用 button 的情况
      },
    ],
    'react/self-closing-comp': [
      // 指定jsx标签中，但标签内没有内容时，自动转换为单标签
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
};
