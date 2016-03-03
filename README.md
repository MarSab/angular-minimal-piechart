# angular-minimal-piechart

AngularJS Directive for minimalistic Pie Charts and Donut Chart.

## Install

Download it with bower

```shell
bower install https://github.com/pasqLisena/angular-minimal-piechart
```

Add to your page

```html
<link rel="stylesheet" href="bower_components/angular-minimal-piechart.css">

<script src="bower_components/angular-minimal-piechart/angular-minimal-piechart.js"></script>
```

Declare it as dependency in your app module definition:

```js
angular.module('myAppModule', ['minimalPiechart']
```

## Usage

The module expose two directives:

```html
<piechart value="23"></piechart>
<donutchart value="45"></donutchart>
```

### Options

* `value` a number between 0 and 100 representing how much the chart is fill

### Style

The color can be changed throug css

```css
.piechart-wheel {
  stroke: rgba(255, 255, 255, .25);
}
.piechart-value {
  stroke: #fff;
}
```
