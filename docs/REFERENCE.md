# API Reference
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
|**contextMenu**|Type: `boolean` - use out-of-box contextMenu. If you desire the widget being started and stopped by your own UI, you may set this option to `false`. Enabled by default.|
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