(($) ->

	# Define the plugin class
	class PrettySelect
 
		defaults:
			wrapClass: 'prettyselect-wrap'
			labelClass: 'prettyselect-label'
			dropClass: 'prettyselect-drop'
			onlyValuedOptions: false

		privates:
			populate: ($options) ->
				elements = '';
				$options.each( () ->
					$option = $(this)
					elements += "<li data-value=#{$option.attr('value')}>#{$option.html()}</li>"
				);
				return elements;
			getLabel: ($select) ->
				if $select.find('option[data-placeholder]').length > 0
					labelText = $select.find('option[data-placeholder]').text()
				else
					labelText = $select.find('option:selected').text()
					
			optionsSelector:
				onlyWithValue: 'option[value][value!=""]:not([data-placeholder])'
				withoutValue: 'option:not([data-placeholder])'
 
		constructor: (select, options) ->
			@options = $.extend({}, @defaults, options)

			@options.optionsSelector = if @options.onlyValuedOptions then @privates.optionsSelector.onlyWithValue else @privates.optionsSelector.withoutValue

			@$select = $(select)
			@$select
				.hide()
				.wrap("<div class=#{@options.wrapClass}/>")
			$wrap = @$select.parents('.' + @options.wrapClass)

			$label = $("<div class=#{@options.labelClass}/>").html(
				@privates.getLabel(@$select)
			)

			$options = @$select.find(@options.optionsSelector)

			elements = @privates.populate($options)

			$drop = $("<ul class=#{@options.dropClass}>#{elements}</ul>")
				.hide()

			$wrap.attr('data-prettyselect-elements', $options.length)
				.append($label)
				.append($drop)
				.on('click', 'li', (e) =>
					@$select
						.val $(e.target).data('value')
						.trigger 'change'
			)

			@$select.on('change', (e) =>
				val = @$select.val()
				label = @$select.find("option[value = #{val}]").html()
				$label.html(label);
			);

			$label.on('click', (e) -> 
				return if $drop.is(':visible')
				e.stopPropagation()

				$drop.show()

				$('html').one('click', () ->
				
					$drop.hide()

				);	
			);

			MutationObserver = window.MutationObserver;
			@observer = new MutationObserver( (mutations, observer) =>

				$options = @$select.find(@options.optionsSelector)
				
				@$select.parents(".#{@options.wrapClass}")
					.attr('data-prettyselect-elements', $options.length)
					.find(".#{@options.dropClass}").html(@privates.populate($options))
			);
			@observer.observe(@$select[0], { subtree: true, attributes: false, childList: true })


 
		# Additional plugin methods go here
		destroy: () ->
			$wrap = @$select.parents('.' + @options.wrapClass);
			$label = $wrap.find('.' + @options.labelClass);
			$ul = $wrap.find('.' + @options.dropClass);
			@observer.disconnect()

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