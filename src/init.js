// main.js
// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path');
const url = require('url');

require('@electron/remote/main').initialize()
const contextMenu = require('electron-context-menu');
let { fetch } = require('cross-fetch');
const { ElectronBlocker, fullLists, Request } = require('@cliqz/adblocker-electron');
ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
  blocker.enableBlockingInSession(session.defaultSession);
});

("web-contents-created", (e, contents) => {
  contextMenu({
     window: contents,
     showSaveImageAs: true,
     showInspectElement: false
   });
 })


// New Windows Functions
function createNewProductWindow() {
  newProductWindow = new BrowserWindow({
    width: 1020,
    height: 700,
    minWidth: 1280,     
    minHeight:800,
    title: 'SpotFinder',
  
    
   webPreferences: {
  
    webviewTag: true,
nodeIntegration:true,

    
  
   

  }
  });
  newProductWindow.setMenu(null);

  newProductWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../src/munich-interface/settings/config.html'),
    protocol: 'file',
    slashes: true
  }));
  newProductWindow.on('closed', () => {
    newProductWindow = null;
  });
}
// Finish Function

// New Windows Functions
function createNewProductWindow2() {
  newProductWindow2 = new BrowserWindow({
    width: 1020,
    height: 700,
    minWidth: 1280,
    minHeight:800,
    title: 'About',
  
    
   webPreferences: {
    contextIsolation:false,
    webviewTag: true,
nodeIntegration:true,

    
  
   

  }
  });
  newProductWindow2.setMenu(null);

  newProductWindow2.loadURL(url.format({
    pathname: path.join(__dirname, '../src/munich-interface/settings/about.html'),
    protocol: 'file',
    slashes: true
  }));
  newProductWindow2.on('closed', () => {
    newProductWindow2 = null;
  });
}
// Finish Function
// New Windows Functions
function createNewProductWindow3() {
  newProductWindow3 = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight:800,
    title: 'New Window',
  
    
   webPreferences: {
    contextIsolation:true,
    webviewTag: true,
nodeIntegration:true,

    
  
   

  }
  });
  newProductWindow3.setMenu(null);

  newProductWindow3.loadURL(url.format({
    pathname: path.join(__dirname, '/../../functions/index/index.html'),
    protocol: 'file',
    slashes: true
  }));
  newProductWindow3.on('closed', () => {
    newProductWindow3 = null;
  });
}

 contextMenu({
  prepend: (params, WebViewTag) => [
       {
           role: "zoomIn"
       },
       {
          role: "zoomOut"
       },
   ],
 });
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
    
      nodeIntegration: true,
      webviewTag: true,
      contextIsolation: false,
      
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/../src/munich-interface/init/init.html`,)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const isMac = process.platform === 'darwin'

const template = [
  
  {
    label: 'SpotFinder',
    submenu: [
      {
        label: 'Open SpotFinder',
        accelerator: 'Ctrl+S',
        click() {
          createNewProductWindow();
        }

      },
      // Only enable for Iconny Developer Version or mode test 
      // PLease NOT Activate for production
     {
         label: 'DevMode',
      submenu: [
         { role: 'reload' },
         { role: 'forceReload' },
         { role: 'toggleDevTools' },
         { type: 'separator' },
          { role: 'resetZoom' },
       { role: 'zoomIn' },
         { role: 'zoomOut' },
        { type: 'separator' },
           { role: 'togglefullscreen' }
        ]
      },
      {
        label: 'ActionsBasic',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          ...(isMac ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [
                { role: 'startSpeaking' },
                { role: 'stopSpeaking' }
              ]
            }
          ] : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ])
        ]
      },
      {
        label: 'About',
        accelerator: 'Ctrl+M',
        click() {
          createNewProductWindow2();
        }

      },

      {
        label: 'New Window',
        accelerator: 'Ctrl+T',
        click() {
          createNewProductWindow3();
        }

      },

    ]
  },


 

    
  
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)