/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

	QUnit.test("interface: open and close", function( assert ) {

		var $select = $('select#basic').prettyselect();
		var $selectTwo = $('select#secondary').prettyselect();

		var $wrap = $select.parents('.prettyselect-wrap');
		var $drop = $wrap.find('ul');
		var $label = $wrap.find('.prettyselect-label');
		
		var $wrap2 = $selectTwo.parents('.prettyselect-wrap');
		var $drop2 = $wrap2.find('ul');
		var $label2 = $wrap2.find('.prettyselect-label');

		assert.ok($drop.is(':hidden'), 'The drop element is initially hidden');
		assert.ok($drop2.is(':hidden'), 'Also the second select drop is hidden');

		$label.trigger('click');

		assert.ok($drop.is(':visible'), 'After a click the drop element is visible');
		assert.ok($drop2.is(':hidden'), 'But the second select drop is still hidden');
		assert.ok($wrap.hasClass('prettyselect-open'), 'The open wrap has the correct class');
		assert.ok(!$wrap2.hasClass('prettyselect-open'), 'The close wrap has not the open class');

		$('body').trigger('click');

		assert.ok($drop.is(':hidden'), 'After clicking on another element the drop is hidden');
		assert.ok($drop2.is(':hidden'), 'Aaand the second select drop is still hidden');

		$select.prettyselect('destroy');
		$selectTwo.prettyselect('destroy');
	
	});

	QUnit.test("open-close on disabled prettyselect", function( assert ) {

		var $select = $('select#basic').prettyselect();

		var $wrap = $select.parents('.prettyselect-wrap');
		var $drop = $wrap.find('ul');
		var $label = $wrap.find('.prettyselect-label');

		$select.prettyselect('disable');

		$label.trigger('click');

		assert.ok($drop.is(':hidden'), 'Clicking on a disabled select does not open the drop');

		$select.prettyselect('enable');

		$label.trigger('click');

		assert.ok($drop.is(':visible'), 'Clicking on a disabled select does not open the drop');
	});


}(jQuery));