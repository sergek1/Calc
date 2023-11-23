const { app, BrowserWindow } = require('electron')
const { exec } = require('child_process')
const path = require('path')
const isDev = require('electron-is-dev')
const log = require('electron-log/main') 

let javaProcess


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 910,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile(path.join(__dirname, 'index.html'))
}

function StartJavaProcess () {
  const jarname = 'SmartCalc-0.0.1-SNAPSHOT.jar'
  let jarPath
  if (isDev) {
    jarPath = path.join(__dirname, jarname)
    console.log(jarPath)
  } else {
    jarPath = path.join(process.resourcesPath, 'libraries', jarname)
    console.log(jarPath)
  }

  javaProcess = exec(
    `java -Djava.library.path=${path.dirname(
      jarPath
    )} -DfromElectron=true -jar ${jarPath}`,
    { windowsHide: true, shell: true },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
    }
  )
}

app.whenReady().then(() => {
  StartJavaProcess()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    if (javaProcess) javaProcess.kill() 
  }
})
