import { contextBridge, ipcRenderer } from 'electron';
import crypto from './crypto';

contextBridge.exposeInMainWorld('theme', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  get: () => ipcRenderer.invoke('theme:get'),
  onupdated: (handler: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on('theme-updated', handler),
})

contextBridge.exposeInMainWorld('pcrypt', crypto);
