# Measurement Tool for Google Maps API V3

A handy measurement widget for Google Maps API v3. The functionalities are implemented as close as to what current Google Maps offers.

## Demo
[Visit demo page](http://projects.leafyjava.com/measuretool/)

![demo screen shot](https://raw.githubusercontent.com/zhenyanghua/MeasureTool-GoogleMaps-V3/master/demo.jpg)

## Changes
### v0.1.0
*Released on 03/18/2018*
- **[New Feature]** Added `Array<Segment>` to the `MeasureResult`. Example see [#31](https://github.com/zhenyanghua/MeasureTool-GoogleMaps-V3/issues/31).

## Developer usage
#### Dependency
Make sure the **`geometry`** library is referenced in the **Google Maps JavaScript API** loading script.
```html
libraries=geometry
```
#### Basic use
To create the measurement widget, pass in a Google Map instance.
```javascript
var measureTool = new MeasureTool(map);
```
#### Pass in `MeasureToolOptions`
You could also pass in a `MeasureToolOptions` as the second argument to customize to your preference. 
```javascript
var measureTool = new MeasureTool(map, {
  showSegmentLength: true,
  unit: MeasureTool.UnitTypeId.IMPERIAL // or just use 'imperial'
});
```
#### Bind to your own UI
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

## User usage
1. To **start** measuring, *right click* the map and choose **Measure distance**.
1. *Left click* the map, and the measurement between the two locations will display. Keep clicking to **add** more measurement waypoints.
1. To **remove** a waypoint, *left click* on the waypoint *(the first point cannot be removed)*.
1. To **insert** a waypoint on the measurement line, click the line. Waypoints can be moved by *clicking and dragging* them.
1. When the *first* point and the *last* point are close enough, the **area** will display.
1. To **end** measuring, *right click* the map and choose **Clear measurement**.


## API
### MeasureTool class
|Constructor|Description|
|-----------|-----------|
|**MeasureTool(map:`google.maps.Map`, opts?:`MeasureToolOptions`)**|Creates a new measure tool for the `google.maps.Map` instance.|

|Methods|Description|
|-------|-----------|
|**addListener(eventName: `string`, handler:`Function`)**|Return Value: **None** - addes the given listener function to the given event name.|
|**end()**|Return Value: **None** - ends measuring.|
|**removeListener(eventName: `string`)**|Return Value: **None** - removes the given listener.|
|**start()**|Return Value: **None** - starts measuring.|
|**setOption(option: `string`, value: `string`)**|Return Value: **None** - updates a confirguration option and re-generates the drawn shape.|

|Properties|Description|
|----------|-----------|
|**area**|Type: `number` - the total area of the enclosed polygon, the unit is **m²** for `metric` unit and **ft²** for `imperial` unit.|
|**areaText**|Type: `string` - the formatted total area with unit of the enclosed polygon.|
|**length**|Type: `number` - the total length of the path drawn, the unit is **m** for `metric` unit and **ft** for `imperial` unit.|
|**lengthText**|Type: `string` - the formatted total length with unit of the path drawn.|

|Events|Description|
|------|-----------|
|**measure_change**|Arguments: `MeasureEvent` - This event is fired when a measure step is completed|
|**measure_end**|Arguments: `MeasureEvent` - This event is fired when the user ends measuring|
|**measure_start**|Arguments: **None** - This event is fired when the user starts measuring|

### MeasureToolOptions object specification
|Properties|Description|
|----------|-----------|
|**showSegmentLength**|Type: `boolean` - display segment length along the path. Enabled by default.|
|**tooltip**|Type: `boolean` - display tooltip when hover the drawing path. Enabled by default.|
|**unit**|Type: `UnitTypeId` - the unit type to use for the measured length and area. Defaults to `MeasureTool.UnitTypeId.METRIC`.|

### MeasureEvent object specification
|Properties|Description|
|----------|-----------|
|**result**|Type: `MeasureResult` - the result of the measuring.|

### MeasureResult object specification
|Properties|Description|
|----------|-----------|
|**area**|Type: `number` - the total area of the enclosed polygon, the unit is **m²** for `metric` unit and **ft²** for `imperial` unit.|
|**areaText**|Type: `string` - the formatted total area with unit of the enclosed polygon.|
|**length**|Type: `number` - the total length of the path drawn, the unit is **m** for `metric` unit and **ft** for `imperial` unit.|
|**lengthText**|Type: `string` - the formatted total length with unit of the path drawn.|
|**segments**|Type: `Array<Segment>` - an array of all segments in measurement.|

### Segment object specification
|Properties|Description|
|----------|-----------|
|**start**|Type: `SegmentPoint` - the latitude and longitude of the segment start location.|
|**end**|Type: `SegmentPoint` - the latitude and longitude of the segment end location.|
|**length**|Type: `SegmentLength` - the length of the segment.|

### SegmentPoint object specification
|Properties|Description|
|----------|-----------|
|**lat**|Type: `number` - the latitude of a segment point.|
|**lng**|Type: `number` - the longitude of a segment point.|

### SegmentLength object specification
|Properties|Description|
|----------|-----------|
|**text**|Type: `string` - the formatted length of a segment.|
|**value**|Type: `number` - the length of a segment, the unit is **m** for `metric` unit and **ft** for `imperial` unit.|

### UnitTypeId constants
Identifiers for common UnitType. Specify these by value, or by using the constant's name. For example, `'metric'` or `MeasureTool.UnitTypeId.METRIC`.

|Constant|Description|
|--------|-----------|
|**IMPERIAL**|This unit type shows measured length in US foot (ft) and mile (mi), and area in US square foot (ft²) and square mile (mi²).|
|**METRIC**|This unit type shows measured length in meter (m) and kilometer (km), and area in square meter (m²) and square kilometer (km²).|
