import test from 'ava'
import $ from 'jquery'

window.jQuery = $

require('../dist/jquery.prettyselect.js')

	test.cb('Classes', function( t ) {

		let $select = $('select#basic').prettyselect()
		let $wrap = $select.parents('.prettyselect-wrap')

		$select.find('option:last-child').addClass('testClass')


		setTimeout(function() {
			
			t.is($wrap.find('li.testClass').length, 1, 'Ci deve essere un elemento della drop con la classe impostata giusta')

			$select.prettyselect('destroy')

			t.end()
		}, 500)

	})

