addLoadEvent(prepareSlideshow);

function prepareSlideshow() {
	// 确保浏览器使用dom方法
	if (!document.getElementsByTagName || !document.getElementById) return false;
	// 确保元素存在
	if (!document.getElementById("linklist")) return false;
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src", "images/flash.jpg");
	preview.setAttribute("alt", "Tank");
	preview.setAttribute("id", "preview");
	slideshow.appendChild(preview);
	var list = document.getElementById("linklist");
	insertAfter(slideshow, list);
	var links = list.getElementsByTagName("a");
	// 为mouseover事件添加动画效果
	links[0].onmouseover = function() {
		moveElement("preview", -190, 0, 10);
	}
	links[1].onmouseover = function() {
		moveElement("preview", -370, 0, 10);
	}
}

function insertAfter(newElement, targetElement) {
	var parent =targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}