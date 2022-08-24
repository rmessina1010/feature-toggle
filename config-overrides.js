// config-overrides.js
module.exports = function override(config, env) {
    // New config, e.g. config.plugins.push...
      config={ ...config, experiments:{topLevelAwait: true}};
    return config
}

