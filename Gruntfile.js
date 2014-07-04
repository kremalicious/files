module.exports = function(grunt){
    'use strict';

    // banner
    grunt.log.writeln("");
    grunt.log.writeln("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    grunt.log.writeln("");
    grunt.log.writeln("      (o) Just what do you think you're doing, Matthias?    ");
    grunt.log.writeln("");
    grunt.log.writeln("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    grunt.log.writeln("");

    // Grunt config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // less
        less: {
            production: {
                options: {
                    cleancss: true,
                    ieCompat: false
                },
                files: {
                    'swtndx/assets/kremalicious.css' : 'swtndx/assets/kremalicious.less'
                }
            }
        },

        // watch
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: ['swtndx/assets/*.less'],
                tasks: ['less']
            }
        },


        // rsync stuff around
        rsync: {
            options: {
                recursive: true,
                exclude: ['.git*','node_modules', 'Gruntfile.js', 'package.json', 'README.md']
            },
            // deployment
            deploy: {
                options: {
                    src: '.',
                    dest: 'domains/files.kremalicious.com/html',
                    host: 'kremalicious',
                    ssh: true,
                    compareMode: 'checksum',
                    args: ['--verbose']
                }
            }
        }

    });

    // Load NPM Tasks, smart code stolen from @bluemaex <https://github.com/bluemaex>
    require('fs').readdirSync('node_modules').filter(function (file) {
        return file && file.indexOf('grunt-') > -1;
    }).forEach(function (file) {
        grunt.loadNpmTasks(file);
    });

    // Default Task
    grunt.registerTask('default', [
        'less',
        'watch'
    ]);

    // Deploy
    grunt.registerTask('deploy', [
        'rsync:deploy'
    ]);

};