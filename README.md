
# NotifymeJS

  

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

  

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

  

NotifymeJS is a very simple and ligh weigth plugin that shows notifications on your browser.

  

- Customize colors
- Customize position
- Default and light theme!

  
# Demo

Want to see a demo? Click [here](https://alexsegen.github.io/notifymejs/)

# Features!

  

- Customizable
- Ligh weight < 12kb

  

### Installation

  

Notifyme does not have any dependencies to run. Just include necesary files  on your project

  

<link rel="stylesheet" href="./dist/css/notifyme.css">

<script src="./dist/js/notifyme.js" ></script>

  

### Usage

Call one of these functions to show the notification you need

  

    notify.success("This is a 'success' notification")
    
    notify.error("This is an 'error' notification")
    
    notify.warning("This is a 'warning' notification")
    
    notify.info("This is an 'info' notification")

  
  

### Customization

  

You can customize duration, position, distance, z-index and a light theme

  

- **timeout:** miliseconds
- **positionY:** 'top' or 'bottom'
- **positionX:** 'left', 'right' or 'center' position
- **distanceY:** distance from the Y axis
- **distanceX:** distance from the X axis
- **zIndex:** overlapping order
- **light:** change to 'true' if you want Light themed notifications.

  

```sh
const config = {
	timeout: 5000,
	positionY: "bottom", // top or bottom
	positionX: "center", // right left, center
	distanceY: 20, // Integer value
	distanceX: 20, // Integer value
	zIndex: 100, // Integer value
	light: true // Light theme
};

const myNotify = new Notify(config);
```

  

#### Building for source

Run this command if you need to recompile source files:

  

```sh

$ gulp

```

### Todos

  

- Stacked notifications
- Custom HTML templates

  

License

----

  

MIT

  
  

**Free Software, Hell Yeah!**
