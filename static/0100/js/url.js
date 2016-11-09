/*
 * 跳转URL
 */
(function(){
	//url
	var _url=window.location.href;
	//获取cookie
	function getCookie(c_name) {
		var c_start,c_end;
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return ""
	}
	//封装公共方法
	var $$={
		each:function(data,callback){
			for(var i in data){
				callback(i,data[i]);
			}
		}
	}

	/*
	 * 北京用户查看指定产品自动跳转指定商家主页
	 */
	var reglist={
		//陇星散热器
		seller_15:[/(prd_list\/(a5|c226|c227|c228|c229|c230|c231))|(brand_675\/?)$/,'http://seller.jiajuol.com/seller/100015'],
		//东鹏瓷砖
		seller_14:[/(prd_list\/(a2|c128|c129|c130|c131|c132))|(brand_464\/?)$/,'http://seller.jiajuol.com/seller/100014'],
		//皇家森林地板
		seller_13:[/prd_list\/(a3|c105|c106|c108|c109|c110|c111|c113|c114|c115|c116|c258)/,'http://seller.jiajuol.com/seller/100013'],
		//芬琳漆
		seller_12:[/(prd_list\/(a4|c219|c220|c221|c222|c223|c224|c225))|(brand_710\/?)$/,'http://seller.jiajuol.com/seller/100012'],
		//德斯曼橱柜
		seller_10:[/prd_list\/(c133)/,'http://seller.jiajuol.com/seller/100010'],
		//松下新风系统
		seller_09:[/(prd_list\/(c175))|(brand_11\/?)$/,'http://seller.jiajuol.com/seller/100009'],
		//地康水电 地暖 新风系统
		seller_08:[/prd_list\/(a14|c212|c213|c214|c215|c217|c218|a12|c232|c234|a13|c118|c119|c120|c121|c122|c123|c124|c125|c126|c127|a10|c177|c178|c179|c180|c181|c182|c183|c184|c185|c186|c187|c188|c189|c194|c249)/,'http://seller.jiajuol.com/seller/100008'],
		//芬享T型门
		seller_07:[/prd_list\/(c56|c47|c48)/,'http://seller.jiajuol.com/seller/100007'],
		//港典门窗
		seller_03:[/prd_list\/(c50|c51|c53|c58|c59|c248)/,'http://seller.jiajuol.com/seller/100003'],
		//盼盼安全门万兴家居店
		seller_02:[/(prd_list\/(c45|c46|c49|c52|c63))|(brand_80\/?)$/,'http://seller.jiajuol.com/seller/100002'],
		//老板电器
		seller_00:[/(prd_list\/(a8|c134|c135|c136|c137|c138|c139|c140|c141|c143|c144|c145|c146|c147|c148|c150|c261))|(brand_535\/?)$/,'http://seller.jiajuol.com/seller/100000'],
		//好莱客全屋定制
		seller_05:[/prd_list\/(s4|c65|c66|c67|c68|c69|c70|c71|c72|c73|c74|c75|c76|c77|c78|c80|c81|c82|c83|c84|c86|c256|s3|s5|s6|s14|a11|c1|c2|c5|c15|c6|c7|c14|c10|c13|a15|c195|c196|c197|c198|c201|c209|c208|a18|c250|c251)$/,'http://seller.jiajuol.com/seller/100005'],
		//格力空调
		seller_06:[/(prd_list\/(a7|c40|c39|c38|c37|c36|c35|c34|c33|c32|c31|c30|c41|c42|c43|c44|c262))|(brand_52\/?)$/,'http://seller.jiajuol.com/seller/100006'],
		//秦艺阁榻榻米
		seller_04:[/prd_list\/(c259)/,'http://seller.jiajuol.com/seller/100004'],
		//好太太科技吊顶
		seller_01:[/(prd_list\/(a16|c87|c88|c89|c90|c92|c93|c95|c96|c97|c99|c100|c101|c102|c103|c257))|(brand_1437\/?)$|(brand_1317\/?)$/,'http://seller.jiajuol.com/seller/100001']
	}
	function pipei(){
		if(getCookie("jj_location_c_id")==1){
			$$.each(reglist,function(i,d){
				if(d[0].test(_url)){
					window.location.href=d[1];
					return false;
				}
			});
		}
	}
	if(getCookie("jj_location_c_id")){
		pipei();
	}else{
		var a = document.getElementsByTagName('head')[0];
		var loc = document.createElement('iframe');
		loc.setAttribute("src","http://service.jiajuol.com/service/0200/user_location.php");
		loc.setAttribute("style","display:none");
		a.appendChild(loc);
		loc.onload=pipei;
	}

	/*
	 * 匹配设备跳转URL
	 */
	if(getCookie('jiaju_dev_flag')){return}
	//正则匹配
	var reg={
		// reg_1:/^http:\/\/www\..+(\/|citylist|effect|subject|pic|designer|workman|package|baike|free|appoint)(\/?)(\d+)?(\/?)$/,
		reg_1:/^http:\/\/www\..+(\/|subject)(\/?)(\d+)?(\/?)$/
		// reg_2:/(news|search)\.jiajuol\.com/
	}
	//设备检测
	function IsMobile() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad",
			"iPod"
		];
		var flag = false;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = true;
				break;
			}
		}
		return flag;
	}
	//跳转
	function goto(t){
		if(reg.reg_1.test(_url)){//常规
			window.location.href=_url.replace('http://www','http://m');
		}
		// else if(reg.reg_2.test(_url)){//特殊域名
		// 	window.location.href=_url.replace(/^(http:\/\/)(news|search)(\.jiajuol\.com)(.+)?$/,'$1m$3/$2$4');
		// }
	}
	if(IsMobile()){
		goto();
	}
})();