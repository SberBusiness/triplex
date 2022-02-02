const eslintJest = require('eslint-plugin-jest').configs.recommended;

module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "es2017": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
  },
  "settings": { "react": { "version": "detect" } },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "extends": [
          "eslint:recommended",
          "plugin:react/recommended",
          "plugin:jsx-a11y/strict",
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          "plugin:@typescript-eslint/recommended-requiring-type-checking",
          "plugin:react-hooks/recommended",
          "prettier/@typescript-eslint",
          "plugin:prettier/recommended"
        ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
          "project": "tsconfig.json",
          "tsconfigRootDir": ".",
          "ecmaFeatures": {
            "jsx": true
          }
      },
      "plugins": ["react", "@typescript-eslint", "jsx-a11y"],
      "rules": {
        "react/prop-types": "off",
        "@typescript-eslint/no-empty-interface": ["error", {"allowSingleExtends": true}],
        "@typescript-eslint/no-unused-vars": ["warn", {"ignoreRestSiblings": true}],
        "@typescript-eslint/no-non-null-assertion": "off",
      },
      "overrides": [
        {
          "files": ["**/styleguidist/**/*.ts", "**/styleguidist/**/*.tsx"],
          "parser": "@typescript-eslint/parser",
          "parserOptions": {
            "project": "./styleguidist/tsconfig.json",
            "tsconfigRootDir": ".",
            "ecmaFeatures": {
                "jsx": true
            }
        },
        }
      ]
    },
    Object.assign(
      {files: ['**/*.test.ts', '**/*.test.tsx']},
      {...eslintJest, "rules": {
        ...eslintJest.rules,
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "jest/no-disabled-tests": "off"
      }},
    )
  ]
}
