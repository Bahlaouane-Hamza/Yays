/**
 * Created by hamza on 7/18/15.
 */
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var path = require('path');

var Tray = require('tray');
var events = require('events');
var fs = require('fs');
var globalShortcut = require('global-shortcut');
var clipboard = require('clipboard');


var express = require('express');
var webapp = express();
var http = require('http').Server(webapp);

// load locallydb
var locallydb = require('locallydb');

// load the database (folder) in './mydb', will be created if doesn't exist
var db = new locallydb(path.join(app.getPath('appData'), 'yt-database-links'));

// load the collection (file) in './mydb/monsters', will be created if doesn't exist
global.collection = db.collection('links');

global.alertIcon = path.join(__dirname, 'app/images/alert.png');

global.app = app;

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;


// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {

  // Register a 'ctrl+x' shortcut listener.
  var ret = globalShortcut.register('cmd+g', function() {
    console.log('cmd+g is pressed');
    console.log(clipboard.readText('selection'));
    var url = clipboard.readText('selection');
    mainWindow.webContents.executeJavaScript("addNewURL('"+url+"');");
  });

  if (!ret) {
    console.log('registration failed');
  }


  if (app.dock) app.dock.hide();

  var iconPath = path.join(__dirname, '/app/images/Icon.png');
  if (!fs.existsSync(iconPath)) iconPath = path.join(__dirname, '/app/imagesIconTemplate.png'); // default cat icon

  var electronScreen = require('screen');
  var cachedBounds; // cachedBounds are needed for double-clicked event

  appTry = new Tray(iconPath);
  appTry.setToolTip("Youtube Music Player");
  appTry
    .on('clicked', clicked);

  createWindow(false);

  function clicked (e, bounds) {
    if (mainWindow && mainWindow.isVisible()) return hideWindow();

    // workarea takes the taskbar/menubar height in consideration
    var size = electronScreen.getDisplayNearestPoint(electronScreen.getCursorScreenPoint()).workArea;

    if (bounds) cachedBounds = bounds;

    // ensure bounds is an object
    bounds = bounds || {x:0,y:0};

    // bounds may not be populated on all OSes
    if (bounds.x === 0 && bounds.y === 0) {
      // default to bottom on windows
      if (process.platform === 'win32') bounds.y = size.height - 594;
      bounds.x = size.width + size.x - (340 / 2); // default to right
      cachedBounds = bounds;
    }



    showWindow(bounds);
  }

  function showWindow (trayPos) {
    var x =  Math.floor(trayPos.x - ((340 / 2) || 200) + (trayPos.width / 2));
    var y = trayPos.y;
    if (!mainWindow) {
      createWindow(true, x, y)
    }

    if (mainWindow) {
      mainWindow.show();
      //mainWindow.openDevTools();
      mainWindow.setPosition(x, y);
    }
  }

  function hideWindow () {
    if (!mainWindow) return;
    mainWindow.hide();
  }

  function createWindow (show, x, y) {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      show: show,
      width: 340,
      height: 594,
      resizable : false,
      frame: false,
      'always-on-top': false,
      'web-preferences': {
        'web-security': true,
        'plugins': true ,
        'overlay-fullscreen-video': true
      }
    });

    if (show) {
      mainWindow.setPosition(x, y);
    }

    // Open the devtools.
    mainWindow.openDevTools();

    // and load the index.html of the app.
    mainWindow.loadUrl('http://127.0.0.1:3000');

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });

  }

});





webapp.use('/vendor', express.static(__dirname +'/vendor'));
webapp.use('/stylesheets', express.static(__dirname +'/app/stylesheets'));
webapp.use('/scripts', express.static(__dirname +'/app/scripts'));
webapp.use('/images', express.static(__dirname +'/app/images'));


webapp.get('/', function (req, res) {
  res.sendfile(__dirname + '/app/index.html');
});



var server = http.listen(3000, '127.0.0.1', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
