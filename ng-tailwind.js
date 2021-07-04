module.exports = {
  // Tailwind Paths
  configJS: 'tailwind.config.js',
  sourceCSS: 'styles/tailwind-dev.css',
  outputCSS: 'styles/tailwind.css',
  watchRelatedFiles: [],
  // Sass
  sass: false,
  // PurgeCSS Settings
  purge: false,
  keyframes: false,
  fontFace: false,
  rejected: false,
  whitelist: [],
  whitelistPatterns: [],
  whitelistPatternsChildren: [],
  extensions: [
    '.ts',
    '.html',
    '.js'
  ],
  extractors: [],
  content: [
    './projects/frontend/**/*.html',
    './projects/frontend/**/*.ts',
    './projects/admin/**/*.html',
    './projects/admin/**/*.ts',
  ]
}
