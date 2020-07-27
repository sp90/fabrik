#!/usr/bin/env node
"use strict";
const meow = require("meow");
const fabrik = require("./lib/index");

const cli = meow(
  `
  Usage
    $ fabrik

  Options
    --type, -t to select what files to scaffold
`,
  {
    flags: {
      type: {
        type: "string",
        alias: "t"
      }
    }
  }
);

fabrik(cli.input[0], cli.flags);
