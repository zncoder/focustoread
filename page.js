function activate() {
	let el = elementSelected()
	if (el) {
		restore(el)
	}
	selectElement()
}

function elementSelected() {
	return document.querySelector(".focus_5cimvxq")
}

function restore(el) {
	el.classList.remove("focus_5cimvxq")
}

function selectElement() {
	let div = document.createElement("div")
	div.id = "banner_5cimvxq"
	let p = document.createElement("p")
	p.id = "p_5cimvxq"
	p.innerText = "Move mouse to select; Alt-click to remove; Click to focus; Press any key to cancel"
	div.appendChild(p)
	document.body.appendChild(div)

	document.body.classList.add("grab_5cimvxq")
	document.addEventListener("click", onClick)
	document.addEventListener("keyup", onKeyUp)
	document.addEventListener("mouseover", onMouseOver)
	document.addEventListener("mouseout", onMouseOut)
}

function deactivate() {
	let el = document.querySelector(".highlight_5cimvxq")
	if (el) {
		highlightElement(el, false)
	}

	document.body.classList.remove("grab_5cimvxq")
	let div = document.querySelector("#banner_5cimvxq")
	if (div) {
		div.parentNode.removeChild(div)
	}
	
	document.removeEventListener("click", onClick)
	document.removeEventListener("keyup", onKeyUp)
	document.removeEventListener("mouseover", onMouseOver)
	document.removeEventListener("mouseout", onMouseOut)
}

function onMouseOver(ev) {
	highlightElement(ev.target, true)
}

function onMouseOut(ev) {
	highlightElement(ev.target, false)
}

function highlightElement(el, set) {
	if (set) {
		el.classList.add("highlight_5cimvxq")
	} else {
		el.classList.remove("highlight_5cimvxq")
	}
}

function onKeyUp(ev) {
	deactivate()
}

function onClick(ev) {
	// click: highlight element
	// alt-click: remove element
	if (ev.button != 0) {
		return
	}

	let el = ev.target
	if (ev.altKey) {
		el.parentNode.removeChild(el)
		return
	}
	
	el.classList.add("focus_5cimvxq")
	deactivate()
}

activate()
