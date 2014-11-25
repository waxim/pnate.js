# Pnate.js - Pagination Anywhere

Will take a collection of elements and provide paginate options

## API

```js
var pages = new Pnate;

// Set our elements to page
pages.set('eleSearch','div.review');

// Set a limit on our elements
pages.set('limit',4);

// Inialize
pages.init();
```

Pnate makes no assumtions about how you'll page these elements, calling ``next()`` and ``previous()`` will page the elements and you can call these on your object any way you like.
if you set ``addButtons`` Pnate will add a next and previous button and you can attach event calls to those buttons using jQuery.

```js
jQuery('.pagination .next').click(function(){
  pages.next();
});

jQuery('.pagination .previous').click(function(){
  pages.previous();
});

```

## Development
To make the .min js file use gulp
```js
npm install
gulp minify
```


## TODO
- [] Add pages numbers
- [] Move event deligation inside our class.
- [] Remove jQuery as dependancy.
