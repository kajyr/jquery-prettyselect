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
					'src/jquery.prettyselect2.js': 'src/jquery.prettyselect2.coffee', // 1:1 compile
				}
			  },
		},
		uglify: {
			my_target: {
				files: {
					'dist/jquery.prettyselect.min.js': ['src/jquery.prettyselect.js'],
					'dist/jquery.prettyselect2.min.js': ['src/jquery.prettyselect2.js']
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