async function activate() {
	try {
		await sendMessage({op: "activate"})
		console.log("activate")
	} catch (e) {
		let width = await getWidth()
		await Promise.all([width+".css", "page.css", "page.js"].map(x => inject(x)))
		console.log("injected")
		await sendMessage({op: "activate"})
		console.log("now activate")
	}
}

async function getWidth() {
	let items = await new Promise(resolve => chrome.storage.sync.get("narrow_width", x => resolve(x)))
	switch (items.narrow_width) {
	case "wide":
	case "narrow":
		return items.narrow_width
	default:
		return "normal"
	}
}

function currentTab() {
	return new Promise(resolve => chrome.tabs.query({
		currentWindow: true,
    active: true
	}, tabs => resolve(tabs[0])))
}

async function sendMessage(msg) {
	let tab = await currentTab()
	return new Promise((resolve, reject) => {
		chrome.tabs.sendMessage(tab.id, msg, result => resolveResult(result, resolve, reject))
	})										 
}

function resolveResult(result, resolve, reject) {
	if (chrome.runtime.lastError) {
		reject(Error(`err result:${chrome.runtime.lastError.message}`))
	} else {
		resolve(result)
	}
}

function inject(file) {
	let fn = file.endsWith(".js") ? chrome.tabs.executeScript : chrome.tabs.insertCSS
	return new Promise((resolve, reject) => {
		fn({file: file}, () => resolveResult(true, resolve, reject))
	})
}

chrome.browserAction.onClicked.addListener(activate)
