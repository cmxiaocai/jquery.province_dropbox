基于国家标准区位码省级联动
==================

```
	1.引用script
	<script src="http://code.jquery.com/jquery-1.4.1.min.js"></script>
    <script type="text/javascript" src="jquery.province_dropbox.js"></script>
	
	2.指定位置加入html标签
	<span id='dropbox1'></span>
	
	3.在标签内渲染联动下拉框
	$('#dropbox1').inittown('town1');
	
	$.inittown(post字段名称, 默认选中的区位码)
```
