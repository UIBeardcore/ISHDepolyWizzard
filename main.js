'use strict';

const electron = require('electron')
// Module to control application life.
const app = electron.app
const ipcMain = electron.ipcMain
const dialog = electron.dialog; 

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const FS = require('fs');

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600, 
    height: 600,
    center: true,
    resizable: false,
    title: "ISHDeploy SandBox"
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Disable menu bar
  mainWindow.setMenu(null);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Emitted when required event is fired
  ipcMain.on('powershell-script-save', (event, arg) => {

    const fileName = 'ish-wizzard'

    //console.log("event -"  + event);
    //console.log("arg -"  + arg);

    let filecontent = arg;

    //console.log("content before -"  + filecontent);

    dialog.showSaveDialog(
        (fileName) => {

          console.log("content -"  + filecontent);

          if (fileName === undefined)
            return;

          FS.writeFile(
            fileName, 
            filecontent, 
            (err) => {   
                if (!err) 
                {
                  dialog.showMessageBox({ message: "The file has been saved.", buttons: ["OK"] });
                } 
                else 
                {
                  dialog.showErrorBox("File Save Error", err.message);
                }
            });
        }
      ); 

    //console.log(arg);  // prints "ping"
    //event.sender.send('powershell-script-save', 'pong');
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
