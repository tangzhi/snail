/* jshint node:true */
module.exports = function(grunt){
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            options: {
                ignores: ["extension/lib/**/*.js"]
            },
            build: ["Gruntfile.js", "extension/**/*.js"]    
        },

        clean: {
            build: ["dist"]
        },

        copy: {
            build: {
                files: [{expand:true, src: ["extension/**", "!extension/**/*.js"], dest: "dist"}]
            }
        },

        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */\n" 
            },

            build: {
                files: [{
                    expand: true,
                    cwd: 'extension',
                    src: '**/*.js',
                    dest: 'dist/extension' 
                }]
            }               
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask("default", ["jshint", "clean", "copy", "uglify"]);
};
