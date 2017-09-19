import test from 'ava'
import $ from 'jquery'

window.jQuery = $

require('../dist/jquery.prettyselect.js')

test("basic: instantiation", function( t ) {
	var $select = $('select#basic').prettyselect();

	t.is($select.parents('.prettyselect-wrap').length, 1, 'There is a wrap element');

	$select.prettyselect();

	t.is($('.prettyselect-wrap').length, 1, 'If called another time, it does nothing');

	$select.prettyselect('destroy');

	t.is($select.parents('.prettyselect-wrap').length, 0, 'It can be destroyed');

	t.is($select.data('PrettySelect'), undefined, 'There should be no left data elements')

	$select.prettyselect();

	t.is($select.parents('.prettyselect-wrap').length, 1, 'Can be reinstantiated');

	$select.prettyselect('destroy');
});

