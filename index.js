const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Necesario si usás nodeIntegration
    }
  })

  win.loadFile(path.join(__dirname, 'dist', 'index.html'))
  win.webContents.openDevTools() // Para ver errores de consola
}

app.whenReady().then(createWindow)
