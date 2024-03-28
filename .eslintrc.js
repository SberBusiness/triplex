/* eslint-env node */
const eslintJest = require('eslint-plugin-jest').configs.recommended;

module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        es2017: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    parserOptions: {
        parser: "@babel/eslint-parser",
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module",
        requireConfigFile: false
    },
    plugins: ["react"],
    settings: {react: {version: "detect"}},
    ignorePatterns: ["/jest/*"],
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            extends: [
                "eslint:recommended",
                "plugin:react/recommended",
                "plugin:react-hooks/recommended",
                "plugin:jsx-a11y/recommended",
                "plugin:prettier/recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking"
            ],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.json', './**/tsconfig.json'],
                ecmaFeatures: {jsx: true}
            },
            plugins: ["react", "@typescript-eslint", "jsx-a11y"],
            rules: {
                "react/prop-types": "off",
                "@typescript-eslint/no-empty-interface": ["error", {"allowSingleExtends": true}],
                "@typescript-eslint/no-empty-function": ["error", {"allow": ["arrowFunctions"]}],
                "@typescript-eslint/no-unused-vars": ["warn", {"ignoreRestSiblings": true}],
                "@typescript-eslint/no-non-null-assertion": "off",
                "jsx-a11y/label-has-for": ["error", {"required": {"some": ["nesting", "id"]}}],
                "jsx-a11y/click-events-have-key-events": "off"
            },
            overrides: [
                {
                    files: ["**/*.test.ts", "**/*.test.tsx"],
                    parserOptions: {
                        project: "tsconfig.test.json",
                        ecmaFeatures: {jsx: true}
                    },
                },
                {
                    files: ["styleguidist/**/*.ts", "styleguidist/**/*.tsx"],
                    parserOptions: {
                        project: "styleguidist/tsconfig.json",
                        ecmaFeatures: {jsx: true}
                    },
                },
                {
                    files: ["tests/**/*.ts", "tests/**/*.tsx"],
                    parserOptions: {
                        project: "tests/tsconfig.json",
                        ecmaFeatures: {jsx: true}
                    },
                },
            ]
        },
        Object.assign(
            {files: ['**/*.test.ts', '**/*.test.tsx']},
            {
                ...eslintJest,
                "rules": {
                    ...eslintJest.rules,
                    "@typescript-eslint/ban-ts-comment": "off",
                    "@typescript-eslint/no-explicit-any": "off",
                    "@typescript-eslint/no-unsafe-assignment": "off",
                    "@typescript-eslint/no-unsafe-member-access": "off",
                    "@typescript-eslint/no-unsafe-call": "off",
                    "jest/no-disabled-tests": "off"
                }
            }
        )
    ]
}
