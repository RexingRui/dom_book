
addLoadEvent(displayCitations);
addLoadEvent(displayAbbreviations);
addLoadEvent(displayAccessKeys);

function displayAbbreviations(){
	if (!document.getElementsByTagName || !document.createElement || 
		!document.createTextNode) return false;
	//取得所有缩略词
	var abbreviation = document.getElementsByTagName("abbr");
	if (abbreviation.length  < 1) return false;
	var defs = new Array();
	// 遍历这些缩略词
	for ( var i = 0; i < abbreviation.length; i++){
		var current_abbr = abbreviation[i]
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}
	// 创建定义列表
	var dlist = document.createElement("dl");
	for ( key  in defs) {

		var definition = defs[key];
	// 创建定义标题
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
	// 把他们添加到定义列表中
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	// 创建标题
	var header = document.createElement("h2");
	var header_text = document.createTextNode("Abbreviation");
	header.appendChild(header_text);
	// 把标题添加到页面主体
	document.getElementsByTagName("body")[0].appendChild(header);
	// 把定义列表添加到页面主体
	document.getElementsByTagName("body")[0].appendChild(dlist);
}

function displayCitations() {
	if (!document.getElementsByTagName || !document.createElement ||
		!document.createTextNode) return false;
	// 取得所有引用
	var quotes = document.getElementsByTagName("blockquote");
	// 遍历引用
	for (var i = 0; i < quotes.length; i++) {
		if (!quotes[i].getAttribute("cite")) continue;
	// 保存cite属性
		var url = quotes[i].getAttribute("cite");
	// 取得引用中国所有元素节点
		var quoteChildren = quotes[i].getElementsByTagName('*');
	// 如果没有元素节点，继续循环
		if (quoteChildren.length < 1) continue;
	// 取得引用中最后一个元素节点
		var elem = quoteChildren[quoteChildren.length - 1];
	//创建标记
		var link = document.createElement("a");
		var link_text = document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href", url);
		var superscript = document.createElement("sup");
		superscript.appendChild(link);
		elem.appendChild(superscript);
	}
}

function displayAccessKeys() {
	if (!document.getElementsByTagName || !document.createElement ||
		!document.createTextNode) return false;
	var links = document.getElementsByTagName("a");
	var akeys = new Array();

	for (var i = 0; i < links.length; i++) {
		var current_link = links[i];
		if (!current_link.getAttribute("accesskey")) continue;
		var key = current_link.getAttribute("accesskey");
		var text = current_link.lastChild.nodeValue;
		akeys[key] = text;
	}

	var list = document.createElement("ul");
	
	// 在遍历的时候没有用key，因为发现用key会一直显示3，但上一个程序没有出现
	// 类似情况, 选择重新定义一个变量，因为这样遍历的表达式返回的时数组的下表
	for (var i in akeys) {
		alert(i);
		var text = akeys[i];
		var str = i + ": " + text;
		var item = document.createElement("li");
		var text_item = document.createTextNode(str);
		item.appendChild(text_item);
		list.appendChild(item);
	}
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Accesskeys");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(list)

}