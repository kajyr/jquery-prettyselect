/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

	QUnit.test("basic: instantiation", function( assert ) {
		var $select = $('select#basic').prettyselect();

		assert.equal($select.parents('.prettyselect-wrap').length, 1, 'There is a wrap element');

		$select.prettyselect();

		assert.equal($('.prettyselect-wrap').length, 1, 'If called another time, it does nothing');

		$select.prettyselect('destroy');

		assert.equal($select.parents('.prettyselect-wrap').length, 0, 'It can be destroyed');

		assert.equal($select.data('PrettySelect'), undefined, 'There should be no left data elements')

		$select.prettyselect();

		assert.equal($select.parents('.prettyselect-wrap').length, 1, 'Can be reinstantiated');

		$select.prettyselect('destroy');
	});


}(jQuery));