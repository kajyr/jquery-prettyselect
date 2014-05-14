jquery-prettyselect
============

Makes select elements pretty.

The select element is still present and hidden ( and works as the Model for the Html View), hence can be used to bind events or listen changes.

## Usage
```javascript
$('select').prettyselect();
```


##Options

```javascript
$('select').prettyselect(options);
```

Properties:

+ wrapClass: 'prettyselect-wrap'
+ labelClass: 'prettyselect-label'
+ dropClass: 'prettyselect-drop'

## Updates:
- Automatically detects change in the native select options (and rebuild the DOM), using MutationObservers or a dirty polyfill
