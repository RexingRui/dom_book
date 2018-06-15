//var globalSetTimeout = setTimeout; //不加这一句会setTimeout not defined 报错 
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