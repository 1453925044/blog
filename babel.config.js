module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "prismjs",
      {
        "languages": ["html", "css", "javascript", "php", "dart", "bash", "nginx", "sql"],
        "plugins": ["line-numbers", "copy-to-clipboard","previewers"],
        "theme": "okaidia",
        "css": true
      }
    ]
  ]
}
