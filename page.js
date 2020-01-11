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

let tip = `<div class="action_5cimvxq">Click</div>
<div class="desc_5cimvxq">Focus main area</div>
<div class="action_5cimvxq">Ctrl-Click</div>
<div class="desc_5cimvxq">Focus highlighted area</div>
<div class="action_5cimvxq">Alt-Click</div>
<div class="desc_5cimvxq">Remove highlighted area</div>
<div class="action_5cimvxq">Shift-Click</div>
<div class="desc_5cimvxq">Widen highlighted area</div>
<div class="action_5cimvxq">Any key</div>
<div class="desc_5cimvxq">Cancel</div>`

function selectElement() {
	let div = document.createElement("div")
	div.id = "banner_5cimvxq"
	div.innerHTML = tip
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
	while (el) {
		let h = el.scrollHeight
		if (h >= threshold || el === document.body) {
			return el
		}
		el = el.parentElement
	}
	return null
}

function handleMessage(req, sender, sendResponse) {
	switch (req.op) {
	case "activate":
		deactivate()
		activate()
		break
	default:
		console.log(`unknown req:${req}`)
		break
	}
	sendResponse({})
}

chrome.runtime.onMessage.addListener(handleMessage)
