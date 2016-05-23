"use strict"

document.addEventListener("submit",  function getContents() {
		event.preventDefault();
		let input = document.querySelector("input[type=text]")
		appendListLine() 
		appendContent(input.value)
		input.value = ""
})

function appendListLine() {
	let list = document.querySelector("ul")
	list.removeAttribute("hidden")
	var li = document.createElement("li");
	var p = document.createElement("p");
	var btn1 = document.createElement("button");
	var btn2 = document.createElement("button");
	list.appendChild(li)
	li.appendChild(p)
	li.appendChild(btn1)
	li.appendChild(btn2)
	btn1.classList.add("complete")
	btn1.innerHTML = "&#10003;"
	btn2.classList.add("delete")
	btn2.innerHTML = "&#10006;"
}

function appendContent(inputcontent) {
	let listLine = document.querySelector("ul").lastChild
	listLine.querySelector("p").innerHTML = inputcontent
}
