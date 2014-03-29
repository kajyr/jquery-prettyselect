module.exports = function(grunt) {
  // Do grunt-related things in here

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [
				'Gruntfile.js',
				'src/*.js',
				'!src/*.min.js'
			]
		},
		uglify: {
			my_target: {
				files: {
					'src/jquery.prettyselect.min.js': ['src/jquery.prettyselect.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'uglify']);
	grunt.registerTask('test', ['jshint', 'uglify', 'nodeunit']);

};