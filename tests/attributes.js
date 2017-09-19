import test from 'ava'
import $ from 'jquery'

window.jQuery = $

require('../dist/jquery.prettyselect.js')

	test.cb("Attributes", function( t ) {

		var $select = $('select#basic').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		t.is($wrap.attr('data-prettyselect-elements'), '2', 'L\'attributo data-prettyselect-elements deve essere corretto');

		$select = $('select#secondary').prettyselect();
		$wrap = $select.parents('.prettyselect-wrap');
		t.is($wrap.attr('data-prettyselect-elements'), '5', 'L\'attributo data-prettyselect-elements deve essere corretto');
		
		$select.append('<option value="z">z</option>');

		setTimeout(function() {
			
			t.is($wrap.attr('data-prettyselect-elements'), '6', 'L\'attributo data-prettyselect-elements deve aggiornarsi');
		
			$select.prettyselect('destroy');

			t.end();
		}, 500);

	});


	test.cb("Attributes", function( t ) {

		var $select = $('select#basic').prettyselect();

		var $option = $select.find('option:last-child');
		var optionValue = $option.attr('value')

		$option.attr('selected', 'selected')

		setTimeout(function() {
			
			var value = $select.val();

			t.is(value, optionValue, 'Quando forzo l\'attributo selected il val() deve aggiornarsi');

			$select.prettyselect('destroy');

			t.end();
		}, 500);

	});


