module.exports = {
    root: true,
    // 设置全局变量
    globals: {
        WEBSITE_APP_APIHOST: true
    },
    env: {
        "browser": true,
        "commonjs": true,
        "node": true,
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        "eslint:recommended",
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
    }
};
