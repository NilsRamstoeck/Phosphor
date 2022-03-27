import { contextBridge, ipcRenderer } from 'electron';
import {connectToServer, connectToUser, sendMessage} from './tcp';

contextBridge.exposeInMainWorld('theme', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  get: () => ipcRenderer.invoke('theme:get'),
  onupdated: (handler: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on('theme-updated', handler),
})

contextBridge.exposeInMainWorld('socket', {
   connectToUser: async (username :string) => connectToUser(username),
   connectToServer: () => connectToServer(),
   sendMessage: (data: string) => sendMessage(data)
})
