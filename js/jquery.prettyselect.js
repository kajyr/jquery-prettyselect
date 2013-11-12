(function( $ ){

	var defaults = {
		'pluginName': 'prettyselect',
		'wrapClass': 'prettyselect-wrap',
		'labelClass': 'prettyselect-label',
		'optionSelectedClass': 'selected'
	};

	var privates = {
		fire : function(element, event) {
			if ("createEvent" in document) {
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent(event, false, true);
				element.dispatchEvent(evt);
			}
			else {
				element.fireEvent("on"+event);
			}
		}
	};

	var $this;
	var options;

	var methods = {
		// you can use $this and options
		init : function( param ) {
			options = $.extend({}, defaults, param);

			var $select = $this;

			$select.css('display', 'none');

			$select.wrap('<div class="'+options.wrapClass+'"/>');

			var $wrap = $select.parents('.' + options.wrapClass);

			var label = $select.find('option:selected').html();
			$label = $('<div class="'+options.labelClass+'"/>');
			$label.html(label);

			$wrap.append($label);

			var elements = '';
			$select.find('option').each(function() {
				var $option = $(this);
				elements += '<li data-value="' + $option.attr('value') + '">' + $option.html() + '</li>';
			});

			$wrap.append('<ul>' + elements + '</ul>');

			$wrap.on('click', 'li', function() {
				var val = $(this).data('value');

				$select[0].value = val;
				privates.fire($select[0], 'change');
			});

			$select.on('change', function() {
				var val = $select.val();

				var label = $select.find('option[value = "' + val + '"]').html();
				$label.html(label);

				$wrap.find('li')
					.removeClass(options.optionSelectedClass)
					.filter('[data-value="' + val + '"]')
					.addClass(options.optionSelectedClass);


			});
		},

		functionName : function( ) {	
			//...
			return 1;
		}
	};

	$.fn[defaults.pluginName] = function( method ) {
		
		var args = arguments;
		var returns;

		this.each(function(){
			
			$this = $(this);
			options = $this.data(defaults.pluginName);
			var tempOpt = options  ;     

			if ( methods[method] ) {
				returns = methods[method].apply( this, Array.prototype.slice.call( args, 1 ));
			} else if ( typeof method === 'object' || ! method ) {
				returns = methods.init.apply( this, args );
			} else {
				$.error( 'Method ' +  method + ' does not exist on plugin: '+defaults.pluginName);
			} 
			if (tempOpt !== options) {
				$this.data(defaults.pluginName, options);
			}
			
		});  

		return (typeof(returns) !== 'undefined')? returns: this;
		
	};

})( jQuery );