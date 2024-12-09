import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";

const config = ([
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module"
            }
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            prettier: prettier,
            "unused-imports": unusedImports
        },
        rules: {
            "semi": ["error", "always"],
            "quotes": ["error", "double"],
            "@typescript-eslint/no-unused-vars": ["warn"],
            "indent": ["error", 2],
            "prettier/prettier": "error",
            /*"unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_"
                }
            ]*/
        }
    },
    prettierConfig
]);

export default config;