# Changes
## v1.0.2
*Released on 01/11/2021*
- **[Enhancement]**
  - Optimized touch target in touch screen (#78)
  - Added `pt-BR` language support (#75)
- **[Bug fixes]**
  - Hide Tooltip when measurement is ended (#76)

# v1.0.1
*Released on 01/10/2021*
- **[Bug fixes]**
  - Removed the SVG filter which causing performance degrade while dragging.
  
## v1.0.0
*Released on 01/09/2021*
- **[Enhancement]**
  - Added support for mobile devices and touch screen.
  - Added i18n support.
  - Added an option to invert color.
- **[Dependencies]** 
  - Upgraded `d3-selection` and `d3-drag` to v2, which uses local event management.
- **[Development]** 
  - Rewrote build pipeline with rollup, fixed some CSS injection security warnings.
  - Added prettier
  - Added module example

## v0.4.2
*Released on 08/02/2019*
- **[Bug Fix]** Removed redraw when map extent change event, so no duplicated measurement is drawn when the map projection spans over multiple worlds.

## v0.4.0
*Released on 11/12/2018*
- **[Enhancement]**  Expose getters for segments and points of measurements. [#45](https://github.com/zhenyanghua/MeasureTool-GoogleMaps-V3/issues/45)

## v0.3.0
*Released on 11/06/2018*
- **[New Feature]** Allow to pass in an array of points when starting measurement in contextMenu-disabled mode. Find the usage at the [Developer Guide](https://github.com/zhenyanghua/MeasureTool-GoogleMaps-V3/blob/master/docs/GUIDE.md#start-measurement-with-initial-points).

## v0.2.0
*Released on 07/02/2018*
- **[Enhancement]** Added new unit - **Nautical Miles (NM)** Details see [PR #40](https://github.com/zhenyanghua/MeasureTool-GoogleMaps-V3/pull/40).

## v0.1.4
*Released on 03/21/2018*
- **[Bug Fix]** Fixed a newly introduced initialization bug caused from v0.1.2. Details see [#34](https://github.com/zhenyanghua/MeasureTool-GoogleMaps-V3/issues/34).

## v0.1.2
*Released on 03/20/2018*
- **[Bug Fix]** Fixed an overlay bug. Details see [#12](https://github.com/zhenyanghua/MeasureTool-GoogleMaps-V3/issues/12).

## v0.1.1
*Released on 03/19/2018*
- **[Bug Fix]** Updated `MeasureResult` in `measure_end` listener.

## v0.1.0
*Released on 03/18/2018*
- **[New Feature]** Added `Array<Segment>` to the `MeasureResult`. Example see [#31](https://github.com/zhenyanghua/MeasureTool-GoogleMaps-V3/issues/31).
