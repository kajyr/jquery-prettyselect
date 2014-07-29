jquery-prettyselect
============

[![Build Status](https://travis-ci.org/kajyr/jquery-prettyselect.svg?branch=master)](https://travis-ci.org/kajyr/jquery-prettyselect)

Html replace to make select elements pretty.

The select element is still present and hidden ( and works as the Model for the Html View), hence can be used to bind events or listen changes.

## Usage
```javascript
$('select').prettyselect();
```

##Options

It is possible to change the basic class names used by the plugin.

```javascript
$('select').prettyselect({
	wrapClass: 'prettyselect-wrap',
	labelClass: 'prettyselect-label',
	dropClass: 'prettyselect-drop'
});
```

### Placeholder

It is possible to specify one of the ```<option>``` elements as the ```placeholder```, with the data-placeholder attribute. This element would not be selectable and will disappear after the user makes the first selection

```html
<select name="" id="">
	<option value="1" data-placeholder>a</option>
	<option value="2">b</option>
	<option value="3">c</option>
</select>
```

## Updates
- Added ```data-prettyselect-elements``` to the wrapper to expose the counter of option elements in the select
- Automatically detects change in the native select options (and rebuild the DOM), using MutationObservers or a dirty polyfill
