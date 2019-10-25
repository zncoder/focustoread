function activate() {
	let el = elementSelected()
	if (el) {
		restore(el)
	}
	selectElement()
}

function elementSelected() {
	return document.querySelector(".narrow_5cimvxq")
}

function restore(el) {
	el.classList.remove("narrow_5cimvxq")
}

function selectElement() {
	let div = document.createElement("div")
	div.id = "banner_5cimvxq"
	let p = document.createElement("p")
	p.id = "p_5cimvxq"
	let span = document.createElement("span")
	span.id = "span_5cimvxq"
	span.innerHTML = "<b>Click</b> to focus main area; Highlight area, then <b>Ctrl-click</b> to focus, <b>Alt-click</b> to remove, <b>Shift-click</b> to widen; Press any key to cancel"
	p.appendChild(span)
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
	// click: highlight main element
	// ctrl-click: highlight selected element
	// shift-click: widen selected element
	// alt-click: remove selected element
	if (ev.button != 0) {
		return
	}

	let el = ev.target
	if (ev.altKey) {
		el.parentNode.removeChild(el)
		return
	}
	
	if (!ev.ctrlKey) {
		el = findMain()
		if (!el) {
			return
		}
	}

	if (ev.shiftKey) {
		widen(el)
	} else {
		narrow(el)
	}
	deactivate()
}

function narrow(el) {
	restore(el)
	el.classList.add("narrow_5cimvxq")
}

function widen(el) {
	restore(el)
	el.style.width = "100%"
	el.style.maxWidth = "100%"
	document.body.innerHTML = ""
	document.body.appendChild(el)
}

function findMain() {
	let el = document.elementFromPoint(window.innerWidth/2, window.innerHeight/2)
	let threshold = document.body.scrollHeight * 60 / 100
	while (el && el !== document.body) {
		let h = el.scrollHeight
		if (h >= threshold) {
			return el
		}
		el = el.parentElement
	}
	return null
}

activate()
