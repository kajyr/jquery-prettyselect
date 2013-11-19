(function() {

test("basic instantiation", function() {
	var $select = $('select#basic').prettyselect();
	var $wrap = $select.parents('.prettyselect-wrap');

	equal($wrap.length, 1, 'There is a wrap element');

	$select.prettyselect();

	equal($('.prettyselect-wrap').length, 1, 'If called another time, it does nothing');

});


})();