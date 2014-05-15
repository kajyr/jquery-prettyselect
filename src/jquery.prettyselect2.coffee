(($) ->

	# Define the plugin class
	class PrettySelect
 
		defaults:
			wrapClass: 'prettyselect-wrap'
			labelClass: 'prettyselect-label'
			dropClass: 'prettyselect-drop'
 
		constructor: (select, options) ->
			@options = $.extend({}, @defaults, options)
			@$select = $(select)
			@$select
				.hide()
				.wrap("<div class=#{@options.wrapClass}/>")
			@$wrap = @$select.parents('.' + @options.wrapClass)

			label = @$select.find('option:selected').html()
			$label = $("<div class=#{@options.labelClass}/>").html(label)

			@$wrap.append($label)

			elements = privates.populate(@$select)
			$drop = $("<ul class=#{@options.dropClass}>#{elements}</ul>")

			$drop.hide()

			@$wrap.append($drop)

			@$wrap.on('click', 'li', () ->
					@$select[0].value = $(this).data('value');
					privates.fire($select[0], 'change');
			);

			@$select.on('change', () ->
					val = @$select.val();
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

			privates.mutationObserver(@$select, $.proxy( (mutations, observer) ->
				@$wrap = this.parents(".#{@options.wrapClass}");
				@$wrap.find(".#{@options.dropClass}").html(privates.populate(this));
			, $select));


 
		# Additional plugin methods go here
		prova: (echo) ->
			@$select.addClass(@options.wrapClass)
 
	# Define the plugin
	$.fn.extend prettySelect: (option, args...) ->
		@each ->
			$this = $(this)
			data = $this.data('PrettySelect')
 
			if !data
				$this.data 'PrettySelect', (data = new PrettySelect(this, option))
			if typeof option == 'string'
				data[option].apply(data, args)
 
) jQuery