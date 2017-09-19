import test from 'ava'
import $ from 'jquery'

window.jQuery = $

require('../dist/jquery.prettyselect.js')

	test("Placeholder", function( t ) {

		
		var $select = $('select#basic').prettyselect();


		var $placeholder = $select.find('option[data-placeholder]');

		var placeholderText = $placeholder.html();

		var $parent = $select.parents('.prettyselect-wrap');

		var $li = $parent.find('ul li').filter(function() {
			return $(this).html() == placeholderText;
		});

		t.is($li.length, 0, "There should be no elements with the same text as the placeholder");


		// 

		var label = $parent.find('.prettyselect-label').html();

		t.is(label, placeholderText, "La label della select deve essere uguale al placeholder");
		
	});
