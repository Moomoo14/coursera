'use strict';

module.exports = function (grunt) {
    
    require('time-grunt')(grunt);

    require('jit-grunt')(grunt);

    grunt.initConfig({
        sass: {
            dist: {
                files:{
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch:{
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browsersync:{
            dev:{
                bsFiles:{
                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                option:{
                    watchTask: true,
                    server:{
                        baseDir:'./'
                    }
                }
            }
        },
        copy:{
            html:{
                files:[{
                    expand: true,
                    dot: true,
                    cwd: ".",
                    src:['.html'],
                    dest: 'distribution'
                }]
            },
            fonts:{
                files:[{
                    expand:true,
                    dot: true,
                    cwd:'node_modules/font-awesome',
                    src:['fonts/*.*'],
                    dest:'distribution'
                }]
            }
        },
        clean:{
            build:{
                src:['distribution/']
            }
        },
        imagemin:{
            dynamic:{
                files:[{
                    expand:true,
                    dot:true,
                    cwd:'.',
                    src:['img/*.{png,jpg,gif}'],
                    dest:'distribution/'
                }]
            }
        },
        useminPrepare:{
            foo:{
                dest:'distribution',
                src:['contactus.html', 'aboutus.html','index.html']
            },
            options:{
                flow:{
                    steps:{
                        css:['cssmin'],
                        js:['uglify'],

                    },
                    post:{
                        css:[{
                            name:'cssmin',
                            createConfig:function(context, block){
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase : false
                                };
                            }
                        }]
                    }
                }
            }
        },
        concat:{
            options:{
                separator : ';'
            },
            dist: {}
        },
        uglify:{
            dist:{}
        },
        cssmin:{
            dist:{}
        },
        filerev:{
            options:{
                encoding:'utf8',
                algorithm: 'md5',
                length:20
            },
            release:{
                files:[{
                    'distribution/js/*.js',
                    '/css/*.css',
                }]
            }
        },
        usemin:{
            html:['distribution/contactus.html', 'dist/aboutus.html','index/html'],
            options:{
                assetDirs:['dist', 'dist/css', 'dist/js']
            }
        },
        htmlmin:{
            dist:{
                options:{
                    collapseWhitespace
                },
                files:{
                    'dist/index.html':
                }
            }
        }
    });
    grunt.registerTask('css',['sass']);
    grunt.registerTask('default',['browserSync', 'watch']);
    grunt.registerTask('build',[
        'clean',
        'copy',
        'imagemin',
    ]);
};