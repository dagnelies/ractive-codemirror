Ractive.components['codemirror'] = Ractive.extend({
	template: "<textarea></textarea>",
	isolated: true,
	data: {
		
		lineNumbers: true
	},
	onrender: function () {
		var self = this
		var textarea = this.find('textarea')
		var editor = CodeMirror.fromTextArea( textarea )
		
		this.editor = editor; // for the onteardown function
		
		var updating = false
		
		editor.on('change', function() {
			if( updating )
				return
			updating = true
			self.set('value', editor.getValue())
			updating = false
		})
		
		this.observe('*', function(val, old, kp) {
			
			if( kp === 'value' ) {
				if( updating )
					return
				updating = true
				if( !val && typeof(val) !== 'string' )
					val = ''
				editor.setValue( val )
				updating = false
				return
			}
			
			if( Ractive.DEBUG )
				console.log(kp + ': ' + old + ' -> ' + val)
				
			if( kp === 'mode' ) {
				if( val === 'html' )
					val = 'htmlmixed'
				if( val === 'json' )
					val = { name: 'javascript', json: true }
			}
			editor.setOption(kp, val)
		})
	},
	onteardown: function () {
		this.editor.toTextArea()
	}
})
