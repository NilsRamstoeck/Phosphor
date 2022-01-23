import {
   app,
   BrowserWindow,
   screen,
} from 'electron';

app.whenReady().then(() => {
   const { width, height } = screen.getPrimaryDisplay().workAreaSize
   const win = new BrowserWindow({
      width: width,
      height: height,
      x: 0,
      y: 0,
      webPreferences: {
         nodeIntegration: true,
      }
   });
   win.loadFile('./index.html');
})
