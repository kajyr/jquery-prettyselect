prettyselect
============

Html replace to make select elements pretty.

The select element is still present and hidden ( and works as the Model for the Html View), hence can be used to bind events or listen changes.

Usage:  ```javascript
$('#base select.topretty').prettyselect();
```

Update:
 - Automatically detects change in the native select options (and rebuild the DOM) (In newest browsers)
