(($) ->
	class PrettySelect
 
		defaults:
			wrapClass: 'prettyselect-wrap'
			labelClass: 'prettyselect-label'
			dropClass: 'prettyselect-drop'
			disabledClass: 'prettyselect-disabled'
			onlyValuedOptions: false

		#privates
		_:
			populate: ($options) ->
				return $options.map( () ->
					"<li data-value='#{$(this).attr('value')}'>#{$(this).html()}</li>"
				).toArray().join('')

			optionsSelector:
				onlyWithValue: 'option[value][value!=""]:not([data-placeholder])'
				withoutValue: 'option:not([data-placeholder])'

			trigger: (element, eventName) ->
				if typeof document['createEvent'] == 'function'
					evt = document.createEvent("HTMLEvents")
					evt.initEvent(eventName, false, true)
					element.dispatchEvent(evt)
				else
					element.fireEvent("on#{eventName}")


 		#public
		constructor: (select, options) ->
			@options = $.extend({}, @defaults, options)

			@options.optionsSelector = if @options.onlyValuedOptions then @_.optionsSelector.onlyWithValue else @_.optionsSelector.withoutValue

			@$select = $(select)
				.hide()
				.wrap("<div class=#{@options.wrapClass}/>")

			@$label = $("<div class=#{@options.labelClass}/>").html(
				if ($pl = @$select.find('option[data-placeholder]')).length > 0
					$pl.text()
				else
					@$select.find('option:selected').text()
			)

			$options = @$select.find(@options.optionsSelector)

			elements = @_.populate($options)

			@$drop = $("<ul class=#{@options.dropClass}>#{elements}</ul>")
				.hide()

			@$wrap = @$select.parents('.' + @options.wrapClass)
				.attr('data-prettyselect-elements', $options.length)
				.append(@$label)
				.append(@$drop)
				.on('click', 'li', (e) =>
					return if @isDisabled()
					@$select.val $(e.currentTarget).attr('data-value')
					@_.trigger(@$select[0], 'change')
				)

			@$select.on('change', (e) =>
				val = @$select.val()
				@$label.html( @$select.find("option[value = '#{val}']").html() )
			)

			@$label.on('click', (e) => 
				return if @$drop.is(':visible') or @isDisabled()
				e.stopPropagation()

				@$drop.show()

				$('html').one('click', () =>
					@$drop.hide()
				)
			)

			MutationObserver = window.MutationObserver

			@observer = new MutationObserver( (mutations, observer) =>
				$options = @$select.find(@options.optionsSelector)

				@$wrap.attr('data-prettyselect-elements', $options.length)

				@$drop.html @_.populate($options)
			)

			@observer.observe(@$select[0], { subtree: true, attributes: false, childList: true })

		destroy: () ->
			@observer.disconnect()

			@$label.detach()
			@$drop.detach()

			@$select
				.show()
				.unwrap(@options.wrapClass)
				.removeData 'PrettySelect'

		isDisabled: () ->
			@$select.attr('disabled') == 'disabled'

		disable: () ->
			@$select.attr('disabled', 'disabled')
			@$wrap.addClass(@options.disabledClass)

		enable: () ->
			@$select.removeAttr('disabled', 'disabled')
			@$wrap.removeClass(@options.disabledClass)
 
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