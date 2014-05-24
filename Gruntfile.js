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
		},
		watch: {
			scripts: {
				files: ['**/*.coffee'],
				tasks: ['coffee'],
				options: {
					spawn: false,
				},
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['coffee', 'uglify']);
	grunt.registerTask('test', ['coffee', 'uglify', 'qunit']);

};