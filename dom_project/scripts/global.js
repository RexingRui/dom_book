
addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent (preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
// onload 加载函数
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

// 在元素节点后插入元素节点，与insertBefore相反
function insertAfter (newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

//当前链接高亮函数
function highlightPage() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var headers = document.getElementsByTagName("header")
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for (var i = 0; i < links.length; i++) {
		linkurl = links[i].getAttribute("href");
		if (window.location.href.indexOf(linkurl) != -1) {
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id", linktext);
		}
	}
}

//移动元素通用函数
var globalSetTimeout = setTimeout; //不加这一句会setTimeout not defined 报错 
function moveElement(elementID, final_x, final_y, interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	//防止动画滞后，当立即清除正在执行的函数
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dist = 0;
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if (xpos < final_x) {
		dist = Math.ceil((final_x-xpos)/10)
		xpos += dist;
	}
	if (xpos > final_x) {
		dist = Math.ceil((xpos-final_x)/10)
		xpos -= dist;
	}
	if (ypos < final_y) {
		dist = Math.ceil((final_y-ypos)/10)
		ypos += dist;
	}
	if (ypos > final_y) {
		dist = Math.ceil((ypos-final_y)/10)
		ypos -= dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	//此处用字符串拼接，两个冒号内的为字符串，通过+拼接在一起
	var repeat = "moveElement('"+elementID+"', "+final_x+", "+final_y+", "+interval+")";
	movement = setTimeout(repeat, interval);
}

//移动图片
function prepareSlideshow() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");
	//保证动画只在小窗口中出现
	var frame = document.createElement("img");
	frame.setAttribute("src", "images/frame.gif");
	frame.setAttribute("alt", "");
	frame.setAttribute("id", "frame");
	slideshow.appendChild(frame);
	var preview = document.createElement("img");
	preview.setAttribute("src", "images/slideshow.gif");
	preview.setAttribute("alt", "what I want");
	preview.setAttribute("id", "preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow, intro);
	var links = document.getElementsByTagName("a");
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover = function() {
			destination = this.getAttribute("href");
			if (destination.indexOf('index.html') != -1) {
				moveElement("preview",0,0,5);
			}
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview",-150,0,5);
			}
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview",-300,0,5)
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview",-450,0,5)
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview",-600,0,5)
			}
		}
	}
}

//显示与隐藏文章段落
function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for ( var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if (!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId; //让局部变量成为属性，扩大其作用域
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}

	}
}

// 展示照片
function showPic(whichpic) {
	if (!document.getElementById("placeholder")) return true;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	if (!document.getElementById("description")) return false;
	if (whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");
	} else {
		var text = "";
	}
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = text;
	}
	return false;
}


function preparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "images/photos/placeholder.gif");
	placeholder.setAttribute("alt", "The key");
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description, gallery);
	insertAfter(placeholder,description);
}

function prepareGallery() {
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this);
		}
	}

}

//表格处理
function stripeTables () {
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for (var i = 0; i < tables.length; i++) {
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for (var j = 0; j < rows.length; j++) {
			if (odd == true) {
				addClass(rows[j], "odd");
				odd = false;
			} else {
				odd = true;
			}
		}
	}

}

function highlightRows() {
	if (!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function() {
			addClass(this, "highlight");
		}
		rows[i].onmouseout = function() {
			this.className = this.oldClassName;
		}
	}
}

function addClass(element, value) {
	if (!element.className) {
		element.className =  value;
	} else {
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}
