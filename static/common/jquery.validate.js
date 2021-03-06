/*
 @ Name：jQuery表单验证插件
 @ Author：前端老徐
 @ Date：2015/11/20
 @ GitHub:https://github.com/waihaolaoxu
 @ Address:http://www.loveqiao.cn/dom/plugin/validate.html
 */
;(function($){
	$.fn.validate=function(options){
		//是否批量验证
		var isone=options.isone?true:false;
		//提交按钮状态
		var submitBtn={
			flag:false,
			id:$(this).find("input[type='submit']"),
			txt:'提交中...'
		}
		//验证规则
		var validate={
				required:function(e){
					if(e.val()==''||e.val()==0){
						_error(e,'required');
						return false
					}
				},
				email:function(e){
					var reg=/^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/,val=e.val();
					if(val&&!reg.test(val)){
						_error(e,'email');
						return false
					}
				},
				tel:function(e){
					var reg=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}$/,val=e.val();
					if(val&&!reg.test(val)){
						_error(e,'tel');
						return false
					}
				},
				phone:function(e){
					var reg=/^1[3|5|8|7]\d{9}$/,val=e.val();
					if(val&&!reg.test(val)){
						_error(e,'phone');
						return false
					}
				},
				number:function(e){
					var val=e.val()
					if(val&&isNaN(e.val())){
						_error(e,'number');
						return false
					}
				},
				idcard:function(e){
					var reg=/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,val=e.val();
					if(val&&!reg.test(val)){
						_error(e,'idcard');
						return false	
					}
				}
		}
		//提示信息
		messages = {
			required: "不能为空！",
			email: "格式不正确！",
			tel: '格式不正确！',
			phone:'格式不正确！',
			number: "请输入数字！",
			idcard:'格式不正确'
		}
		//合并对象
		if(options){
			if(options.messages){
				messages=$.extend(messages,options.messages)
			}
			if(options.validate){
				validate=$.extend(validate,options.validate)
			}
			if(options.submitBtn){
				submitBtn=$.extend(submitBtn,options.submitBtn)
			}
		}
		//错误提示
		_error=function(obj,error){
			if(options.error){
				options.error(obj,messages[error]);
				return
			}
			alert(messages[error])
		}
		//校验
		function check(){
			var rule=$(this).attr('validate').split('|'),len=rule.length;
			for(var i=0;i<len;i++){
				if(validate.hasOwnProperty(rule[i])){
					if(validate[rule[i]]($(this))==false){
						return false
						break
					}
				}
			}
		}
		function yanzheng(){
			var success=true;
			$(this).find('[validate]').each(function(i, e) {
			   if(check.call(e)==false){
					success=false
					if(isone){
						return false 
					}
			   }
            });
			if(success){
				if(submitBtn.flag){
					submitBtn.id.val(submitBtn.txt)
				}
			}
			return success	
		}
		return yanzheng.call(this)
	}
})(jQuery);