
	
"use strict"

var task = {}
var stask
var rettask
var id

document.addEventListener("DOMContentLoaded", function(event) {
  checkLocalStorage()
})

document.addEventListener("submit",  function getContents() {
		event.preventDefault();
		let input = document.querySelector("input[type=text]")
		if (!input.value) {
			return
		} else {
			appendListLine() 
			addToLocalStorage(input.value)
			appendContent(id, input.value)
			input.value = ""
		}
});

document.addEventListener("click", function completeRemoveTask() {
		let target = event.target
		if (target.className == "complete") {
			var completedlistitem = target.parentNode
			completedlistitem.classList.add("completed")
			let btns = completedlistitem.querySelectorAll("button")
			for (var i = 0; i < btns.length; i++) {
				btns[i].setAttribute("hidden", "")
			}
		}
		if (target.className == "delete") {
			var listitem = target.parentNode
			localStorage.removeItem(listitem.dataset.id);			
			listitem.parentNode.removeChild(listitem);
			let list = document.querySelector("ul")
			if (list.childNodes.length == 1) {
				list.setAttribute("hidden", "")
			}
		}
})


function appendListLine() {
	var list = document.querySelector("ul")
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

function appendContent(id, inputcontent) {
	let listLine = document.querySelector("ul").lastChild
	listLine.dataset.id = id
	listLine.querySelector("p").innerHTML = inputcontent
}

function addToLocalStorage (content) {
		task.content = content
		task.status = 'active'
		stask = JSON.stringify(task)
		id = 'task' + (localStorage.length + 1)
		localStorage.setItem(id, stask)
}

function checkLocalStorage() {
	for (var i = 0; i < localStorage.length; i++) {
		rettask = JSON.parse(localStorage.getItem(localStorage.key(i)))
		appendListLine() 
		appendContent(localStorage.key(i), rettask.content)
		rettask = ""
	}
}
