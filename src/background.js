console.log("The extension's index page is: ", browser.runtime.getURL('/index.html'))

browser.tabs.onUpdated.addListener((...args) => {
  console.log("tabs.onUpdated:", ...args)
})
