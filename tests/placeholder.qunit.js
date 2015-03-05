/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

	QUnit.test("Placeholder", function( assert ) {

		
		var $select = $('select#basic').prettyselect();


		var $placeholder = $select.find('option[data-placeholder]');

		var placeholderText = $placeholder.html();

		var $parent = $select.parents('.prettyselect-wrap');

		var $li = $parent.find('ul li').filter(function() {
			return $(this).html() == placeholderText;
		});

		assert.equal($li.length, 0, "There should be no elements with the same text as the placeholder");


		// 

		var label = $parent.find('.prettyselect-label').html();

		assert.equal(label, placeholderText, "La label della select deve essere uguale al placeholder");
		
	});


}(jQuery));