return if window.MutationObserver?

class MutationObserver

	constructor: (callBack) ->
		@callBack = callBack

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
		window.clearInterval(@interval)


window.MutationObserver = MutationObserver