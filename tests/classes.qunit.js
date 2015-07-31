/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

	QUnit.test("Attributes", function( assert ) {

		var done = assert.async();

		var $select = $('select#basic').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');

		$select.find('option:last-child').addClass('testClass')


		setTimeout(function() {
			
			assert.equal($wrap.find('li.testClass').length, 1, 'Ci deve essere un elemento della drop con la classe impostata giusta');

			$select.prettyselect('destroy');

			done();
		}, 500);

	});


}(jQuery));