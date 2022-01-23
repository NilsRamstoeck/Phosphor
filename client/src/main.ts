import {
   app,
   BrowserWindow,
   Menu,
   MenuItem,
   screen,
} from 'electron';

app.whenReady().then(() => {
   const { width, height } = screen.getPrimaryDisplay().workAreaSize
   const win = new BrowserWindow({
      width: width/2,
      height: height/2,
      minWidth: width/2,
      minHeight: height/2,
      center: true,
      webPreferences: {
         nodeIntegration: true,
      }
   });
   win.loadFile('./index.html');

   const menu = new Menu();
   menu.append(new MenuItem({
      label: 'File',
      submenu: [
         {
            label: 'Toggle Developer Tools',
            accelerator: 'ctrl+shift+i',
            click: () => {BrowserWindow.getFocusedWindow().toggleDevTools()}
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
})
