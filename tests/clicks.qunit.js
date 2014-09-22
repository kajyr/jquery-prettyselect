/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

	test("interface: clicks", function() {

		var $select = $('select#basic').prettyselect();
		var $select2 = $('select#secondary').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		var $label = $wrap.find('.prettyselect-label');
		
		var $wrap2 = $select2.parents('.prettyselect-wrap');
		var $drop2 = $wrap2.find('ul');
		var $label2 = $wrap2.find('.prettyselect-label');


		//clicco su un elemento
		var $elem = $wrap.find('ul li:last-child');
		var value = $elem.data('value').toString();

		var value2 = $select2.val();
		
		$elem.trigger('click');

		equal($select.val(),value, 'Clicking on an interface element changes select value');

		equal($label.text(), $elem.text(), "If I select an element the interface respondes by showing the correct element as label");

		equal($select2.val(), value2, "The secondary select value should not be changed");

		$select.prettyselect('destroy');
		$select2.prettyselect('destroy');
	});

	test("interface: clicks on nasty values", function() {

		var $select = $('select#nasty').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		var $elem = $wrap.find('ul li:last-child');

		var value = $elem.attr('data-value');

		$elem.trigger('click');

		equal($select.val(), value, 'Clicking on an interface element changes select value');

	});

	test("clicks on disabled prettyselect", function() {

		var $select = $('select#basic').prettyselect();

		$select.prettyselect('disable');

		var $wrap = $select.parents('.prettyselect-wrap');
		var $elem = $wrap.find('ul li:last-child');

		var oldValue = $select.val();
		var elemntValue = $elem.attr('data-value');

		$elem.trigger('click');

		notEqual($select.val(), elemntValue, 'Clicking on an disabled interface element should not change selected value');
		equal($select.val(), oldValue, 'Clicking on an disabled interface element should leave the old value intact');
		ok($wrap.hasClass('prettyselect-disabled'), 'The wrap element should have the disabled class');

		$select.prettyselect('enable');

		$elem.trigger('click');

		equal($select.val(), elemntValue, 'Clicking on an re-enabled interface element should change selected value');
		notEqual($select.val(), oldValue, 'Clicking on an re-enabled interface element should not leave the old value intact');
		ok(!$wrap.hasClass('prettyselect-disabled'), 'The wrap element should not have the disabled class');

	});

}(jQuery));