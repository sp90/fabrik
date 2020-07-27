# fabrik [![Build Status](https://travis-ci.org/sp90/fabrik.svg?branch=master)](https://travis-ci.org/sp90/fabrik)

> Fabrik is a cli to scaffold anything

## Install

```
$ npm install --global fabrik
```


## Usage

Remember to setup your `fabrik.config.js` and `/fabrik-templates` before you get going

```
$ fabrik --help
// or
$ fa --help

  Usage
    $ fabrik [name] -t service -d app/services

  Options
    --type, -t  service
    --dir, -d  app/services/

```


## Setup


#### Config
Start by adding fabrik.config.js to the root of your project, this is the bare minimum to define

```js
module.exports = {
  // Project root (Required)
  basePath: __dirname,

  // Directory where your module templates are defined
  templatesFolder: "/fabrik-templates",

  // Array of module configurations to scaffold
  modules: [
    {
      // Name of the module
      type: "service",

      // Shorthand/alias
      alias: "s",

      // Default directory to output to
      output: "app/services",

      // File endings to output from your template folder
      fileTypes: ["js", "spec.js"]
    }
  ]
};
```

#### Templates

By default inside your `/fabrik-templates` folder you need to add folders for the modules you wanna create in this case we're creating a service with a default spec file

Inside: `/fabrik-templates/service` we create .js and .spec.js

**Here is the variables accessable:**
- FABRIK_NAME
- FABRIK_NAME_FIRST_LETTER_CAPITALIZED
- FABRIK_NAME_LOWER
- FABRIK_NAME_SLUGIFIED

######Example spec.js

```js
import { TestBed } from '@angular/core/testing';

import { {{nameFirstLetterCapitalized}} } from './{{ nameSlugified }}';

describe('{{nameFirstLetterCapitalized}}', () => {
  let service: {{nameFirstLetterCapitalized}};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject({{nameFirstLetterCapitalized}});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

######Example js

```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class {{nameFirstLetterCapitalized}} {
  constructor() {}
}
```

#####Example command and output

Given the above configuration, and we run the following command `fabrik productState --type service` the output would look as following:

######Example output product-state.spec.js

```js
import { TestBed } from '@angular/core/testing';

import { ProductState } from './product-state';

describe('ProductState', () => {
  let service: ProductState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

```

######Example output product-state.js

```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductState {
  constructor() {}
}
```