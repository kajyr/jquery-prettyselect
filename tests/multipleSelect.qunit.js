/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

	QUnit.test("interface: open and close", function() {

		
		var $selectOne = $('select#basic').prettyselect();
		var $selectTwo = $('select#secondary').prettyselect();

		var $parentOne = $selectOne.parents('.prettyselect-wrap');
		var $parentTwo = $selectTwo.parents('.prettyselect-wrap');

		notStrictEqual($parentOne[0], $parentTwo[0], 'Each select has own wrap');

		
	});


}(jQuery));