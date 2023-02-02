const { dialog } = require('electron')
const os = require('os')
const path = require('path')
const {promises: { readFile }} = require("fs")

exports.openFile = async () => {
    try {
        // Dialog to open file through main process as opposed to renderer. 
        const { canceled, filePaths } = await dialog.showOpenDialog({
            defaultPath: path.join(os.homedir() + '/Downloads'),
            properties: ['openFile'],
            filters: [
                { name: 'Audio', extensions: ['mp3', 'm4a', 'wav', 'flac',] }
            ]
        })
        if (canceled) {
            console.log('File upload cancelled');
            return;
        }
        // get filepath from returned array from file dialog
        const filePath = filePaths[0]
        console.log('Event handler: ', filePath)

        // read file contents from file path
        const fileContents = await readFile(filePath)
        console.log("File Contents as buffer: ", fileContents.buffer)

       return fileContents.buffer
    } catch (err) {
        console.error(err)
    }
}