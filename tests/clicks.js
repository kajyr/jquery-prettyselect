import test from 'ava'
import $ from 'jquery'

window.jQuery = $

require('../dist/jquery.prettyselect.js')

test.after.always('Cleanup', t => {
	$('select#basic').prettyselect('destroy');
	$('select#secondary').prettyselect('destroy');
	$('select#third').prettyselect('destroy');
	$('select#nasty').prettyselect('destroy');
});

	test("interface: clicks", function( t ) {

		var $select = $('select#basic').prettyselect();
		var $select2 = $('select#secondary').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		var $label = $wrap.find('.prettyselect-label');
		
		var $wrap2 = $select2.parents('.prettyselect-wrap');
		var $drop2 = $wrap2.find('ul');
		var $label2 = $wrap2.find('.prettyselect-label');


		//clicco su un elemento
		var $elem = $wrap.find('ul li:last-child');
		var value = unescape($elem.data('value').toString());

		var value2 = $select2.val();
		
		$elem.trigger('click');

		t.is($select.val(), value, 'Clicking on an interface element changes select value');

		t.is($label.text(), $elem.text(), "If I select an element the interface respondes by showing the correct element as label");

		t.is($select2.val(), value2, "The secondary select value should not be changed");

		$select.prettyselect('destroy');
		$select2.prettyselect('destroy');
	});

	test("interface: clicks on nasty values", function( t ) {

		var $select = $('select#nasty').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		var $elem = $wrap.find('ul li:last-child');

		var value = unescape($elem.attr('data-value'));

		$elem.trigger('click');

		t.is($select.val(), value, 'Clicking on an interface element changes select value');

	});

	test("interface: clicks on values with single quotes", function( t ) {

		var $select = $('select#third').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		var $elem = $wrap.find('ul li:last-child');

		var value = unescape($elem.attr('data-value'));

		$elem.trigger('click');

		t.is($select.val(), value, 'Clicking on an interface element changes select value');

	});

	test("clicks on disabled prettyselect", function(t ) {

		var $select = $('select#basic').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');

		// Seems that someone is not cleaning up properly
		$wrap.find('ul li:first-child').trigger('click');


		$select.prettyselect('disable');

		var $elem = $wrap.find('ul li:last-child');

		var oldValue = $select.val();
		var elemntValue = unescape($elem.attr('data-value'));

		$elem.trigger('click');

		var newValue = $select.val();

		t.not(newValue, elemntValue, 'Clicking on an disabled interface element should not change selected value');
		t.is(newValue, oldValue, 'Clicking on an disabled interface element should leave the old value intact');
		t.true($wrap.hasClass('prettyselect-disabled'), 'The wrap element should have the disabled class');

		$select.prettyselect('enable');

		$elem.trigger('click');

		t.is($select.val(), elemntValue, 'Clicking on an re-enabled interface element should change selected value');
		t.not($select.val(), oldValue, 'Clicking on an re-enabled interface element should not leave the old value intact');
		t.true(!$wrap.hasClass('prettyselect-disabled'), 'The wrap element should not have the disabled class');

	});


	test.cb("multiple clicks on the same element", function( t ) {

		var $select = $('select#basic').prettyselect();

		var $wrap = $select.parents('.prettyselect-wrap');
		// Seems that someone is not cleaning up properly
		$wrap.find('ul li:first-child').trigger('click');
		
		var $elem = $wrap.find('ul li:last-child');

		var changeCount = 0;

		$select.on('change', () => {
			changeCount = changeCount + 1;
		});

		$elem.trigger('click');

		setTimeout(() => {

			t.is(changeCount, 1, 'Clicking on an element should raise the counter');
			
			$elem.trigger('click');

			setTimeout(() => {

				t.is(changeCount, 1, 'Clicking on the already selected element should not raise the counter');

				t.end();

			}, 150);

		}, 150);	


	});