module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        debounceDelay: 250
      },
      less_main: {
        files: './css/**/*.less',
        tasks: ['less']
      },
      sass: {
        files: './css/**/*.scss',
        tasks: ['sass', 'postcss:autoprefixer', 'postcss:minify']
      }
    },

    less: {
      main: {
        files: {
          './css/style.css': './css/less/style.less'
        }
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          './css/style.css': './css/sass/style.scss'
        }
      }
    },

    postcss: {
      autoprefixer: {
        options: {
          map: true,
          processors: [
            require('autoprefixer-core')
          ]
        },
        files: {
          './css/style.css': './css/style.css'
        }
      },
      minify: {
        options: {
          map: true,
          processors: [
            require('csswring')
          ]
        },
        files: {
          './css/style.min.css': './css/style.css'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['sass', 'postcss:autoprefixer', 'postcss:minify', 'watch']);
};