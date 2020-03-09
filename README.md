# :zap: ToastmeJS

![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)
![Version](https://img.shields.io/npm/v/toastmejs.svg?branch=master)

ToastmeJS is a very simple, flexible and light weigth plugin that shows **Notifications** and modal **Dialogs** on your website.

- Customize position, text, colors.
- Colorfull, dark and ligh themes.

## Demo

Want to see a quick demo? Click [here](https://toastmejs.netlify.com/)

# Features!

- Customizable

* Light weight < 6kb

* Full color, ligh and dark themes

### Installation

Toastme does not have any dependencies. Just run next command:

#### Via NPM

```sh
$ npm install toastmejs --save
```

Then import toastme

```sh
import {toastme} from 'toastmejs'

or

const toastme = require('toastmejs')
```

#### Via CDN

Import the CSS via a `<link />` and `<scripts />` elements:

```sh
<link rel="stylesheet" href="https://unpkg.com/toastmejs@latest/dist/css/toastme.css">
<script src="https://unpkg.com/toastmejs@latest/dist/js/toastme.min.js" ></script>
```

#### Download

Or simply download the files and include necesary CSS/JS files to your project.

[Download here](<[https://github.com/AlexSegen/toastmejs/releases](https://github.com/AlexSegen/toastmejs/releases)>)

# Usage

### 📣 Toastme Notifications

Call one of these functions to show the **notification** you need

```sh
toastme.default("This is a 'default' notification")

toastme.success("This is a 'success' notification")

toastme.error("This is an 'error' notification")

toastme.warning("This is a 'warning' notification")

toastme.info("This is an 'info' notification")
```

#### Customization

You can customize duration, position, distance, z-index and a ligh theme

- **timeout:** miliseconds

* **positionY:** 'top' or 'bottom'

- **positionX:** 'left', 'right' or 'center' position

* **distanceY:** distance from the Y axis

- **distanceX:** distance from the X axis

* **zIndex:** overlapping order

- **theme:** select 'default', 'ligh' or 'dark' theme. Leave empty for default.

* **duplicates:** true or false - by default it's false

- **animations:** true or false - by default it's true

First, import the Toastme Class

```sh
import {Toastme} from 'toastmejs'

or

const {Toastme} = require('toastmejs')
```

Then, you need to declare a new Object with your new custom settings and create a new **Toastme Class** instance.

```sh
const config = {
    timeout: 5000,
    positionY: "bottom", // top or bottom
    positionX: "center", // right left, center
    distanceY: 20, // Integer value
    distanceX: 20, // Integer value
    zIndex: 100, // Integer value
    theme: "default" // default, ligh or  dark (leave empty for "default" theme)
};

const myToast = new Toastme(config);
```

Finally, you can call your new Toastme with new configurations:

```sh
myToast.success('This is a new success notification')
```

### 💬 Toastme Dialogs

This works with a javascript Promise that returns True or False, depending on how you interact with it.

![](https://s3.us-east-2.amazonaws.com/toastmejs/images/toastme-dialogs-capture-compressor.gif)

To use **Dialogs**, you just need declare the instance and set some default parameters:

```sh
//Example
toastme.yesNoDialog({
    title: "You are the Winner!",
    text: "Do you want to pick your price?",
    textConfirm: "Confirm",
    textCancel: "Cancel",
    showCancel: true, // true or false
    type: "success", // 'success', 'danger', 'warning', 'info' or 'question'
	dark: false, // set 'true' if you want dark theme
}).then(function(value) {
    if (value) {
        console.log('You clicked Confirm')
    } else {
        console.log('You clicked Cancel')
    }
});
```

#### Customization

You can customize text, title, buttons text and optionally, you can select 'type' of dialog for more specific needs.

- **title:** dialog title
- **text:** dialog text
- **textConfirm:** Confirm button caption
- **textCancel:** Cancel button caption
- **showCancel:** show cancel button? 'true' or 'false'
- **type:** select 'success', 'danger', 'warning', 'info' or 'question'
- **dark:** set 'true' if you want dark theme (optional) - empty for ligh theme.
- **animations:** Show animations? It's true by default

## Building for source

Run this command if you need to recompile source files:

```sh

$ gulp

```

### Todos

- Custom button colors
- Custom HTML templates

---

#### Changelog

Version 1.3.0

- Updated: CSS border styles.
- Added: Set optional animations. New boolean parameter: animation.

Version 1.2.3

- Updated: CSS notifications displaying rules.
- Added: Handle duplicated notifications. New boolean parameter: duplicates.

Version 1.2.2

- Updated: CSS notifications overlaping rules.
- Updated: CSS dialogs overlaping rules.
- Updated: Develop Environment
- Updated: Readme
- Updated: Demo page design

Version 1.2.1

- Added: babel transpiler.
- Fix: change notification box size according to the text - [#1](https://github.com/AlexSegen/toastmejs/issues/1)

Version 1.2.0

- Added notifications and dialog dark themes
- Improved CSS positioning
- Replace icons SCSS variables on ligh theme
- Stacked notifications!
- Fixed Package JSON entry
- Removed unnecesary dependencies
- Added missing default notifications
- New animations and icons
- Validate Module Exports when Client or Server

**IMPORTANT**: now you need to use brackets when importing toastmejs. Ex:

```sh
import { toastme } from 'toastmejs';

```

**Note:** "ligh" boolean option whitin notifications will be deprecated (and posibly removed) on next versions. Now you can select a specific theme.

---

License

MIT

**Free Software, Hell Yeah!**
