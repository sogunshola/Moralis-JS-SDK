<p align="center">
    <a href="https://moralis.io">
    <img width="132" height="101" src="https://moralis.io/wp-content/uploads/2021/01/logo.png" class="attachment-full size-full" alt="Moralis Build Serverless web3 apps" loading="lazy" /></a>
</p>

<h2 align="center">Moralis SDK for JavaScript</h2>

<p align="center">
    A library that gives you access to the powerful Moralis Server backend from your JavaScript app. <a href="https://moralis.io">Create Server Here</a>
</p>

<br>

For more information on Moralis and its features, see [the website](https://moralis.io), [the JavaScript guide](https://docs.moralis.io), [the Cloud Code guide](https://docs.moralis.io/moralis-server/cloud-code) or [Web3 Reference](https://docs.moralis.io/moralis-server/web3-sdk/intro).

## Getting Started

The easiest way to integrate the Moralis SDK into your JavaScript project is through the [npm module](https://npmjs.org/moralis).
However, if you want to use a pre-compiled file, you can fetch it from [unpkg](https://unpkg.com). The development version is available at [https://unpkg.com/moralis/dist/moralis.js](https://unpkg.com/moralis/dist/moralis.js), and the minified production version is at [https://unpkg.com/moralis/dist/moralis.min.js](https://unpkg.com/moralis/dist/moralis.min.js).

### Using Moralis on Different Platforms

The JavaScript ecosystem is wide and incorporates a large number of platforms and execution environments. To handle this, the Moralis npm module contains special versions of the SDK tailored to use in Node.js and [React Native](https://facebook.github.io/react-native/) environments. Not all features make sense in all environments, so using the appropriate package will ensure that items like local storage, user sessions, and HTTP requests use appropriate dependencies. For server side rendered applications, you may set the `SERVER_RENDERING` variable to prevent warnings at runtime.

To use the npm modules for a browser based application, include it as you normally would:

```js
const Moralis = require('moralis');
// ES6 Minimized
import Moralis from 'moralis/dist/moralis.min.js';
```

For server-side applications or Node.js command line tools, include `'moralis/node'`:

```js
// In a node.js environment
const Moralis = require('moralis/node');
```

For React Native applications, include `'moralis/react-native.js'`:
```js
// In a React Native application
const Moralis = require('moralis/react-native.js');

// On React Native >= 0.50 and Moralis >= 1.11.0, set the Async
const AsyncStorage = require('react-native').AsyncStorage;
Moralis.setAsyncStorage(AsyncStorage);
```

For WeChat miniprogram, include `'moralis/weapp'`:
```js
// In a WeChat miniprogram
const Moralis = require('moralis/weapp');
```
If you want to use a pre-compiled file, you can fetch it from [unpkg](https://unpkg.com). The development version is available at [https://unpkg.com/moralis/dist/moralis.weapp.js](https://unpkg.com/moralis/dist/moralis.weapp.js), and the minified production version is at [https://unpkg.com/moralis/dist/moralis.weapp.min.js](https://unpkg.com/moralis/dist/moralis.weapp.min.js).

For TypeScript applications, install `'@types/moralis'`:
```
$ npm install @types/moralis
```

Types are updated manually after every release. If a definition doesn't exist, please submit a pull request to [@types/moralis][types-moralis]

## 3rd Party Authentications

Moralis Server supports many [3rd Party Authenications][3rd-party-auth]. It is possible to [linkWith][link-with] any 3rd Party Authentication by creating a [custom authentication module][custom-auth-module].