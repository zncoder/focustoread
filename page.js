function action() {
	let el = elementSelected()
	if (el) {
		restore(el)
	} else {
		selectElement()
	}
}

function elClass() {
	return "focus_5cimvxq"
}

function elementSelected() {
	return document.querySelector("."+elClass())
}

function restore(el) {
	el.classList.remove(elClass())
}

function selectElement() {
	document.addEventListener("click", onClick)
	document.addEventListener("mouseover", onMouseOver)
	document.addEventListener("mouseout", onMouseOut)
}

function onMouseOver(ev) {
	highlightElement(ev.target, true)
}

function onMouseOut(ev) {
	highlightElement(ev.target, false)
}

function setBgColor(c) {
	// Note: cannot use var or let because page.js may be injected multiple times
	document.body.setAttribute("bgcolor_5cimvxq", c)
}

function getBgColor() {
	return document.body.getAttribute("bgcolor_5cimvxq")
}

function removeBgColor() {
	document.body.removeAttribute("bgcolor_5cimvxq")
}

function highlightElement(el, set) {
	if (set) {
		setBgColor(el.style.backgroundColor)
		el.style.backgroundColor = "#FDFF47"
	} else {
		let c = getBgColor()
		if (typeof c === "string") {
			el.style.backgroundColor = c;
			removeBgColor()
		}
	}
}

function onClick(ev) {
	if (ev.button != 0) {
		return
	}

	let el = ev.target
	el.classList.add(elClass())

	highlightElement(el, false)
	document.removeEventListener("click", onClick)
	document.removeEventListener("mouseover", onMouseOver)
	document.removeEventListener("mouseout", onMouseOut)
}

action()
