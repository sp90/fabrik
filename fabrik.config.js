module.exports = {
  interpolate: /{{([\s\S]+?)}}/g,
  basePath: __dirname,
  templatesFolder: "/fabrik-templates",
  modules: [
    {
      type: "service",
      alias: "s",
      output: "app/services",
      fileTypes: ['ts', 'spec.ts']
    },
  ]
};
