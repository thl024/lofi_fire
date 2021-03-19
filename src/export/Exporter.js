import { saveAs } from 'file-saver';
var pako = require('pako')

export class Exporter {
    static exportData(data) {
        let d = JSON.stringify(data)
        let compressed = "";
        try {
            compressed = pako.deflate(d);
        } catch (err) {
            console.log(err);
        }

        // TODO write to file
        var blob = new Blob([compressed], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "blah.lff")
    }
}