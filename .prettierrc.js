module.exports = {
  ...require('gts/.prettierrc.json'),

  // Custom overrides for some of the inherited default rules, based on pour preferences
  semi: false,            // Don't force semi-column line endings, although it's the suggested approach
  bracketSpacing: true,   // Preserve spacing between brackets
  printWidth: 80,        // Increase the max line-wrap limit
  tabWidth: 2
}
