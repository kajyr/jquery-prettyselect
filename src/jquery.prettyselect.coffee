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
				val = $select.val()
				$select.find('option').each( () ->
					$option = $(this)
					elements += "<li data-value=#{$option.attr('value')}>#{$option.html()}</li>"
				);
				return elements;
 
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

			$wrap.on('click', 'li', (e) =>
				@$select
					.val $(e.target).data('value')
					.trigger 'change'
			)

			@$select.on('change', (e) =>
				val = @$select.val();
				label = @$select.find("option[value = #{val}]").html();
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
				$wrap = @$select.parents(".#{@options.wrapClass}")
				$wrap.find(".#{@options.dropClass}").html(@privates.populate(@$select))
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