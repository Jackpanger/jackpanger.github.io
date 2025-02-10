---
title: Basic
createTime: 2024/12/14 11:13:44
permalink: /guide/materials/font-end-engineering/basic/
---

## Concepts

**Front-end Engineering** refers to the application of software engineering principles and best practices in the front-end development process to enhance code maintainability, scalability, and efficiency. This encompasses, but is not limited to, the following aspects:

1. **Modular Development**: Breaking down front-end code into reusable modules or components to facilitate easier management and maintenance.
2. **Build Tools and Automation**: Utilizing tools such as Webpack, Gulp, or Parcel to automate tasks like bundling, minification, and code transpilation.
3. **Code Standards and Quality Control**: Implementing tools like ESLint and Prettier to ensure code consistency and maintain high quality.
4. **Version Control**: Using version control systems like Git to manage code changes and collaborate effectively with team members.
5. **Continuous Integration and Continuous Deployment (CI/CD)**: Automating testing and deployment processes to ensure code stability and enable rapid delivery.
6. **Performance Optimization**: Applying various optimization techniques, such as lazy loading, code splitting, and caching strategies, to improve front-end performance.
7. **Testing**: Writing unit tests, integration tests, and end-to-end tests to ensure the correctness and reliability of front-end functionalities.

## Modularization

### Standards

- **CommonJS (CJS)**: Works at runtime, uses `require`.
- **ECMAScript Module (ESM)**: Works at compile time and runtime, uses `import`.

### Implementation

1. **Browser ESM**
2. **Node.js**: Supports both CommonJS and ESM.
3. **Build Tools**: Tools like Vue CLI, Vite, Create React App (CRA), and UmiJS support both CommonJS and ESM.

## Package Management

- **npm**: Manages package attributes, registry, and CLI.
  - **CLI**: Command-Line Interface

## Language Problems

### JS Tool Chain

1. Compatibility:
   - API Compatibility
     - Polyfill: core-js
   - Syntax Compatibility
     - syntax transformer(runtime)
       - regenerator: async await
2. Syntax Enhancement
   - TypeScript
   - jsx

babel(Integrated transformer)

### CSS Tool Chain

1. Syntax lacks (loop, condition, concatenation)
2. Function lacks (color manipulation, math functions, customized functions)

sass/less/stylus -> css pre-compiler -> css -> Post Compressor(Vendor Prefix,Code Minification,Code Pruning (commonly referred to as Tree Shaking in modern development),css module)->css
Or: css -> postcss->css

#### Post Compressor

1. Vendor Prefix

   - autoprefixer

2. Code Minification

   - cssnano

3. Code Pruning

   - purgecss

4. Class Name Conflicts

   - css module

## Engineering Problems
