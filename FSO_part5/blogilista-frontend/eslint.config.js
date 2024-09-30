export default [
  {
    ignores: ["node_modules", "dist", "vite.config.js", "eslint.config.js"],
    rules: {
      indent: [
        "error",
        2
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      quotes: [
        "error",
        "single"
      ],
      semi: [
        "error",
        "never"
      ],
      eqeqeq: "error",
      "no-trailing-spaces": "error"
    },
  }
]