function num_submit(fn) {
	var $inputs = $('div.input_list input');
	$('.has_select select').change(function() {
		var $obj = $(this);
		var now_arr = $obj.find("option:selected").html().split('x');
		$obj.parents('.has_select').find('input.select_input').each(function(index, obj) {
			$(obj).val(now_arr[index])
		})
	}).change();
	$inputs.focus(function() {
		if ($(this).hasClass('erro')) {
			$(this).removeClass('erro').parents('.inputs').find('em span.red_1').html('');
		}
	})
	$('#num_form').submit(function(e) {
		e.preventDefault();
		var now_flag = true;
		$inputs.each(function(index, obj) {
			var now_val = $.trim($(obj).val());
			if (now_val == '') {
				$(obj).addClass('erro').parents('.inputs').find('em span.red_1').html(' （请填写“' + $(obj).prev().html() + '”数值）')
				now_flag = false;
				return false;
			} else {
				if (isNaN(now_val)) {
					$(obj).addClass('erro').parents('.inputs').find('em span.red_1').html(' （“' + $(obj).prev().html() + '”必须为数值）');
					now_flag = false;
					return false;
				} else if (now_val <= 0) {
					$(obj).addClass('erro').parents('.inputs').find('em span.red_1').html(' （“' + $(obj).prev().html() + '”必须大于0）');
					now_flag = false;
					return false;
				}
			}
		});
		if (now_flag) {
			// alert('计算');
			if(fn){
				fn();
			}
		}
	});
}