(function(w){
	//封装公共方法
	var $$={
		each:function(data,callback){
			for(var i in data){
				callback(i,data[i]);
			}
		}
	}
	//显示广告
	w.JIAJUOLADSHOW=function(opt){
	    if(opt.status=="success"){
	        $$.each(opt.pageData,function(i,d){
	        	var html='',oBox=document.getElementById('gg'+i);
	        	if(!oBox){return}
	            if(d.adInfo.url){
	            	switch(d.adInfo.showtype){
	            		case '0'://普通广告
	            			html='<a href="'+d.adInfo.clickurl+'" target="'+d.adInfo.opentype+'"><img src="'+d.adInfo.url+'" width="'+d.adInfo.width+'" height="'+d.adInfo.height+'"></a>';
	            		break;
	            		case '1'://展开广告
	            		break;
	            		case '3'://全屏通栏
	            			oBox.className="pr";
	            			oBox.style.height=d.adInfo.height+'px';
	            			oBox.style.overflow='hidden';
	            			html='<a class="pa" style="left:50%;margin-left:-'+(d.adInfo.width/2)+'px" href="'+d.adInfo.clickurl+'" target="'+d.adInfo.opentype+'"><img src="'+d.adInfo.url+'" width="'+d.adInfo.width+'" height="'+d.adInfo.height+'"></a>';
	            		break;
	            	}
	            }
	            else if(d.adPosition.url){
	            	var html='<a href="'+d.adPosition.clickurl+'" target="'+d.adPosition.opentype+'"><img src="'+d.adPosition.url+'" width="'+d.adPosition.width+'" height="'+d.adPosition.height+'"></a>';
	            }
	        	oBox.innerHTML=html;
	        })
	    }
	}
	if(typeof(JIAJUOLADID) != "undefined"){
		var head= document.getElementsByTagName('head')[0];
		var script= document.createElement('script');
		script.type= 'text/javascript';
		script.src= 'http://www.jiajuol.com/api/0200/ajaxAdvert.php?pid='+JIAJUOLADID+'&callback=JIAJUOLADSHOW';
		head.appendChild(script);
	}
}(window));
