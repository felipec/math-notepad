const {app, BrowserWindow} = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Math Notepad",
        titleBarOverlay: true,
        autoHideMenuBar: true,
        // modal: true,
        frame: true,
        thickFrame: true
    });

    win.loadFile('index.html');
};

app.whenReady().then(() => createWindow());

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
