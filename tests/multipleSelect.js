import test from 'ava'
import $ from 'jquery'

window.jQuery = $

require('../dist/jquery.prettyselect.js')

test.before(t => {
	
});



test("interface: open and close", (t) => {

		
		var $selectOne = $('select#basic').prettyselect();
		var $selectTwo = $('select#secondary').prettyselect();

		var $parentOne = $selectOne.parents('.prettyselect-wrap');
		var $parentTwo = $selectTwo.parents('.prettyselect-wrap');

		t.not($parentOne[0], $parentTwo[0], 'Each select has own wrap');
})