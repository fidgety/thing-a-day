#do one thing a day, for a while

usual `npm i`, then `webpack` to compile the bundles

run tests with `npm test`

So far...

###Day 1
* Added webpack.
* First react component.
* Added a Google map.

###Day 2
* Snap to route when clicking map, added a standard marker to show location.
 
###Day 3
* Created a sad custom map marker.

###Day 4
* Created Google maps custom overlay util.
* Created a icon font for map marker using icomoon.
 
###Day 5
* Used reflux to create a waypoint store, this makes each element's responsability clearer.

###Day 6
* Created a marker react component, all rendering is custom.
* Introduced an elevations lookup with second store. This means one store's update's trigger a second store. This may be bad.

###Day 7
* Introduced Chart.js and react-chartjs to show elevations.

###Day 8
* Added a heading.
* Created Google directions utils and hooked into waypoint clicks.
* Created a polyline to show route on map.
 
###Day 9
* The simplest of refactors.
 
###Day 10
* Started to investigate how to test things.
* Added karma setup to run mocha tests with chai assertions, so much work to get karma working with webpack properly.
* Added some tests to route utils to prove framework was working, I know this is TAD not TDD - but I'm playing!
* Started sampling the route every km to give a route elevation profile.

###Day 11
* Main goal to add a total distance component, this meant refactoring the route store to hold more than one item.
* Created a distance component which tweened the distance when it's updated - I suspect this will be a perf bottleneck in the future.
* Added some CSS animation too.

###Day 12
* Start TDDing react components, this makes use of the test utils React provide. First test just asserts post mount setup.
* Noticed a huge performance hit on test speed when the react utils were included.
* 
