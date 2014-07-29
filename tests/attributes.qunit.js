/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

	asyncTest("Attributes", function() {

		
		var $select = $('select#basic').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		equal($wrap.attr('data-prettyselect-elements'), 2, 'L\'attributo data-prettyselect-elements deve essere corretto');


		$select = $('select#secondary').prettyselect();
		$wrap = $select.parents('.prettyselect-wrap');
		equal($wrap.attr('data-prettyselect-elements'), 5, 'L\'attributo data-prettyselect-elements deve essere corretto');
		

		$select.append('<option value="z">z</option>');

		setTimeout(function() {
			
			equal($wrap.attr('data-prettyselect-elements'), 6, 'L\'attributo data-prettyselect-elements deve aggiornarsi');
		
			$select.prettyselect('destroy');

			start();
		}, 500);

	});


}(jQuery));