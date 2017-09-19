import test from 'ava'
import $ from 'jquery'

window.jQuery = $

require('../dist/jquery.prettyselect.js')

	test('Placeholder', function( t ) {

		
		let $select = $('select#basic').prettyselect()


		let $placeholder = $select.find('option[data-placeholder]')

		let placeholderText = $placeholder.html()

		let $parent = $select.parents('.prettyselect-wrap')

		let $li = $parent.find('ul li').filter(function() {
			return $(this).html() === placeholderText
		})

		t.is($li.length, 0, 'There should be no elements with the same text as the placeholder')


		// 

		let label = $parent.find('.prettyselect-label').html()

		t.is(label, placeholderText, 'La label della select deve essere uguale al placeholder')
		
	})
