/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

	QUnit.test("interface: clicks", function( assert ) {

		var $select = $('select#basic').prettyselect();
		var $select2 = $('select#secondary').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		var $label = $wrap.find('.prettyselect-label');
		
		var $wrap2 = $select2.parents('.prettyselect-wrap');
		var $drop2 = $wrap2.find('ul');
		var $label2 = $wrap2.find('.prettyselect-label');


		//clicco su un elemento
		var $elem = $wrap.find('ul li:last-child');
		var value = unescape($elem.data('value').toString());

		var value2 = $select2.val();
		
		$elem.trigger('click');

		assert.equal($select.val(), value, 'Clicking on an interface element changes select value');

		assert.equal($label.val(), $elem.text(), "If I select an element the interface respondes by showing the correct element as label");

		assert.equal($select2.val(), value2, "The secondary select value should not be changed");

		$select.prettyselect('destroy');
		$select2.prettyselect('destroy');
	});

	QUnit.test("interface: clicks on nasty values", function( assert ) {

		var $select = $('select#nasty').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		var $elem = $wrap.find('ul li:last-child');

		var value = unescape($elem.attr('data-value'));

		$elem.trigger('click');

		assert.equal($select.val(), value, 'Clicking on an interface element changes select value');

	});

	QUnit.test("interface: clicks on values with single quotes", function( assert ) {

		var $select = $('select#third').prettyselect();
		var $wrap = $select.parents('.prettyselect-wrap');
		var $elem = $wrap.find('ul li:last-child');

		var value = unescape($elem.attr('data-value'));

		$elem.trigger('click');

		assert.equal($select.val(), value, 'Clicking on an interface element changes select value');

	});

	QUnit.test("clicks on disabled prettyselect", function(assert ) {

		var $select = $('select#basic').prettyselect();

		$select.prettyselect('disable');

		var $wrap = $select.parents('.prettyselect-wrap');
		var $elem = $wrap.find('ul li:last-child');

		var oldValue = $select.val();
		var elemntValue = unescape($elem.attr('data-value'));

		$elem.trigger('click');

		assert.notEqual($select.val(), elemntValue, 'Clicking on an disabled interface element should not change selected value');
		assert.equal($select.val(), oldValue, 'Clicking on an disabled interface element should leave the old value intact');
		assert.ok($wrap.hasClass('prettyselect-disabled'), 'The wrap element should have the disabled class');

		$select.prettyselect('enable');

		$elem.trigger('click');

		assert.equal($select.val(), elemntValue, 'Clicking on an re-enabled interface element should change selected value');
		assert.notEqual($select.val(), oldValue, 'Clicking on an re-enabled interface element should not leave the old value intact');
		assert.ok(!$wrap.hasClass('prettyselect-disabled'), 'The wrap element should not have the disabled class');

	});


	QUnit.test("multiple clicks on the same element", function( assert ) {

		var done = assert.async();

		var $select = $('select#basic').prettyselect();

		var $wrap = $select.parents('.prettyselect-wrap');
		var $elem = $wrap.find('ul li:last-child');

		var changeCount = 0;

		$select.on('change', function() {
			changeCount++;
		});

		$elem.trigger('click');

		setTimeout(function() {

			assert.equal(changeCount, 1, 'Clicking on an element should raise the counter');
			
			$elem.trigger('click');

			setTimeout(function() {

				assert.equal(changeCount, 1, 'Clicking on the already selected element should not raise the counter');

				done();

			}, 150);

		}, 150);	


	});

}(jQuery));