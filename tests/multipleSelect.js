import test from 'ava'
import $ from 'jquery'

window.jQuery = $

require('../dist/jquery.prettyselect.js')

test('interface: open and close', (t) => {

		
		let $selectOne = $('select#basic').prettyselect()
		let $selectTwo = $('select#secondary').prettyselect()

		let $parentOne = $selectOne.parents('.prettyselect-wrap')
		let $parentTwo = $selectTwo.parents('.prettyselect-wrap')

		t.not($parentOne[0], $parentTwo[0], 'Each select has own wrap')
})