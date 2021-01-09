# Developer Guide
## Demo
[Live Demo](https://www.leafyjava.com/projects/measuretool) hosted on LeafyJava.com

## Installation
Use CDN
```html
<script src="https://unpkg.com/measuretool-googlemaps-v3"></script>
```
Use ESM
```shell
npm install --save measuretool-googlemaps-v3
```
```js
import MeasureTool from 'measuretool-googlemaps-v3';
```
or 
```js
import MeasureTool from 'https://unpkg.com/measuretool-googlemaps-v3';
```

## Dependency
Make sure the **`geometry`** library is referenced in the **Google Maps JavaScript API** loading script.
```html
libraries=geometry
```
## Basic use
To create the measurement widget, pass in a Google Map instance.
```javascript
var measureTool = new MeasureTool(map);
```
## Pass in `MeasureToolOptions`
You could also pass in a `MeasureToolOptions` as the second argument to customize to your preference. 
```javascript
var measureTool = new MeasureTool(map, {
  showSegmentLength: true,
  unit: MeasureTool.UnitTypeId.IMPERIAL // or just use 'imperial'
});
```
## Bind to your own UI
The `MeasureTool` comes with a context menu out of box for saving your time to create your own. However, if you'd like to bind the `MeasureTool` to your own UI, you could specify `contextMenu` to `false` when constructing the `MeasureTool`. The `MeasureTool` exposes two public methods `start()` and `end()` to start and end measuring. For example,
```html
<button onclick="measureTool.start()">start</button>
<button onclick="measureTool.end()">end</button>
```
```javascript
var measureTool = new MeasureTool(map, {
  contextMenu: false
  // some other options...
});
```

## Start Measurement with Initial Points
When there is need to start the measurement with a set of predefined points, the contextMenu must be set to false, otherwise the predefined points are ignored. 
```html
<button id="start-with-points" onclick="measureTool.start([{lat: 47.94796, lng: -116.70797}, {lat: 47.95028, lng: -116.69907}])">Start With Initial Points</button>
<button id="end" onclick="measureTool.end()">End</button>
```
```javascript
var measureTool = new MeasureTool(map, {
  contextMenu: false
});
```

## Use with Google Geometry
When using this measure tool with Google geometries, if the geometry is interactive and has mouse events, use the following pattern could make them work nicely together.

```javascript
var polygon = new Google.maps.Polygon({
  clickable: true,
  // other options...
});

measureTool.addListener('measure_start', function() {
  polygon.setOptions({clickable: false});
});
measureTool.addListener('measure_end', function() {
  polygon.setOptions({clickable: true});
});
```
