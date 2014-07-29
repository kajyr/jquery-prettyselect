/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

	test("basic: instantiation", function() {

		var $select = $('select#third').prettyselect();
		$wrap = $select.parents('.prettyselect-wrap');

		equal($wrap.attr('data-prettyselect-elements'), 5, 'Senza opzione onlyValuedOptions mi aspetto 5 elementi');
		
		$select.prettyselect('destroy');

		$select = $('select#third').prettyselect({
			onlyValuedOptions: true
		});
		$wrap = $select.parents('.prettyselect-wrap');
		equal($wrap.attr('data-prettyselect-elements'), 4, 'Con l\'opzione onlyValuedOptions mi aspetto 4 elementi');



	});


}(jQuery));