module.exports = function(grunt) {

  // Load the plugin tasks we need
  [
      "grunt-contrib-clean",
      "grunt-contrib-concat",
      "grunt-string-replace"
  ].forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
        src: ['dist/']
    },
    concat: {
      dist: {
        // the files to concatenate
        src: ['src/*.js'],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    'string-replace': {
      single_file: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.js': 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
        },
        options: {
          replacements: [{
            pattern: 'NODE_PKG_VERSION_PLACEHOLDER',
            replacement: '<%= pkg.version %>'
          }]
        }
      }
    }
  });
  
  grunt.registerTask('default', ['clean','concat','string-replace']);
};
