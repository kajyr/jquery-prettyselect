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
		},
		populate: function($select) {
			var elements = '';
			$select.find('option').each(function() {
				var $option = $(this);
				elements += '<li data-value="' + $option.attr('value') + '">' + $option.html() + '</li>';
			});
			return elements;
		},
		mutationObserver: function($element, callBack) {
			if (!window.MutationObserver) {

				var interval = setInterval($.proxy(function() {
					var html = this.element.html();
					var oldHtml = this.element.data('mo-html');
					if (html !== oldHtml) {
						this.element.data('mo-html', html);
						callBack();
					}
				}, {
					element: $element,
					callBack: callBack
				}), 200);
				$element.data('mutationObserver', interval);


			} else {
				var MutationObserver = window.MutationObserver;
				var observer = new MutationObserver(callBack);
				observer.observe($element[0], { subtree: true, attributes: true, childList: true });
				$element.data('mutationObserver', observer);
			}
		}
	};

	var $this;
	var options;

	var methods = {
		// you can use $this and options
		init : function( param ) {
			if (typeof options !== 'undefined' && options !== null) { return; }
			options = $.extend({ initDone: true }, defaults, param);

			var $select = $this;

			$select
				.hide()
				.wrap('<div class="'+options.wrapClass+'"/>');

			var $wrap = $select.parents('.' + options.wrapClass);

			var label = $select.find('option:selected').html();
			$label = $('<div class="'+options.labelClass+'"/>').html(label);

			$wrap.append($label);

			var elements = privates.populate($select);
			var $drop = $('<ul>' + elements + '</ul>');

			$drop.hide();

			$wrap.append($drop);

			$wrap.on('click', 'li', function() {
				$select[0].value = $(this).data('value');
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

			$label.on('click', function() {
				$drop.css('display', 'block');
				$('html').one('click', function() {
				//	$drop.hide();
				console.log('ss')
					});
			});

			privates.mutationObserver($select, $.proxy(function(mutations, observer) {
				var $wrap = this.parents('.' + options.wrapClass);
				$wrap.find('ul').html(privates.populate(this));
			}, $select));

		
		},

		destroy: function (param) {
			var $select = $this;

			var $wrap = $select.parents('.' + options.wrapClass);
			var $label = $wrap.find('.' + options.labelClass);
			var $ul = $wrap.find('ul');

			var observer = $select.data('mutationObserver');
			if (typeof observer === 'object') {
				observer.disconnect();
			} else {
				window.clearInterval(observer);
			}

			$label.detach();
			$ul.detach();

			$select
				.show()
				.unwrap(options.wrapClass);

			options = null;

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