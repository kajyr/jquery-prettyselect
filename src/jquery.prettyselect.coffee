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
					val = escape $(this).attr('value')
					rawCls = $(this).attr('class')
					cls = if typeof rawCls != 'undefined' then "class='#{escape rawCls}'" else ''
					"<li data-value='#{val}' #{cls}>#{$(this).html()}</li>"
				).toArray().join('')

			getLabel: ($select) ->
				if ($pl = $select.find('option[data-placeholder]')).length > 0
					return $pl.text()
				else
					return $select.find('option:selected').text()

			optionsSelector:
				onlyWithValue: 'option[value][value!=""]:not([data-placeholder])'
				withoutValue: 'option:not([data-placeholder])'

 		#public
		constructor: (select, options) ->
			@options = $.extend({}, @defaults, options)

			@options.optionsSelector = if @options.onlyValuedOptions then @_.optionsSelector.onlyWithValue else @_.optionsSelector.withoutValue

			@$select = $(select)
				.hide()
				.wrap("<div class=#{@options.wrapClass}/>")

			@$label = $("<div class=#{@options.labelClass}/>").html(
				@_.getLabel(@$select)
			)

			$options = @$select.find(@options.optionsSelector)

			elements = @_.populate($options)

			@$drop = $("<ul class=#{@options.dropClass}>#{elements}</ul>")
			
			@closeDrop()

			@$wrap = @$select.parents('.' + @options.wrapClass)
				.attr('data-prettyselect-elements', $options.length)
				.append(@$label)
				.append(@$drop)
				.on('click', 'li', (e) =>
					return if @isDisabled()
					value = unescape $(e.currentTarget).attr('data-value')
					oldVal = @$select.val()
					return if oldVal == value
					
					@$select
						.val(value)
						.trigger('change')
				)

			@$select.on('change', (e) =>
				val = @$select.val().replace("'", "\\'")
				@$label.html( @$select.find("option[value = '#{val}']").html() )
			)

			@$label.on('click', (e) => 
				return if @isDropOpen() or @isDisabled()
				e.stopPropagation()

				@showDrop()

				$('html').one('click', () =>
					@closeDrop()
				)
			)

			MutationObserver = window.MutationObserver

			@observer = new MutationObserver( (mutations, observer) =>
				$options = @$select.find(@options.optionsSelector)

				@$wrap.attr('data-prettyselect-elements', $options.length)

				@$drop.html @_.populate($options)

				if @$select.find('[selected]').length == 0
					@$label.html(@_.getLabel(@$select))
			
			)

			@observer.observe(@$select[0], { subtree: true, attributes: true, attributeOldValue: false, attributeFilter: ['class'], childList: true })

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

		closeDrop: () ->
			@$drop.css('display', 'none')

		showDrop: () ->
			@$drop.css('display', 'block')

		isDropOpen: () ->
			@$drop.css('display') == 'block'

 
	# Define the plugin
	$.fn.prettyselect = (option, args...) ->
		@each ->
			$this = $(this)
			data = $this.data('PrettySelect')
 
			if !data
				$this.data 'PrettySelect', (data = new PrettySelect(this, option))
			if typeof option == 'string'
				data[option].apply(data, args)
 
) window.jQuery || window.Zepto