/* jshint node:true */
module.exports = function(grunt){
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            options: {
                ignores: ["extension/lib/**/*.js", 
                        "extension/page/js/vendor/*.js",
                        "extension/page/js/require/*.js",
                        "extension/**/*.min.js"]
            },
            build: ["Gruntfile.js", "extension/**/*.js"]    
        },

        clean: {
            build: ["dist"]
        },

        copy: {
            build: {
                //files: [{expand:true, src: ["extension/**", "!extension/**/*.js"], dest: "dist"}]
                files: [{expand:true, src: ["extension/**"], dest: "dist"}]  //包括js文件，后面uglify后会自动覆盖
            }
        },

        uglify: {
            options: {
                banner: "/*!\n" +
                        " * <%= pkg.name %> - v<%= pkg.version %>  \n" +
                        " * http://www.blogways.net \n" +
                        " * \n" +
                        " * Copyright 2012, 2014 www.blogways.net \n" +
                        " * \n" +
                        " * Date: <%= grunt.template.today('yyyy-mm-dd') %> \n" +
                        " */\n" 
            },

            build: {
                files: [{
                    expand: true,
                    cwd: "extension",
                    src: ["**/*.js", "!**/*.min.js", "!vendor/*.js"],
                    dest: "dist/extension" 
                }]
            }               
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.registerTask("default", ["jshint", "clean", "copy", "uglify"]);
};
