# API Reference
### MeasureTool class
|Constructor|Description|
|-----------|-----------|
|**MeasureTool(map:`google.maps.Map`, opts?:`MeasureToolOptions`)**|Creates a new measure tool for the `google.maps.Map` instance.|

|Methods|Description|
|-------|-----------|
|**addListener(eventName: `string`, handler:`Function`)**|Return Value: **None** - adds the given listener function to the given event name.|
|**end()**|Return Value: **None** - ends measuring.|
|**removeListener(eventName: `string`)**|Return Value: **None** - removes the given listener.|
|**setOption(option: `string`, value: `string`)**|Return Value: **None** - updates a confirguration option and re-generates the drawn shape.|
|**start()**|Return Value: **None** - starts measuring.|
|**start(initialPoints: `Array<SegmentPoint>`)**|Return Value: **None** - starts measuring with initial points. **The `contextMenu` option must be set to `false`, otherwise, the initial points are ignored.**. Use this method to start a measurement if there are point data need to be loaded as the initial part of the measurement. This is an asynchronous operation. Changes could be observed by listening to the `'measure_change'` event.|

|Properties|Description|
|----------|-----------|
|**area**|Type: `number` - the total area of the enclosed polygon, the unit is **m²** for `metric` unit and **ft²** for `imperial` unit.|
|**areaText**|Type: `string` - the formatted total area with unit of the enclosed polygon.|
|**length**|Type: `number` - the total length of the path drawn, the unit is **m** for `metric` unit and **ft** for `imperial` unit.|
|**lengthText**|Type: `string` - the formatted total length with unit of the path drawn.|
|**points**|Type: `Array<SegmentPoint>` - an array of segment points in measurement.|
|**segments**|Type: `Array<Segment>` - an array of all segments in measurement.|

|Events|Description|
|------|-----------|
|**measure_change**|Arguments: `MeasureEvent` - This event is fired when a measure step is completed|
|**measure_end**|Arguments: `MeasureEvent` - This event is fired when the user ends measuring|
|**measure_start**|Arguments: **None** - This event is fired when the user starts measuring|

### MeasureToolOptions object specification
|Properties|Description|
|----------|-----------|
|**contextMenu**|Type: `boolean` - use out-of-box contextMenu. If you desire the widget being started and stopped by your own UI, you may set this option to `false`. Enabled by default.|
|**showSegmentLength**|Type: `boolean` - display segment length along the path. Enabled by default.|
|**tooltip**|Type: `boolean` - display tooltip when hover the drawing path. Enabled by default.|
|**unit**|Type: `UnitTypeId` - the unit type to use for the measured length and area. Defaults to `MeasureTool.UnitTypeId.METRIC`.|
|**language**|Type: `string` - the standard language locale. It could be either language or language with locale, e.g. 'en', 'en-US' are both fine. Default using the browser's language.|
|**invertColor**|Type: `boolean` - indicates if the foreground and background color should be inverted.|

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
|**points**|Type: `Array<SegmentPoint>` - an array of segment points in measurement.|
|**segments**|Type: `Array<Segment>` - an array of all segments in measurement.|

### Segment object specification
|Properties|Description|
|----------|-----------|
|**end_location**|Type: `SegmentPoint` - the latitude and longitude of the segment end location.|
|**length**|Type: `SegmentLength` - the length of the segment.|
|**start_location**|Type: `SegmentPoint` - the latitude and longitude of the segment start location.|

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
|**NAUTICAL**|This unit type shows measured length in nautical mile (NM), and area in square meter (m²) and square kilometer (km²).|