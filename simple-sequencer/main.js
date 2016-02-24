'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');

var browserWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  browserWindow = new BrowserWindow({width: 520, height: 200});

  browserWindow.loadURL('file://' + __dirname + '/index.html');

  browserWindow.on('closed', function() {
    browserWindow = null;
  });
});
