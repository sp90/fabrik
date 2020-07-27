# fabrik ![Node.js CI](https://github.com/sp90/fabrik/workflows/Node.js%20CI/badge.svg) ![Node.js Package](https://github.com/sp90/fabrik/workflows/Node.js%20Package/badge.svg)

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


##### Example ts

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FABRIK_NAME_FIRST_LETTER_CAPITALIZED {
  constructor() {}
}
```

##### Example spec.ts

```ts
import { TestBed } from '@angular/core/testing';

import { FABRIK_NAME_FIRST_LETTER_CAPITALIZED } from './FABRIK_NAME_SLUGIFIED';

describe('FABRIK_NAME_FIRST_LETTER_CAPITALIZED', () => {
  let service: FABRIK_NAME_FIRST_LETTER_CAPITALIZED;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FABRIK_NAME_FIRST_LETTER_CAPITALIZED);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

#### Example command and output

Given the above configuration, and we run the following command `fabrik productState --type service` the output would look as following:



##### Example output product-state.ts

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductState {
  constructor() {}
}
```

##### Example output product-state.spec.ts

```ts
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
