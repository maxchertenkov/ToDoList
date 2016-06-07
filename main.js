(function(){
	"use strict"

var task = {}
var stask
var rettask
var id
var idnum = 0

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
			
			var ret = JSON.parse(localStorage.getItem(completedlistitem.dataset.id))
			ret.status = "completed"
			var comptask = JSON.stringify(ret)
			localStorage.setItem(completedlistitem.dataset.id, comptask)
			
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
			let clear = document.querySelector(".clear")
			if (list.childNodes.length == 1) {
				list.setAttribute("hidden", "")
				clear.setAttribute("hidden", "")
			}
		}
		if (target.className == "clearall") {
			localStorage.clear()
			let list = document.querySelector("ul")
			let clear = document.querySelector(".clearall")
			var last;
    		while (last = list.lastChild) list.removeChild(last);
			list.setAttribute("hidden", "")
			clear.setAttribute("hidden", "")
		}
})


function appendListLine() {
	var list = document.querySelector("ul")
	var clear = document.querySelector(".clearall")
	list.removeAttribute("hidden")
	clear.removeAttribute("hidden")
	var t = document.querySelector('template')
	var newline = t.content.cloneNode(true)
	list.insertBefore(newline, list.firstElementChild)
}

function appendContent(id, inputcontent, status) {
	let listLine = document.querySelector("ul").firstElementChild 
	listLine.dataset.id = id
	listLine.querySelector("p").innerHTML = inputcontent
	if (status == "completed") {
		listLine.classList.add("completed")
		let btns = listLine.querySelectorAll("button")
			for (var i = 0; i < btns.length; i++) {
				btns[i].setAttribute("hidden", "")
			}
	}
}

function addToLocalStorage (content) {
		task.content = content
		task.status = 'active'
		stask = JSON.stringify(task)
		idnum = idnum + 1
		id = 'task' + (idnum)
		localStorage.setItem(id, stask)
		localStorage.setItem('currentid', idnum)
}

function checkLocalStorage() {
	for (var i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i).startsWith('task')) {
			rettask = JSON.parse(localStorage.getItem(localStorage.key(i)))
			appendListLine() 
			appendContent(localStorage.key(i), rettask.content, rettask.status)
			rettask = ""
		}
		if (localStorage.key(i) == 'currentid') {
			idnum = +localStorage.getItem(localStorage.key(i))
		}
	}
}


})()
	



