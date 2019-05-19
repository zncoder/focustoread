function saveOptions() {
	let el = document.querySelector("input[name=narrow_width]:checked")
	if (el) {
		chrome.storage.sync.set({narrow_width: el.value}, () => window.close())
	}
}

document.querySelector("#save").addEventListener("click", saveOptions)
