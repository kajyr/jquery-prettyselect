/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

	test("basic: instantiation", function() {
		var $select = $('select#basic').prettyselect();

		equal($select.parents('.prettyselect-wrap').length, 1, 'There is a wrap element');

		$select.prettyselect();

		equal($('.prettyselect-wrap').length, 1, 'If called another time, it does nothing');

		$select.prettyselect('destroy');

		equal($select.parents('.prettyselect-wrap').length, 0, 'It can be destroyed');

		$select.prettyselect();

		equal($select.parents('.prettyselect-wrap').length, 1, 'Can be reinstantiated');

		$select.prettyselect('destroy');
	});

	test("basic: class names changed", function() {

		var randomWrapClass = Math.random().toString(36).substring(7);
		var randomLabelClass = Math.random().toString(36).substring(7);

		var $select = $('select#basic').prettyselect({
			wrapClass: randomWrapClass,
			labelClass: randomLabelClass
		});

		equal($select.parents('.' + randomWrapClass).length, 1, 'There is a wrap element');

		$select.prettyselect();

		equal($('.' + randomWrapClass).length, 1, 'If called another time, it does nothing');

		$select.prettyselect('destroy');

		equal($select.parents('.' + randomWrapClass).length, 0, 'It can be destroyed');
	});

/*
	asyncTest("mutations: changing options", function() {

		var $select = $('select#basic').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		var numElements = $wrap.find('li').length;

		$select.append('<option value="z">z</option>');

		setTimeout(function() {
			var newElements = $wrap.find('li').length;

			equal(numElements + 1, newElements, 'The number of <li> elements should be increased by one');

			equal($wrap.find('li[data-value="z"]').length, 1, 'There should be the new element');

			start();
		}, 500);
	});
*/
	test("interface: open and close", function() {

		var $select = $('select#basic').prettyselect();

		var $wrap = $select.parents('.prettyselect-wrap');
		var $drop = $wrap.find('ul');

		var $label = $wrap.find('.prettyselect-label');

		ok($drop.is(':hidden'), 'The drop element is initially hidden');

		$label.trigger('click');

		ok($drop.is(':visible', 'After a click the drop element is visible'));

		$('body').trigger('click');

		ok($drop.is(':hidden'), 'After clicking on another element the drop is hidden');

	});

	test("interface: clicks", function() {

		var $select = $('select#basic').prettyselect();

		var $wrap = $select.parents('.prettyselect-wrap');

		var $label = $wrap.find('.prettyselect-label');

	//clicco su un elemento
	var $elem = $wrap.find('ul li:last-child');
	var value = $elem.data('value').toString();
	$elem.trigger('click');

	ok($select.val() === value, 'Clicking on an interface element changes select value');
	ok($label.text() === $elem.text(), "If I select an element the interface respondes by showing the correct element as label");

});

}(jQuery));