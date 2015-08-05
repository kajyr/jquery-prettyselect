jquery-prettyselect
============

[![Build Status](https://travis-ci.org/kajyr/jquery-prettyselect.svg?branch=master)](https://travis-ci.org/kajyr/jquery-prettyselect)

Html replace to make select elements pretty.

Also works with [zeptojs](http://zeptojs.com/)


## Usage
```javascript
$('select').prettyselect();
```

The select element is still present and hidden ( and works as the Model for the Html View), hence can be used to bind events or listen changes.

##Options

### onlyValuedOptions

_(default: false)_

It is possible to avoid selecting ```<option>``` elements that don't have the value attribute 

```javascript
$('select').prettyselect({
	onlyValuedOptions: true
});
```

### Class Names

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

### Disabling

After instantiation, it is possible to disable the select with the 'disable' command. The clicks on this element shoud not trigger changes

```javascript
$('select').prettyselect('disable');
```

To undo disabling, there's the enable command

```javascript
$('select').prettyselect('enable');
```

## Updates

### [1.4](https://github.com/kajyr/jquery-prettyselect/releases/tag/v1.4.2)
+ When there are classes on the option elements, those are copied to the li's. (And kept in sync)
+ Prettyselect label resets on selection lost


### [1.3](https://github.com/kajyr/jquery-prettyselect/releases/tag/v1.3.0)
+ Zeptojs is supported

### [1.2](https://github.com/kajyr/jquery-prettyselect/releases/tag/v1.2.4)
+ Added the disabled method
+ size optimizations
+ triggered native change event to better integrate with other frameworks.
			
### 1.1.4
Fixed bug where json objects are used as option's value
```html
<option value="{&quot;id&quot;: &quot;23&quot;, &quot;text&quot;:&quot;鄂州市&quot;}">鄂州市</option>
```

### 1.1.3
- Added ```onlyValuedOptions``` option
- Added ```data-prettyselect-elements``` to the wrapper to expose the counter of option elements in the select
- Automatically detects change in the native select options (and rebuild the DOM), using MutationObservers or a dirty polyfill
