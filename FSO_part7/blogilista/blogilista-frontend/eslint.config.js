import vitest from "@vitest/eslint-plugin";
import eslistConfigPrettier from "eslint-config-prettier";

export default [
  eslistConfigPrettier,
  {
    ignores: ["node_modules", "dist", "vite.config.js", "eslint.config.js"],
    plugins: {
      vitest
    },
    rules: {
      ...vitest.configs.recommended.rules,
      indent: [
        "error",
        4
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      quotes: [
        "error",
        "double"
      ],
      semi: [
        "error",
        "always"
      ],
      eqeqeq: "error",
      "no-trailing-spaces": "error"
    },
  }
]