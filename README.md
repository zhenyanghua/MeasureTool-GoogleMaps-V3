# MeasureTool-GoogleMaps-V3

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
right click a map and choose measure
right click a map and choose clear measurement

## API

Not available yet.
