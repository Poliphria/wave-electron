const { dialog } = require('electron')
const os = require('os')
const path = require('path')
const ytdl = require('ytdl-core')

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

exports.validateURL = (event, args) => {
    return ytdl.validateURL(args)
}