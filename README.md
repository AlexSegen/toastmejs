
# ToastmeJS



[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

  

ToastmeJS is a very simple and light weigth plugin that shows notifications on your browser.

  

- Customize colors
- Customize position
- Default and ligh theme!

Want to see a demo? Click [here](https://alexsegen.github.io/toastmejs/)

# Features!

  

- Customizable
- Light weight < 12kb

  

### Installation

  

Toastme does not have any dependencies.  Just run next command:

```sh
$ npm install toastjs --save
```
And import toastme


```sh
$ import toastme from 'toastjs
```


Or, download and include necesary files on your project

  
```sh
<link rel="stylesheet" href="./dist/css/toastme.css">
<script src="./dist/js/toastme.js" ></script>
```
  

### Usage

Call one of these functions to show the notification you need

```sh
toastme.success("This is a 'success' notification")

toastme.error("This is an 'error' notification")

toastme.warning("This is a 'warning' notification")

toastme.info("This is an 'info' notification")
```
  
  

### Customization

  

You can customize duration, position, distance, z-index and a ligh theme

  

- **timeout:** miliseconds
- **positionY:** 'top' or 'bottom'
- **positionX:** 'left', 'right' or 'center' position
- **distanceY:** distance from the Y axis
- **distanceX:** distance from the X axis
- **zIndex:** overlapping order
- **ligh:** change to 'true' if you want ligh themed notifications.

  
You need to declare a new Object with new settings, finally, create a new **Toastme Class** instance.


```sh
const config = {
	timeout: 5000,
	positionY: "bottom", // top or bottom
	positionX: "center", // right left, center
	distanceY: 20, // Integer value
	distanceX: 20, // Integer value
	zIndex: 100, // Integer value
	ligh: true // Ligh theme
};

const myToast = new Toastme(config);
```

Next, you can call the function with new configurations:

```sh
	myToast.success('This is a new success notification')
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
