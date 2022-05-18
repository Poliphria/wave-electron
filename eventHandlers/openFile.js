const { dialog } = require('electron')
const os = require('os')
const path = require('path')

exports.openFile = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        defaultPath: path.join(os.homedir() + '/Downloads'),
        properties: ['openFile'], 
        filters: [
            { name: 'Audio', extensions: ['mp3', 'm4a', 'aiff', 'wav', 'flac']}
        ]
    })
      if (canceled) {
          return;
      } else {
          return filePaths[0]
      }
}