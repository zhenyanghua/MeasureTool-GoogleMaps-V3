# Measurement Tool for Google Maps API V3

A handy measurement widget for Google Maps API v3. The functionalities are implemented as close as what current Google Maps offers.

## Developer Usage
To create the measurement widget, pass in a `MeasureTool Object Specification`
```JavaScript
var measureTool = new MeasureTool({
  map: map, // map is required
  showSegmentLength: true, // optional
  showAccumulativeLength: true, // optional
  unit: 'metric' // optional 'metric' or 'imperial'
});
```

To get the current total length
```JavaScript
measureTool.length;

```

To get the current total area
```JavaScript
measureTool.area;
```

## User Usage
To start measuring, right click a map and choose measure.

To end measuring, right click a map and choose clear measurement.

To add a way point, click on the map.

To remove a way point, click on the waypoint (the first point can not be removed).

To insert a way point, hover on the line and drag it.

When the first point and the last point are close enough, the area will show.


## API

Coming soon.
