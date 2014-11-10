return if window.MutationObserver?

class MutationObserver

	constructor: (@callBack) ->

	observe: (element, options) ->
		@element = element
		@interval = setInterval  () =>
				
			html = @element.innerHTML

			if html != @oldHtml
				@oldHtml = html
				@callBack.apply(null)

		, 200
	,
	disconnect: () ->
		clearInterval(@interval)


window.MutationObserver = MutationObserver