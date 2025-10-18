const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs'); // Imports File System

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  require('./backend/server');
  createWindow();
});


ipcMain.handle('generate-pdf', async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);

  const { canceled, filePath } = await dialog.showSaveDialog(win, {
    title: 'Guardar Cotización en PDF',
    defaultPath: `cotizacion-${Date.now()}.pdf`,
    filters: [
      { name: 'PDF Documents', extensions: ['pdf'] }
    ]
  });

  if (canceled || !filePath) {
    return { ok: false, message: 'Guardado cancelado.' };
  }

  try {
    const pdfData = await win.webContents.printToPDF({
      pageSize: 'A4',
      printBackground: true,
      marginsType: 1 
    });

    fs.writeFileSync(filePath, pdfData);

    return { ok: true, path: filePath };

  } catch (error) {
    console.error('Error al generar PDF:', error);
    return { ok: false, message: `Error: ${error.message}` };
  }
});