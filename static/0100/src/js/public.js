// document.domain="jiajuol.com";
var jiajuol = {


    //百度分享

    share: function() {
        window._bd_share_config = {
            "common": {
                "bdSnsKey": {},
                "bdText": "",
                "bdMini": "2",
                "bdPic": "",
                "bdStyle": "0",
                "bdSize": "16"
            },
            "share": {}
        };
        with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
    },
    //轮播图
    slide: function(opt) {
        function Fn() {
            this.id = $(opt.id);
            this.len = this.id.find('img').length;
            this.num = 0;
            this.speet = opt.speet ? opt.speet : 'slow';
            this.auto = Number(opt.auto);
            this.btn = opt.btn;
            this.flag = true;
        }

        Fn.prototype.init = function() {
            var _self = this,
                d;
            _self.page();
            _self.id.find('img').one('trigger', function() {
                $(this).attr({
                    src: $(this).data('original')
                });
            }).eq(0).trigger('trigger').eq(1).trigger('trigger');

            _self.id.find('.slider-panel').eq(_self.num).css({
                zIndex: 1,
                display: 'block'
            });
            if (_self.auto) {
                d = setInterval(function() {
                    _self.next();
                }, _self.auto);
            }
            _self.id.mouseenter(function() {
                clearInterval(d);
            });
            _self.id.mouseleave(function() {
                d = setInterval(function() {
                    _self.next();
                }, _self.auto);
            });
            if (_self.btn) {
                _self.showBtn();
            }
        };
        Fn.prototype.next = function() {
            var _self = this;
            _self.num++;
            _self.num = (_self.num == _self.len ? 0 : _self.num);
            _self.showPic(_self.num);
        };
        Fn.prototype.prev = function() {
            var _self = this;
            _self.num--;
            _self.num = (_self.num < 0 ? _self.len - 1 : _self.num);
            _self.showPic(_self.num);
        };
        Fn.prototype.showPic = function(n) {
            var _self = this;
            if (_self.flag === false) {
                return;
            } //防止连续点击
            _self.flag = false;
            _self.id.find('.slider-panel').eq(n).css({
                zIndex: 2
            }).stop().fadeIn(_self.speet, function() {
                $(this).siblings('.slider-panel').css({
                    zIndex: 0,
                    display: 'none'
                }).end().css('z-index', 1);
                _self.flag = true;
            });
            _self.id.find('.slider-nav>li').eq(n).addClass('active').siblings().removeClass('active');
            _self.id.find('img').eq(n).trigger('trigger');
            var nextImg = _self.id.find('img').eq(n + 1);
            if (nextImg) {
                nextImg.trigger('trigger');
            }
        };
        Fn.prototype.showBtn = function() {
            var _self = this,
                btn = "<div class='slider-prev'></div><div class='slider-next'></div>";
            _self.id.append(btn);
            _self.id.find('.slider-prev').click(function() {
                _self.prev.call(_self);
            });
            _self.id.find('.slider-next').click(function() {
                _self.next.call(_self);
            });
        };
        Fn.prototype.page = function() {
            var page = [],
                _self = this;
            page.push('<ul class="slider-nav">');
            for (var i = 0; i < _self.len; i++) {
                page.push('<li class=' + (i === 0 ? "active" : "") + '><span>' + (i + 1) + '</span></li>');
            }
            page.push('</ul>');
            _self.id.append(page.join(''));
            _self.id.find('.slider-nav').on('click', 'li', function() {
                _self.showPic($(this).index());
            });
        };
        var fn = new Fn();
        fn.init();
    },
    //预约报价
    yuyue:function(id,callback,errorFn){
        var oId=id?id:'yuyue';
        jiajuol.submit(oId,callback,errorFn);
    },
    //公共表单验证异步提交
    submit: function(id,callback,errorFn) {
        var $obj=$('#'+id);
        $obj.find('[type=submit]').removeAttr('disabled');
        $obj.submit(function(e) {
            e.preventDefault();
            var b = $(this).validate({
                isone: true,
                error:errorFn?errorFn:function(e, t) {
                    var $box = $(e).parent();
                    if ($box.find('div.error').length) {
                        $box.find('div.error').text(t).show();
                    } else {
                        $box.append('<div class="error text-left">' + t + '</div>');
                    }
                    $(e).addClass('error').one('focus', function() {
                        $(this).parent().find('div.error').hide();
                        $(this).removeClass('error');
                    });
                }
            });
            if (b) {
                $('#pc_url',$obj).val(top.location.href);
                var user_id = $.cookie('user_base_id');
                if (user_id !== undefined) {
                    $('#pc_userid').val(user_id);
                } else {
                    $('#pc_userid').val(0);
                }
                $obj.find('[type=submit]').attr('disabled','true');
                $.ajax({
                    url: $(this).attr('action'),
                    dataType: "jsonp",
                    data: $(this).serializeArray(),
                    success: function(d) {
                        $obj.find('[type=submit]').removeAttr('disabled');
                        if(typeof callback=='function'){
                            callback(d.status==200?'':d.msg);
                        }else{
                            if (top.location.href != self.location.href){
                                var win=window.parent;
                                if(win.layer){
                                    win.layer.closeAll();
                                    win.layer.msg(d.msg, {icon: 1,time:1500});
                                }
                            }else{
                                if(typeof layer!='undefined'){
                                    layer.closeAll();
                                    layer.msg(d.msg, {icon: 1,time:1500});
                                }else{
                                    alert(d.msg);
                                }
                            }
                            $obj[0].reset();
                        }
                        $obj[0].reset();
                    },
                    error: function() {
                        $obj.find('[type=submit]').removeAttr('disabled');
                        //alert('请求出错！');
                        if(typeof callback=='function'){
                            callback('请求出错！');
                        }
                    }
                });
            }
            return false;
        });
    },
    //获取验证码用倒计时
    getcode: function(obj) {
        var t = obj.innerHTML,
            n = 60;
        (function() {
            if (n > 0) {
                obj.disabled = true;
                $(obj).addClass('disabled');
                obj.innerHTML = '倒计时' + (n--) + '秒';
                setTimeout(arguments.callee, 1000);
            } else {
                obj.disabled = false;
                obj.innerHTML = t;
                $(obj).removeClass('disabled');
            }
        })();
    },
    //活动倒计时
    countdown: function(opt) {
        //  1h = 3600 s
        //  1s = 1000 ms
        (function() {
            var t = null;
            var sTime = new Date(opt.date);
            var mydate = new Date();
            var T = Math.floor((sTime - mydate) / 1000);
            if (T <= 0) {
                clearTimeout(t);
                opt.obj.html(opt.txt).parents('.count').addClass('pass');
                return;
            }
            var D = Math.floor(T / (3600 * 24));
            var H = Math.floor((T - D * 24 * 3600) / 3600);
            var M = Math.floor((T / 60) - (D * 24 * 60 + H * 60));
            var S = T % 60;

            function setnum(d, t) {
                if (d === 0) {
                    return '';
                } else {
                    return d + t;
                }
            }

            var html = setnum(D, '天') + setnum(H, '小时') + setnum(M, '分') + S + '秒';
            opt.obj.html(html);
            t = setTimeout(function() {
                jiajuol.countdown(opt);
            }, 1000);
        })();
    },
    //懒加载
    lazy: {
        effect: "fadeIn",
        threshold: 200,
        load: function(w1, h1) {
            var load_this = $(this),_this_parent_width,_this_parent_height,_this_width,_this_height;
            if (load_this.hasClass('auto')) {
                _this_parent_width = load_this.parents('.lazy').width();
                _this_parent_height = load_this.parents('.lazy').height();
                _this_width = w1;
                _this_height = h1;
                //              console.log(_this_width+"}"+_this_height)
                if (_this_parent_width / _this_parent_height < _this_width / _this_height) {
                    load_this.css({
                        width: 'auto',
                        height: '100%'
                    });
                    _this_width = _this_parent_height * w1 / h1;
                    load_this.css({
                        left: -(((_this_width - _this_parent_width) / 2) / _this_parent_width) * 100 + '%',
                        top: 0
                    });
                } else {
                    load_this.css({
                        width: '100%',
                        height: 'auto'
                    });
                    _this_height = _this_parent_width * h1 / w1;
                    load_this.css({
                        top: -(((_this_height - _this_parent_height) / 2) / _this_parent_height) * 100 + '%',
                        left: 0
                    });
                }
            } else if (load_this.hasClass('auto_height')) {
                load_this.css({
                    height: 'auto',
                    width:'auto'
                });
            }else if(load_this.hasClass('height_middle')){
                _this_parent_height = load_this.parents('.lazy').height();
                _this_parent_width = load_this.parents('.lazy').width();
                _this_height = _this_parent_width * h1 / w1;
                load_this.css({
                    top: -(((_this_height - _this_parent_height) / 2) / _this_parent_height) * 100 + '%',
                    left: 0
                });
            }else if (load_this.hasClass('auto_inner')) {
                _this_parent_width = load_this.parents('.lazy').width();
                _this_parent_height = load_this.parents('.lazy').height();
                _this_width = w1;
                _this_height = h1;
                //              console.log(_this_width+"}"+_this_height)
                if (_this_parent_width / _this_parent_height > _this_width / _this_height) {
                    load_this.css({
                        width: 'auto',
                        height: '100%'
                    });
                    _this_width = _this_parent_height * w1 / h1;
                    load_this.css({
                        left: -(((_this_width - _this_parent_width) / 2) / _this_parent_width) * 100 + '%',
                        top: 0
                    });
                } else {
                    load_this.css({
                        width: '100%',
                        height: 'auto'
                    });
                    _this_height = _this_parent_width * h1 / w1;
                    load_this.css({
                        top: -(((_this_height - _this_parent_height) / 2) / _this_parent_height) * 100 + '%',
                        left: 0
                    });
                }
            }
        }
    },
    setCookie: function(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
    },
    getCookie: function(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return decodeURI(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    },
    popYuyue: function(e) {
        layer.open({
            type: 2,
            title: [e.title],
            area: ['400px', '300px'],
            shadeClose: false, //点击遮罩关闭
            content: '/apply_popup.html'
        });
    },
    loginCallback:null,//弹层登录回调
    popLogin:function(){
       layer.open({
            type: 2,
            title: ['登录'],
            area: ['420px', '370px'],
            shadeClose: false, //点击遮罩关闭
            content: 'http://www.jiajuol.com/layer_login.html?v=20160920'
        });
    },
    hot_shangpin:function(){
    	if($.cookie('user_base_id')!=undefined){
            var c_user=false;
    		var go_str='';
    		$('.hot_shangpin').find('.button a .none').html('我想买').parent().attr('href','javascript:;');

    		$('.hot_shangpin').find('.button a').addClass('huaban').each(function(index,obj){
    			go_str+=$(obj).attr('value')+',';
    		});
    		//console.log(go_str.slice(0,-1));
    		$.get('/api/goods/goods_price.php',{
    			goods_id:go_str.slice(0,-1)
    		},function(data){
    			//console.log(data);
    			var data=data;
    			if(data.status==200){
	    			$('.hot_shangpin .shows').each(function(index,obj){
	    				$(obj).html(data.data[index].price==0?'到店更低':'￥'+data.data[index].price);
	    			});
    			}
    		},'json')
    	}else{
            var c_user=true;
    		$('.hot_shangpin').find('.button a .shows').html('劲爆底价').next().html('登录可见').parent().attr('href','http://service.jiajuol.com/login');
    	}

    	$('body').on('click','.hot_shangpin .huaban',function(){
	        var id=$(this).attr('value');
	        layer.open({
	            type: 2,
	            title: ['免费获取优惠码'],
	            area: ['500px', '400px'],
	            shadeClose: false, //点击遮罩关闭
	            content: '/goods/goods_buy.php?id='+id,
	        });
	    });
        $('.hot_shangpin').find('.button a').click(function(e){
            if(c_user){
                if($.cookie('user_base_id')!=undefined){
                    location.reload();
                    e.preventDefault();
                }

            }

        });
    }
};


$(function() {
    //懒加载
    var setTime = setTimeout(function() {
        $(".lazy_img").lazyload(jiajuol.lazy);
        clearTimeout(setTime);
    }, 300);

    $('html,body').scrollTop($(window).scrollTop() + 1);
    $('input, textarea').placeholder();
    //弹层幻灯
    (function() {
        if ($('[data-viewsrc]').length > 0) {
            var view_flag=false;
            $('body').append('<div class="lightbox"><div class="bg"></div><i class="iconfont icon-close"></i><div class="lazy"><img src="http://icon.carimg.com//static/0200/blank.gif" /></div><p></p><i class="icons iconfont icon-right"></i><i class="iconfont icon-left icons"></i><span class="lightbox_num"></span></div>');
            var $lightbox = $('div.lightbox');
            var $lightbox_box = $('div.lightbox div.lazy');
            var $lightbox_box_img = $('div.lightbox div.lazy img');
            var $lightbox_box_font = $('div.lightbox p');
            var new_img = new Image();
            $lightbox.find('i.icons').click(function() {
                $lightbox_box_img.removeClass('scale');
                if ($(this).hasClass('icon-left')) {
                    now_view_num--;
                    if (now_view_num < 0) {
                        now_view_num = viewsrc_arr.length - 1;
                    }
                } else {
                    now_view_num++;
                    if (now_view_num >= viewsrc_arr.length) {
                        now_view_num = 0;
                    }
                }
                new_img.src = viewsrc_arr[now_view_num].src;
                $('span.lightbox_num').html((now_view_num+1)+'/<i>'+viewsrc_arr.length+'</i>');
            });
            var viewsrc_arr = [];
            var now_view_num = 0;
            $lightbox.find('.icon-close').click(function() {
                view_flag=false
                $lightbox.fadeOut();
                $('body').removeClass('over');
            });
            new_img.onload = function() {
                if ($lightbox_box.width() / $lightbox_box.height() < new_img.width / new_img.height) {
                    $lightbox_box_img.css({
                        width: '100%',
                        height: 'auto'
                    });
                    $lightbox_box_img.css({
                        marginTop: ($lightbox_box.height() - $lightbox_box_img.height()) / 2
                    });
                } else {
                    $lightbox_box_img.css({
                        width: 'auto',
                        height: '100%',
                        margin: '0 auto'
                    });
                }
                $lightbox_box_img.attr('src', new_img.src).addClass('scale');
                $lightbox_box_font.html(viewsrc_arr[now_view_num].font);
                $('body').addClass('over');
                $(window).resize();
            };

            $('body').on('click', '[data-viewsrc]', function() {
                view_flag=true;
                viewsrc_arr = [];
                $lightbox_box_img.removeClass('scale');
                var now_view = $(this).attr('data-view');
                var $all_view = $('[data-viewsrc]').filter('[data-view='+now_view+']');
                var now_click_json = {
                    src: $(this).attr('data-viewsrc'),
                    font: $(this).attr('data-viewfont') ? $(this).attr('data-viewfont') : ' '
                };
                now_view_num=$all_view.index(this);
                //console.log(now_view_num);
                $all_view.each(function(index, obj) {
                    var $obj = $(obj);
                    var go_view_json = {
                        src: $obj.attr('data-viewsrc'),
                        font: $obj.attr('data-viewfont') ? $obj.attr('data-viewfont') : ' '
                    };
                    viewsrc_arr.push(go_view_json);
                });
                $lightbox.fadeIn();
                new_img.src = viewsrc_arr[now_view_num].src;
                $('span.lightbox_num').html((now_view_num+1)+'/<i>'+viewsrc_arr.length+'</i>');
            });
            $(window).resize(function() {
                if ($lightbox_box.width() / $lightbox_box.height() < new_img.width / new_img.height) {
                    $lightbox_box_img.css({
                        width: '100%',
                        height: 'auto'
                    }).css({
                        marginTop: ($lightbox_box.height() - $lightbox_box_img.height()) / 2
                    });
                } else {
                    $lightbox_box_img.css({
                        width: 'auto',
                        height: '100%',
                        margin: '0 auto'
                    });
                }
            });
            //console.log(221);
            $(document).keydown(function(event){
                //console.log(111);
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if(view_flag){
                    if(e && e.keyCode==27){
                        $lightbox.find('.icon-close').click();
                    }else if(e && e.keyCode==37){
                        $lightbox.find('.icon-left').click();
                    }else if(e && e.keyCode==39){
                        $lightbox.find('.icon-right').click();
                    }
                }
            });
        };
    })();
    //选项卡
    (function(){
        var obj= $('.tabTit'),d=obj.data('event'),ev=d?d:"click";
        obj.children('span').on(ev,function() {
            var _self = $(this),
                index = _self.index();
            _self.addClass('active').siblings().removeClass('active');
            _self.parent().parent().children('.tabLayer').children('div').eq(index).siblings('div').hide().end().show();
        });
    }());
    //定位
    var $city = $('.curcity'),
        cityPinyin, city, currCityInfo;
    if ($city.length) {
        var $citySelect = $('.citySelect');
        if ($citySelect.length) {
            $citySelect.attr('href', 'http://www.jiajuol.com/citylist');
        }
        city = jiajuol.getCookie('jj_location_city');
        if (city) {
            cityPinyin = jiajuol.getCookie('jj_location_city_pinyin');
            currCityInfo = '';
            if (cityPinyin) {
                currCityInfo = '<a href="http://www.jiajuol.com/' + cityPinyin + '/">' + city + '</a>';
            } else {
                currCityInfo = city;
            }
            $city.html(currCityInfo);
        } else {
            $('body').append('<iframe src="http://service.jiajuol.com/service/0200/user_location.php" style="display:none"></iframe>');
            city = jiajuol.getCookie('jj_location_city');
            if (city) {
                cityPinyin = jiajuol.getCookie('jj_location_city_pinyin');
                currCityInfo = '';
                if (cityPinyin) {
                    currCityInfo = '<a href="http://www.jiajuol.com/' + cityPinyin + '/">' + city + '</a>';
                } else {
                    currCityInfo = city;
                }
                $city.html(currCityInfo);
            } else {
                $city.html('<a href="http://www.jiajuol.com/beijing/">北京</a>');
            }

        }
    }

    //右侧浮层控制
    var win_h = $(window).height(),
        backTop = $('.slide_up dl:last');
    backTop.hide();
    $(window).on('scroll', function() {
        if ($(window).scrollTop() >= win_h) {
            backTop.fadeIn('400');
        } else {
            backTop.fadeOut('400');
        }
    });
});

//bfq 增加一个用户退出登录方法
function userLogOut() {
    $.ajax({
        type: "get",
        async: false,
        url: "http://service.jiajuol.com/ajax/ajaxUserCtl.php",
        dataType: "jsonp",
        success: function(data) {
            if (data.status == 200) {
                //alert(data.msg);
                window.location.href = 'http://www.jiajuol.com';
            } else {
                alert(data.msg);
            }

        },
        error: function() {
            //alert('fail');
        }
    });
}
//用户是否登录顶端展示
function checkLogin(){
    var login_user_id = $.cookie('user_base_id');
    var login_nickname = $.cookie('nickname');
    var login_token = $.cookie('token');
    var headStr = '';
    if (login_user_id && login_token) {
        headStr += '<span class="fl">欢迎您：</span><a href="http://service.jiajuol.com/home" class="fl">' + login_nickname + '</a>' +
            '<span class="line fl"></span>' +
            '<a href="http://service.jiajuol.com/home" class="fl">用户中心</a>' +
            '<span class="line fl"></span>' +
            '<a href="javascript:void(0)" onclick="userLogOut();" class="fl">退出</a>' +
            '<span class="line fl"></span>' +
            '<a href="http://www.jiajuol.com/free" class="fl">我要装修</a>' +
            '<span class="line fl"></span>' +
            '<span class="fl">服务热线：</span>' +
            '<span class="red_1">400-9230-798</span>';
    } else {
        headStr += '<a href="http://service.jiajuol.com/login" class="fl">登录</a>' +
            '<span class="line fl"></span>' +
            '<a href="http://service.jiajuol.com/register" class="fl">注册</a>' +
            '<span class="line fl"></span>' +
            '<a href="http://service.jiajuol.com/login?sellerLogin=1" class="fl">商家登录</a>' +
            '<span class="line fl"></span>'+
            '<a href="http://www.jiajuol.com/free" class="fl">我要装修</a>' +
            '<span class="line fl"></span>' +
            '<span class="fl">服务热线：</span>' +
            '<span class="red_1">400-9230-798</span>';
    }
    $('#userHeadTop').html(headStr);
}
checkLogin();

/*
  @ Name:图片上传依赖jquery.form
  @ Author:xusl
  @ date:2016-8-29
  @ example:
    $('.imgUpload').imgUpload({
        url:'http://172.0.0.1:8000',
        data:{},
        before:function(e){      //e:当前对象
            alert('上传开始...');
            //return false //如果返回false则不进行上传
        },
        success:function(e,data){   //e:当前对象,data:返回的完整数据
            alert('上传完毕...');
        },
        error:function(e){      //e:当前对象
            alert('接口异常！');
        }
    });
*/
(function($) {
    $.fn.imgUpload = function(opt) {
        var $this = $(this);
        var $form = $('<form method="post" enctype="multipart/form-data"><input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" name="file"></form>');
        $this.click(function(event) {
            var _self=$(this);
            if(_self.hasClass('disabled')){
                return;
            }
            $form[0].reset();
            $form.find(':file').one('change', function(ev) {
                _self.addClass('disabled');
                // 加载开始执行回调
                if (typeof opt.before == 'function') {
                    if(opt.before($this,ev)===false){
                        return;
                    }
                }
                //上传中
                var options = {
                    url: opt.url,
                    dataType: "json",
                    data: opt.data ? opt.data : {},
                    success: function(data) {
                        //成功上传执行回调
                        opt.success($this,data);
                        _self.removeClass('disabled');
                    },
                    error: function(e) {
                        //接口异常执行回调
                        if (typeof opt.error == 'function') {
                            opt.error($this);
                        }
                        _self.removeClass('disabled');
                    }
                }
                $form.ajaxSubmit(options);
            }).trigger('click');
        });
    }
})(jQuery);

$(function() {
    var hide = '<a href="javascript:;" class="divhide" style="color:#ff4048;">更多↓</a>';
	var show = '<a href="javascript:;" class="divshow" style="color:#ff4048;">收起↑</a>';
	$('.bottomTab .tabLayer .linkList').each(function(){
		var _this = $(this);
		if(_this.find('a').size()>44){
			$(_this.find('a').eq(44).before(hide));
			_this.find('a').slice(45,_this.find('a').size()).hide();
		}
	});
	$(document).on('click','.bottomTab .tabLayer .linkList .divhide',function(){
		var _this = $(this).parent();
		_this.find('.divhide').hide();
		if(_this.find('.divshow').length<1){
			_this.append(show);
		}else{
			_this.find('.divshow').show();
		}
		_this.find('a').slice(45,_this.find('a').size()).show();
	});
	$(document).on('click','.bottomTab .tabLayer .linkList .divshow',function(){
		var _this = $(this).parent();
		_this.find('.divhide').show();
		_this.find('.divshow').hide();
		_this.find('a').slice(45,_this.find('a').size()).hide();
	});
});


//临时问卷调查
$(function(){
    var html='<iframe src="http://wj.qq.com/s/806355/6522" frameborder="0" scrolling="yes" height="500" width="100%" class="mt10" style="border-top: solid 1px #ddd;border-bottom: solid 1px #ddd;border-right: solid 1px #ddd;"></iframe>';
    var reg={
        a:/^http:\/\/seller.+goods\/\d+$/,
        b:/^http:\/\/www.+subject\/\d+$/,
        c:/^http:\/\/news\.jiajuol.com\/?$/,
        d:/^http:\/\/news\.jiajuol.com\/\d+\/\d+\.shtml?$/,
        e:/^http:\/\/www\.jiajuol.com\/baike\/\d+$/,
        f:/^http:\/\/product\.jiajuol.com\/\d+\/?$/,
        g:/prd_list(.+)?$/
    }
    var _url=window.location;
    if(reg.a.test(_url)){
        $('.right_around').append(html);
    }else if(reg.b.test(_url)){
        $('.AreaR').append(html);
    }else if(reg.c.test(_url)){
        $('.right_cont').append(html);
    }else if(reg.d.test(_url)){
        $('.wiki_info_right').append(html);
    }else if(reg.e.test(_url)){
        $('.wiki_info_right').append(html);
    }else if(reg.f.test(_url)){
        $('.fr_cont').append(html);
    }else if(reg.g.test(_url)){
        $('.jiaju_left').append(html);
    }
});
//收藏
$(function(){
    function ajax_if(data){
        var go_str = '';
        var $pic=data.dom=$(data.dom)
        $pic.each(function(index,obj){
            go_str += $(obj).attr('data-id') + ',';
        })
        if(go_str){
            data.ids=go_str.slice(0, -1);
        }else{
            return;
        }
        $.ajax({
            type: "get",
            async: false,
            url: "http://service.jiajuol.com/ajax/ajaxUserCtl.php",
            data:{
                action:data.action,
                ids:data.ids
            },
            dataType: "jsonp",
            jsonp: "callback",
            success: function(json) {
                if(json.status==200){
                    data.dom.each(function(index,obj){
                        if(json.data[index].flag){
                            $(obj).addClass('on');
                        }else{
                            $(obj).removeClass('on');
                        }
                    })
                }
            },
            error: function() {
                //layer.msg('请求出错，请刷新页面重试',{icon:2,time:2000})
            }
        });
    }
    if($.cookie('user_base_id')){
        ajax_if({
            dom:'.need-collect[data-type=pic]',
            action:'userChkFavPhotoFlag'
        });
        ajax_if({
            dom:'.need-collect[data-type=case]',
            action:'userChkFavSubjectFlag'
        })
    }



    $('body').on('click','.need-collect',function(e){
        e.preventDefault();
        e.stopPropagation();
        var t=this;
        var $t=$(this);
        if(t.flag){
            return;
        }
        var type=$t.attr('data-type');
        var action;
        if($.cookie('user_base_id')){
            if(!$t.hasClass('on')){
                if(type=='case'){
                    action='userAddFavSubject';
                }else{
                    action='userAddFavPhoto';
                }
            }else{
                if(type=='case'){
                    action='userDelFavSubject';
                }else{
                    action='userDelFavPhoto';
                }
            };
            t.flag=true;
            $t.addClass('loading');
            $.ajax({
                type: "get",
                async: false,
                url: "http://service.jiajuol.com/ajax/ajaxUserCtl.php",
                data:{
                    action:action,
                    id:$t.attr('data-id')
                },
                dataType: "jsonp",
                jsonp: "callback",
                success: function(json) {
                    var tt=setTimeout(function(){
                        $t.removeClass('loading');
                        t.flag=false;
                        // console.log(json);
                        if(json.status==200){
                            if($t.hasClass('on')){
                                $t.removeClass('on');
                            }else{
                                $t.addClass('on');
                            }
                        }else{
                            $t.removeClass('loading');
                            //layer.msg(json.msg,{icon:2,time:2000})
                        };
                        clearTimeout(tt);
                    },300)

                },
                error: function() {
                    $t.removeClass('loading');
                    //layer.msg('请求出错，请刷新页面重试',{icon:2,time:2000})
                }
            });
        }else{
            t.flag=false;
            location='http://service.jiajuol.com/login'
        }
    });
})
$(function(){
    setInterval(function(){
        if($(window).scrollTop()>100){
            $('#header i.bg').addClass('on');
        }else{
            $('#header i.bg').removeClass('on');
        }
    },500)
})
