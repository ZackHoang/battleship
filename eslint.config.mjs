import globals from "globals";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { languageOptions: { globals: globals.browser } },
    js.configs.recommended,
    eslintConfigPrettier,
];
