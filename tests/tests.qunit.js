/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {


	QUnit.test("mutations: changing options", function( assert ) {

		var done = assert.async();

		var $select = $('select#basic').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		var numElements = $wrap.find('li').length;

		$select.append('<option value="z">z</option>');

		setTimeout(function() {
			var newElements = $wrap.find('li').length;

			equal(numElements + 1, newElements, 'The number of <li> elements should be increased by one');

			equal($wrap.find('li[data-value="z"]').length, 1, 'There should be the new element');
			
			$select.prettyselect('destroy');

			done();
		}, 300);
	});

}(jQuery));