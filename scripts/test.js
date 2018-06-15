
window.onload = function() {
	var para = document.createElement("p");
	var txt = document.createTextNode("Hello World");
	para.appendChild(txt);
	var testdiv = document.getElementById("testdiv");
	testdiv.appendChild(para);
}

var placeholder = document.createElement("img");
placeholder.setAttribute("id", "placeholder");
placeholder.setAttribute("src", "imges/orignal.jpg");
placeholder.setAttribute("alt", "my img gallery");
var desciption = document.createElement("p");
desciption.setAttribute("id", "desciption");
var desctext = document.createTextNode("Choose an image");
desciption.appendChild(desctext);
var gallery = document.getElementById("imagegallery");
gallery.parentNode.insertBefore(placeholder, gallery);


//编写insertAfter函数

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}