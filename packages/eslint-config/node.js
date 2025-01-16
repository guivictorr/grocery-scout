import { config as baseConfig } from "./base.js";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import globals from "globals";
import pluginJest from "eslint-plugin-jest";

/* @type {import("eslint").Linter.Config} */
export const nodeEslintConfig = [
  ...baseConfig,
  { files: ["**/*.spec.ts", "**/*.test.ts", "**/*.ts"] },
  {
    plugins: { jest: pluginJest },
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node, ...pluginJest.environments.globals.globals },
    },
  },
];
