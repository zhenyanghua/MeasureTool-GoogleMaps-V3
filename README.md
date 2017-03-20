# Measurement Tool for Google Maps API V3

A handy measurement widget for Google Maps API v3. The functionalities are implemented as close as what current Google Maps offers.

## Demo
[Visit demo page](http://zhenyanghua.github.io/google-maps/measure-tool/)
![demo screen shot](https://raw.githubusercontent.com/zhenyanghua/MeasureTool-GoogleMaps-V3/master/demo.jpg)

## Developer Usage
To create the measurement widget, pass in a `MeasureTool Object Specification`
```JavaScript
var measureTool = new MeasureTool(map, {
  showSegmentLength: true,
  unit: MeasureTool.UnitTypeId.IMPERIAL // or just use 'imperial'
});
```

## User Usage
To start measuring, right click a map and choose measure distance.

To end measuring, right click a map and choose clear measurement.

To add a way point, click on the map.

To remove a way point, click on the waypoint (the first point can not be removed).

To insert a way point, hover on the line and drag it.

When the first point and the last point are close enough, the area will show.


## API
### MeasureTool class
|Constructor|Description|
|-----------|-----------|
|MeasureTool(map:`google.maps.Map`, opts?:`MeasureToolOptions`)|Creates a new measure tool for the `google.maps.Map` instance.|

|Properties|Description|
|-------|-----------|
|area|Type: `number` - the total area of the enclosed polygon, the unit is **m²** for `metric` unit and **ft²** for `imperial` unit.|
|areaText|Type: `string` - the formatted total area with unit of the enclosed polygon.|
|length|Type: `number` - the total length of the path drawn, the unit is **m** for `metric` unit and **ft** for `imperial` unit.|
|lengthText|Type: `string` - the formatted total length with unit of the path drawn.|
|version|Type: `string` - the current version number of **`MeasureTool`**|

### MeasureToolOptions object specification
|Properties|Description|
|-------|-----------|
|showSegmentLength|Type: `boolean` - display segment length along the path. Enabled by default.|
|unit|Type: `UnitTypeId` - the unit type to use for the measured length and area. Defaults to `MeasureTool.UnitTypeId.METRIC`.|

### UnitTypeId constants
Identifiers for common UnitType. Specify these by value, or by using the constant's name. For example, `'metric'` or `MeasureTool.UnitTypeId.METRIC`.

|Constant|Description|
|--------|-----------|
|IMPERIAL|This unit type shows measured length in US foot (ft) and mile (mi), and area in US square foot (ft²) and square mile (mi²).|
|METRIC|This unit type shows measured length in meter (m) and kilometer (km), and area in square meter (m²) and square kilometer (km²).|

