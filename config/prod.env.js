module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_BASE: '"gcs-testapp"' // new!
})