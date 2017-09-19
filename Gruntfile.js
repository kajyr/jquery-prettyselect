module.exports = function(grunt) {
	// Do grunt-related things in here

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		coffee: {
			compile: {
				files: {
					'dist/jquery.prettyselect.js': ['src/MutationObserverPolyfill.coffee', 'src/jquery.prettyselect.coffee']
				}
			},
		},
		uglify: {
			options: {
				banner: '/*\n<%= pkg.name %> - v<%= pkg.version %>\n' +
				'<%= pkg.author.name %>\n' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n*/\n',
				beautify: false
			}, 
			my_target: {
				files: {
					'dist/jquery.prettyselect.min.js': ['dist/jquery.prettyselect.js'],
				}
			}
		},
		copy: {
			main: {
				src: 'package.json',
				dest: 'jquery-prettyselect.jquery.json',
			},
		},
		watch: {
			scripts: {
				files: ['**/*.coffee'],
				tasks: ['coffee', 'uglify'],
				options: {
					spawn: false,
				},
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', ['coffee', 'uglify']);

};