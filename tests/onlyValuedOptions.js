import test from 'ava'
import $ from 'jquery'

window.jQuery = $

require('../dist/jquery.prettyselect.js')

test("basic: instantiation", function( t ) {

	let $select = $('select#third').prettyselect();
	let $wrap = $select.parents('.prettyselect-wrap');

	t.is($wrap.attr('data-prettyselect-elements'), '5', 'Senza opzione onlyValuedOptions mi aspetto 5 elementi');
	
	$select.prettyselect('destroy');

	$select = $('select#third').prettyselect({
		onlyValuedOptions: true
	});
	$wrap = $select.parents('.prettyselect-wrap');
	t.is($wrap.attr('data-prettyselect-elements'), '4', 'Con l\'opzione onlyValuedOptions mi aspetto 4 elementi');



});
