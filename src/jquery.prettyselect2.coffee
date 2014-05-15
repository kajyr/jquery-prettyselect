(($) ->

	# Define the plugin class
	class PrettySelect
 
		defaults:
			wrapClass: 'prettyselect-wrap'
			labelClass: 'prettyselect-label'
			dropClass: 'prettyselect-drop'

		privates:
			populate: ($select) ->
				elements = '';
				val = $select.val();
				$select.find('option').each( () ->
					$option = $(this);
					elements += '<li data-value="' + $option.attr('value') + '">' + $option.html() + '</li>';
				);
				return elements;
			,
			mutationObserver: ($element, callBack) ->
					MutationObserver = window.MutationObserver;
					observer = new MutationObserver(callBack);
					observer.observe($element[0], { subtree: true, attributes: false, childList: true })
					$element.data('mutationObserver', observer)
			,			
 
		constructor: (select, options) ->
			@options = $.extend({}, @defaults, options)
			@$select = $(select)
			@$select
				.hide()
				.wrap("<div class=#{@options.wrapClass}/>")
			$wrap = @$select.parents('.' + @options.wrapClass)

			label = @$select.find('option:selected').html()
			$label = $("<div class=#{@options.labelClass}/>").html(label)

			$wrap.append($label)

			elements = @privates.populate(@$select)
			$drop = $("<ul class=#{@options.dropClass}>#{elements}</ul>")

			$drop.hide()

			$wrap.append($drop)

			$wrap.on('click', 'li', $.proxy((e) ->
				$li = $(e.target);
				$select = this;
				$select[0].value = $li.data('value')
				$select.trigger('change')
			, @$select))

			@$select.on('change', (e) ->
				$select = $(e.target);
				val = $select.val();
				label = $select.find("option[value = #{val}]").html();
				$label.html(label);
			);

			$label.on('click', (e) -> 
				return if $drop.is(':visible')
				e.stopPropagation();

				$drop.show();

				$('html').one('click', () ->
				
					$drop.hide();

				);	
			);

			@privates.mutationObserver(@$select, $.proxy( (mutations, observer) ->
				$wrap = @$select.parents(".#{@options.wrapClass}");
				$wrap.find(".#{@options.dropClass}").html(@privates.populate(@$select));
			, this));


 
		# Additional plugin methods go here
		destroy: () ->
			$wrap = @$select.parents('.' + @options.wrapClass);
			$label = $wrap.find('.' + @options.labelClass);
			$ul = $wrap.find('.' + @options.dropClass);

			observer = @$select.data('mutationObserver')
			if typeof observer == 'object'
				observer.disconnect()
			else
				window.clearInterval(observer)
			
			$label.detach();
			$ul.detach();

			@$select
				.show()
				.unwrap(@options.wrapClass);

			@$select.removeData 'PrettySelect'
 
	# Define the plugin
	$.fn.extend prettyselect: (option, args...) ->
		@each ->
			$this = $(this)
			data = $this.data('PrettySelect')
 
			if !data
				$this.data 'PrettySelect', (data = new PrettySelect(this, option))
			if typeof option == 'string'
				data[option].apply(data, args)
 
) jQuery