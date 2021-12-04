// const path = require("path")
// const url = require("url")

// const { app, BrowserWindow } = require("electron")
// const isDev = require("electron-is-dev")

// function createWindow() {
//   // Create the browser window.
//   let win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//     },
//   })

//   // and load the index.html of the app.
//   // win.loadFile("index.html");
//   console.log(__dirname)

//   win.loadURL(
//     isDev
//       ? "http://localhost:3000"
//       : url.format({
//           pathname: path.join(__dirname, "index.html"),
//           protocol: "file:",
//           slashes: true,
//         })
//   )
//   // Open the DevTools.
//   if (isDev) {
//     win.webContents.openDevTools({ mode: "detach" })
//   }

//   win.on("closed", () => (win = null))
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow)

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit()
//   }
// })

// app.on("activate", () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow()
//   }
// })

const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require("path")
const isDev = require("electron-is-dev")

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 })
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  )
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools()
  }
  mainWindow.on("closed", () => (mainWindow = null))
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})
