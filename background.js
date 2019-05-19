function activate() {
	// TODO: keep only one copy of page.css injected
	chrome.storage.sync.get("narrow_width", items => {
		let w = "normal.css"
		switch (items.narrow_width) {
		case "wide":
			w = "wide.css"
			break
		case "narrow":
			w = "narrow.css"
			break
		}

		inject(w)
			.then(() => inject("page.css"))
			.then(() => inject("page.js"))
	})
}

function inject(file) {
	let fn = file.endsWith(".js") ? chrome.tabs.executeScript : chrome.tabs.insertCSS
	return new Promise((resolve, reject) => {
		fn({file: file}, result => {
			if (chrome.runtime.lastError) {
				let e = `inject err:${chrome.runtime.lastError.message}`
				reject(Error(e))
			} else {
				console.log(`${file} injected`)
				resolve()
			}
		})
	})
}

chrome.browserAction.onClicked.addListener(activate)
