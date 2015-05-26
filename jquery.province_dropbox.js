/**
 * 提供一些内置的jquery扩展，以简化操作代码
 */
(function($) {

	/**
	 * 三级省市区联动
	 * @author xiaocai.name
	 * @param  postname 下拉框 name值
	 * @param  selected 选中的值[必须是三级的户籍地值]
	 * demo:
	 *    <span id='test'></span>
	 *    $('#test').inittown('stu[town]');
	 *    $('#test').inittown('stu[town]','350881');
	 */
	$.fn.inittown  = function(postname,val){
		/* 初始化 */
		var chars = 'town_' + parseInt( Math.random() * 100 );
		var _me   = $(this);
		var html  = '';
		var defv  = false;
		html  += '<select id="'+chars+'_A"></select>';
		html  += '<select id="'+chars+'_B"></select>';
		html  += '<select id="'+chars+'_C" name="'+postname+'"></select>';
		_me.html(html);
		if(typeof(val) != "undefined"){
			defv = val;
		}

		/* 事件注册 */
		var _init  = function(){
			//省
			$.each(townarr,function(key,val){
				$('#'+chars+'_A').append("<option value='"+key+"'>"+val.name+"</option>");
			});
			
			$('#'+chars+'_A').change(function(){
				$('#'+chars+'_B').html('');
				$.each(townarr[$(this).val()]['child'], function(key,val){
					$('#'+chars+'_B').append("<option value='"+key+"'>"+val.name+"</option>");
				});
				$('#'+chars+'_B').change();
			});

			$('#'+chars+'_B').change(function(){
				$('#'+chars+'_C').html('');
				var val = $(this).val();
				$.each(townarr[val.substr(0,2)+'0000']['child'][val.substr(0,4)+'00']['child'], function(key,val){
					$('#'+chars+'_C').append("<option value='"+val.code+"'>"+val.name+"</option>");
				})
			});

			//默认选中哪项
			if(defv!=false){
				$('#'+chars+'_A').val(defv.substr(0,2)+'0000');
				$('#'+chars+'_A').change();
				$('#'+chars+'_B').val(defv.substr(0,4)+'00');
				$('#'+chars+'_B').change();
				$('#'+chars+'_C').val(defv);
			}else{
				$('#'+chars+'_A').change();
				$('#'+chars+'_B').change();
			}

		}

		/* 是否需要载入js */
		if(typeof(townarr) == "undefined"){
			$.getScript('province_data.js',function(){
				_init();
			});
		}else{
			_init();
		}

	}

})(jQuery);