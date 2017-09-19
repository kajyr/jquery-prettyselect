import test from 'ava'
import $ from 'jquery'

window.jQuery = $

require('../dist/jquery.prettyselect.js')

test.cb("mutations: changing options", t => {

	var $select = $('select#basic').prettyselect();
	var $wrap = $select.parents('.prettyselect-wrap');
	var numElements = $wrap.find('li').length;

	$select.append('<option value="z">z</option>');

	setTimeout(function() {
		var newElements = $wrap.find('li').length;

		t.is(numElements + 1, newElements, 'The number of <li> elements should be increased by one');

		t.is($wrap.find('li[data-value="z"]').length, 1, 'There should be the new element');
		
		$select.prettyselect('destroy');

		t.end();
	}, 300);
});