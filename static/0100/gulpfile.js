var gulp = require('gulp'); //gulp
var imagemin = require('gulp-imagemin'); //图片压缩
var fileinclude = require('gulp-file-include'); // include 文件
var rename = require('gulp-rename'); //重命名
var uglify = require('gulp-uglify'); //js混淆
var concat = require('gulp-concat'); //合并
var usemin = require('gulp-usemin'); // html页面处理
var sass = require('gulp-sass'); // sass 编译
var sourcemaps = require('gulp-sourcemaps');//sass map
var livereload = require('gulp-livereload'); // 自动刷新
var jshint = require('gulp-jshint'); //js代码校验
var cached = require('gulp-cached'); //增量编译处理
var dev = process.argv.splice(3)[0]==='-dev';//判断开发环境，默认正式环境

//区分开发环境与正式环境
var config={
	sass:dev?'nested':'compressed',
	js:function(){
		var form=['../common/jquery.validate.js','../common/jquery.cookie.js','../common/jquery.lazyload.js','../common/jquery.placeholder.js','src/js/public.js'],//拼接的js文件列表
			to='./js',//输出目录
			name='public.js';//保存文件名称
		if(dev){
			return gulp.src(form).pipe(concat(name)).pipe(gulp.dest(to));
		}else{
			return gulp.src(form).pipe(concat(name)).pipe(uglify()).pipe(gulp.dest(to));
		}
	}
}

//js合并 混淆
gulp.task('jsmin', () =>
	config.js()
);

//js校验
gulp.task('jshint', function() {
	return gulp.src('src/js/*.js')
		.pipe(jshint({eqeqeq:false}))
		.pipe(jshint.reporter('default')) // 对代码进行报错提示
});

//sass 编译
//outputStyle Type: String Default: nested Values: nested, expanded, compact, compressed
gulp.task('sass:style1', function() {
	gulp.src(['scss/style-1.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle:config.sass
		}).on('error', sass.logError))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('css'))
		.pipe(livereload());
});
gulp.task('sass:style2', function() {
	gulp.src(['scss/style-2.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle:config.sass
		}).on('error', sass.logError))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('css'))
		.pipe(livereload());
});
gulp.task('sass:style3', function() {
	gulp.src(['scss/style-3.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle:config.sass
		}).on('error', sass.logError))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('css'))
		.pipe(livereload());
});
gulp.task('sass:style4', function() {
	gulp.src(['scss/style-4.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle:config.sass
		}).on('error', sass.logError))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('css'))
		.pipe(livereload());
});
gulp.task('sass:public', function() {
	gulp.src(['scss/public.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle:config.sass
		}).on('error', sass.logError))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('css'))
		.pipe(livereload());
});

//图片压缩
gulp.task('imgmin', () =>
	gulp.src('src/images/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images/'))
);

//html include
// gulp.task('fileinclude', function() {
// 	gulp.src(['./src/index.html'])
// 		.pipe(fileinclude({
// 			prefix: '@@',
// 			basepath: '@file'
// 		}))
// 		.pipe(usemin())
// 		.pipe(gulp.dest('./dist/'));
// });

//html保存刷新
gulp.task('html', () =>
	gulp.src(['./*.html'])
	.pipe(cached('html')) // 只传递更改过的文件
	.pipe(livereload())
);

//自动监听
gulp.task('watch1', function() {
	livereload.listen();
	gulp.watch('./*.html', ['html']);
	gulp.watch('scss/style-1.scss', ['sass:style1']);
	gulp.watch(['scss/public.scss'], ['sass:public']);
	gulp.watch('src/js/*.js', ['jshint']);
});
gulp.task('watch2', function() {
	livereload.listen();
	gulp.watch('./*.html', ['html']);
	gulp.watch('scss/style-2.scss', ['sass:style2']);
	gulp.watch(['scss/public.scss'], ['sass:public']);
	gulp.watch('src/js/*.js', ['jshint']);
});
gulp.task('watch3', function() {
	livereload.listen();
	gulp.watch('./*.html', ['html']);
	gulp.watch('scss/style-3.scss', ['sass:style3']);
	gulp.watch(['scss/public.scss'], ['sass:public']);
	gulp.watch('src/js/*.js', ['jshint']);
});
gulp.task('watch4', function() {
	livereload.listen();
	gulp.watch('scss/style-4.scss', ['sass:style4']);
	gulp.watch(['scss/public.scss'], ['sass:public']);
	gulp.watch('src/js/*.js', ['jshint']);
});

//自动构建
//gulp.task('build',['sass','fileinclude','imgmin','jshint','jsmin']);

//帮助
gulp.task('default', function() {
	console.log('\n');
	console.log(' | 老徐的前端自动化部署工具');
	console.log(' | blog：//www.loveqiao.com');
	console.log(' | git ：//github.com/waihaolaoxu/gulp.git');
	console.log(' |');
	console.log(' | 使用：');
	console.log(' | gulp watch---------编译sass、js代码检查、浏览器刷新');
	console.log(' | gulp sass----------执行sass编译');
	console.log(' | gulp jshint--------js代码语法检查');
	console.log(' | gulp jsmin---------js代码打包（合并&混淆压缩）');
	console.log(' | gulp imgmin--------图片压缩');
	//console.log(' | gulp fileinclude---编译html模版');
	//console.log(' | gulp build---------构建（执行全部命令）');
	console.log('\n');
});
