/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

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

		$select.prettyselect('destroy');

	});


}(jQuery));