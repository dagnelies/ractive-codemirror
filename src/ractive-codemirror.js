(function ( global, factory ) {

	'use strict';

	// AMD environment
	if ( typeof define === 'function' && define.amd ) {
		define([ 'ractive' ], factory );
	}

	// Common JS (i.e. node/browserify)
	else if ( typeof module !== 'undefined' && module.exports && typeof require === 'function' ) {
		factory( require( 'ractive' ) );
	}

	// browser global
	else if ( global.Ractive ) {
		factory( global.Ractive );
	}

	else {
		throw new Error( 'Could not find Ractive! It must be loaded before the ractive-components-ractive-codemirror plugin' );
	}

}( typeof window !== 'undefined' ? window : this, function ( Ractive ) {

	'use strict';

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
			
			var updating = false
			
			editor.on('change', function() {
				if( updating )
					return
				updating = true
				self.set('value', editor.getValue())
				updating = false
			})
			
			this.observe('*', function(val, oldVal, kp) {
				console.log(kp)
				if( kp === 'value' ) {
					if( updating )
						return
					updating = true
					editor.setValue( val )
					updating = false
					return
				}
				if( kp === 'mode' ) {
					if( val === 'html' )
						val = 'htmlmixed'
					if( val === 'json' )
						val = { name: 'javascript', json: true }
				}
				editor.setOption(kp, val)
			})
			
			this.on( 'teardown', function () {
				editor.toTextArea();
			});
		}
	})



}));
