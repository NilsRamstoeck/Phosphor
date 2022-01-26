import {
   app,
   BrowserWindow,
   ipcMain,
   Menu,
   MenuItem,
   nativeTheme,
   screen,
} from 'electron';

import path from 'path';

//hot reload
try {
  require('electron-reloader')(module)
} catch (_) {}

let mainWindow: BrowserWindow;
function createWindow () {
   const width = 900 + 300, height = 600;
   // Create the browser window.
   mainWindow = new BrowserWindow({
      width: width,
      height: height,
      minWidth: width,
      minHeight: height,
      center: true,
      webPreferences: {
         nodeIntegration: true,
         // contextIsolation: false,
         preload: path.join(__dirname, 'preload.js')
      }
   });

   const menu = new Menu();
   menu.append(new MenuItem({
      label: 'File',
      submenu: [
         {
            label: 'Toggle Developer Tools',
            accelerator: 'ctrl+shift+i',
            click: () => {BrowserWindow.getFocusedWindow().webContents.toggleDevTools()}
         },         {
            label: 'Reload',
            accelerator: 'f5',
            click: () => {BrowserWindow.getFocusedWindow().reload()}
         },
         {
            label: 'Exit',
            accelerator: 'esc',
            click: () => { app.quit() }
         },
      ]
   }));

   Menu.setApplicationMenu(menu);

   // and load the index.html of the app.
   mainWindow.loadFile(path.join(__dirname, './index.html'))

   // Emitted when the window is closed.
   mainWindow.on('closed', function () {
      mainWindow = null
   })

   mainWindow.webContents.toggleDevTools();
}

app.on('ready', async () => {
   createWindow();
})

app.on('window-all-closed', function () {
   if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
   if (mainWindow === null) createWindow()
})

ipcMain.handle('dark-mode:toggle', () => {
   if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
   } else {
      nativeTheme.themeSource = 'dark'
   }
   return nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
})

ipcMain.handle('theme:get', () => {
   return nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
})

nativeTheme.addListener("updated", function(){
   console.log('updated');
   mainWindow.webContents.send('theme-updated', nativeTheme.shouldUseDarkColors ? 'dark' : 'light');
});
