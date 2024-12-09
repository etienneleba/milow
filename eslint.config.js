import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const config = ([
    {
        files: ["src/**/*.ts"], // Apply these rules to TypeScript files
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module"
            }
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            prettier: prettier
        },
        rules: {
            "semi": ["error", "always"],
            "quotes": ["error", "double"],
            "@typescript-eslint/no-unused-vars": ["warn"],
            "@typescript-eslint/no-explicit-any": "warn",
            "indent": ["error", 2],
            "prettier/prettier": "error"
        }
    },
    prettierConfig
]);

export default config;