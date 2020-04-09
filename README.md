# mathjax-react

> React Component Library for MathJax

<!--[![NPM](https://img.shields.io/npm/v/mathjax-react.svg)](https://www.npmjs.com/package/mathjax-react) -->
## Install

Install the mathjax-react package:
```bash
npm install --save mathjax-react
```
Install MathJax-full as a sibling dependency. This lets your bundler shake the mathjax-full tree and reduce bundle size.
```bash
npm install --save mathjax-full
```
Or, use yarn:
```bash
yarn add mathjax-react
yarn add mathjax-full
```
## Usage

Take a look at the [typescript-examples](./typescript-examples) on our [GitHub Pages](https://charliemcvicker.github.io/mathjax-react/)

```tsx
import * as React from 'react'

import { MathComponent } from 'mathjax-react'

class Example extends React.Component {
  render () {
    return (
      <MathComponent tex={String.raw`\int_0^1 x^2\ dx`} />
    )
  }
}
```

## Reference
Currently, this library contains one component, called the `MathComponent`. This is how you can interact with MathJax.
### MathComponent
#### Props
- `tex: string`: Use this prop when you want to typeset a TeX/LaTeX equation. Leave it empty if you are using MathML. If you are using TeX, place the source code for your TeX in this property. See the [live typesetting example](./typescript-examples/src/examples/LiveTyping.tsx).  
- `mathml: string`: Use this prop when you want to typeset a MathML equation. Leave it empty if you are using TeX. If you are using MathML, place the source code for your MathML in this property. See the [live typesetting example](./typescript-examples/src/examples/LiveTyping.tsx).  
- `display: boolean`: This controls the inline vs. block styling of the result. The default value is true, meaning block. If you would like an inline equation, set this property to false. See the [basic typesetting example](./typescript-examples/src/examples/BasicTypesetting.tsx).  
- `onError: string => void`: This property contains a function to be called on a typesetting/compilation error. The string passed into this handler will be the error generated by MathJax. The default behavior is to do nothing. See the [live typesetting example](./typescript-examples/src/examples/LiveTyping.tsx).
- `onSuccess: () => void`: This property contains a function to be called whenever the equation is successfully updated. This is useful for cleaning up after displaying errors with the `onError` prop. See the [live typesetting example](./typescript-examples/src/examples/LiveTyping.tsx).
## Developer Setup
### Install
Make sure everything is installed in the main directory:
```bash
yarn
```
Build the main directory so that we can link:
```bash
npx rollup -c
```
Run npm link in the main directory to create a global symlink:
```bash
yarn link
```
Run install and npm link in the `typescript-examples` directory to connect the library to the examples.
```bash
cd typescript-examples/
yarn link mathjax-react
yarn
```
### Usage
When working on examples, it is only required to run the following (in `typescript-examples/`):
```bash
yarn start
```
When also working on the library itself, one must also run (in the main directory):
```bash
yarn start
```
If rollup is not catching updates to files, the following may work:
```bash
npx rollup -w -c
```
## Manifest
### src/
Library Source
### typescript-examples
Examples using `mathjax-react` and `TypeScript`.

## License

MIT © [charliemcvicker](https://github.com/charliemcvicker)
