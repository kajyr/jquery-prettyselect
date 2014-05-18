/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {


	asyncTest("mutations: changing options", function() {

		var $select = $('select#basic').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		var numElements = $wrap.find('li').length;

		$select.append('<option value="z">z</option>');

		setTimeout(function() {
			var newElements = $wrap.find('li').length;

			equal(numElements + 1, newElements, 'The number of <li> elements should be increased by one');

			equal($wrap.find('li[data-value="z"]').length, 1, 'There should be the new element');
			
			$select.prettyselect('destroy');

			start();
		}, 500);
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

		$select.prettyselect('destroy');
	});

}(jQuery));