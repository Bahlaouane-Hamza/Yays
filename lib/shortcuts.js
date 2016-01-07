var globalShortcut = require('global-shortcut');

exports.init = function(window) {
    globalShortcut.register('mediaplaypause', function() {
        window.webContents.send('playpause');
    });

    globalShortcut.register('medianexttrack', function() {
        window.webContents.send('nexttrack');
    });

    globalShortcut.register('mediaprevioustrack', function() {
        window.webContents.send('previoustrack');
    });
};