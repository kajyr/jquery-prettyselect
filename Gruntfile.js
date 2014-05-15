module.exports = function(grunt) {
	// Do grunt-related things in here

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [
			'Gruntfile.js',
			'src/*.js'
			]
		},
		coffee: {
			compile: {
				files: {
					'dist/jquery.prettyselect.js': ['src/MutationObserverPolyfill.coffee', 'src/jquery.prettyselect.coffee']
				}
			  },
		},
		uglify: {
			my_target: {
				files: {
					'dist/jquery.prettyselect.min.js': ['dist/jquery.prettyselect.js'],
				}
			}
		},
		qunit: {
			all: ['tests/tests.html']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-coffee');

	// Default task(s).
	grunt.registerTask('default', ['coffee', 'uglify']);
	grunt.registerTask('test', ['coffee', 'uglify', 'qunit']);

};