module.exports = {
  interpolate: /{{([\s\S]+?)}}/g,
  basePath: __dirname,
  templatesFolder: "/fabrik-templates",
  fileTypeSettings: [
    {
      fileType: ".scss",
      prefix: "_"
    }
  ],
  modules: [
    {
      type: "service",
      alias: "s",
      output: "app/services",
      fileTypes: "{js,test.js,fixture.json}"
    },
    {
      type: "filter",
      alias: "f",
      output: "app/filters",
      fileTypes: "{js,test.js}"
    },
    {
      type: "factory",
      alias: "fa",
      output: "app/factories",
      fileTypes: "{js,test.js}"
    },
    {
      type: "constant",
      alias: "cons",
      output: "app/constants",
      nested: false,
      fileTypes: "{js,test.js}"
    },
    {
      type: "component",
      alias: "c",
      output: "app/components",
      fileTypes: "{scss,js,html,test.js,fixture.html}"
    },
    {
      type: "controller",
      alias: "ctrl",
      output: "app/controllers",
      fileTypes: "{scss,js,html,test.js}"
    }
  ]
};
