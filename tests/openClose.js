import test from 'ava'
import $ from 'jquery'

window.jQuery = $

const is_visible = $elem => $elem[0].style.display !== 'none'

require('../dist/jquery.prettyselect.js')
	test('interface: open and close', function( t ) {

		let $select = $('select#basic').prettyselect()
		let $selectTwo = $('select#secondary').prettyselect()

		let $wrap = $select.parents('.prettyselect-wrap')
		let $drop = $wrap.find('ul')
		let $label = $wrap.find('.prettyselect-label')
		
		let $wrap2 = $selectTwo.parents('.prettyselect-wrap')
		let $drop2 = $wrap2.find('ul')

		t.true($drop.is(':hidden'), 'The drop element is initially hidden')
		t.true($drop2.is(':hidden'), 'Also the second select drop is hidden')

		$label.trigger('click')

		t.true(is_visible($drop), 'After a click the drop element is visible')

		t.true($drop2.is(':hidden'), 'But the second select drop is still hidden')
		t.true($wrap.hasClass('prettyselect-open'), 'The open wrap has the correct class')
		t.true(!$wrap2.hasClass('prettyselect-open'), 'The close wrap has not the open class')

		$('body').trigger('click')

		t.true($drop.is(':hidden'), 'After clicking on another element the drop is hidden')
		t.true($drop2.is(':hidden'), 'Aaand the second select drop is still hidden')

		$select.prettyselect('destroy')
		$selectTwo.prettyselect('destroy')
	
	})

	test('open-close on disabled prettyselect', function( t ) {

		let $select = $('select#basic').prettyselect()

		let $wrap = $select.parents('.prettyselect-wrap')
		let $drop = $wrap.find('ul')
		let $label = $wrap.find('.prettyselect-label')

		$select.prettyselect('disable')

		$label.trigger('click')

		t.true($drop.is(':hidden'), 'Clicking on a disabled select does not open the drop')

		$select.prettyselect('enable')

		$label.trigger('click')

		t.true(is_visible($drop), 'Clicking on a disabled select does not open the drop')
	})

