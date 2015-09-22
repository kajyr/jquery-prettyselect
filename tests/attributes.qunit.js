/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

	QUnit.test("Attributes", function( assert ) {

		var done = assert.async();

		var $select = $('select#basic').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		assert.equal($wrap.attr('data-prettyselect-elements'), 2, 'L\'attributo data-prettyselect-elements deve essere corretto');

		$select = $('select#secondary').prettyselect();
		$wrap = $select.parents('.prettyselect-wrap');
		assert.equal($wrap.attr('data-prettyselect-elements'), 5, 'L\'attributo data-prettyselect-elements deve essere corretto');
		
		$select.append('<option value="z">z</option>');

		setTimeout(function() {
			
			assert.equal($wrap.attr('data-prettyselect-elements'), 6, 'L\'attributo data-prettyselect-elements deve aggiornarsi');
		
			$select.prettyselect('destroy');

			done();
		}, 500);

	});


	QUnit.test("Attributes", function( assert ) {

		var done = assert.async();

		var $select = $('select#basic').prettyselect();

		var $option = $select.find('option:last-child');
		var optionValue = $option.attr('value')

		$option.attr('selected', 'selected')

		setTimeout(function() {
			
			var value = $select.val();

			assert.equal(value, optionValue, 'Quando forzo l\'attributo selected il val() deve aggiornarsi');

			$select.prettyselect('destroy');

			done();
		}, 500);

	});





}(jQuery));