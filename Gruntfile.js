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

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'uglify']);

};