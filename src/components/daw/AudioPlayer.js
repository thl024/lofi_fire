import * as Pizzicato from 'pizzicato'

export class AudioPlayer {

    constructor() {
        this.notes = ["A", "Ab", "B", "Bb", "C", "D", "Db", "E", "Eb", "F", "G", "Gb"];
        this.noteRange = [3, 4];

        this.preloadedAudio = {};
    }

    // Loads all named notes for a particular instrument
    loadSoundLibrary(key, src, callback) {
        if (key in this.preloadedAudio) { // Instrument already loaded
            callback(null);
            return;
        }

        // Begin loading each note
        const dir = process.env['PUBLIC_URL'] + "/sounds/" + src + "/"
        let noteMap = {};
        let notesLoaded  = 0;
        var totalNoteCount = this.notes.length * this.noteRange.length;
        var errorOccured = false

        // Load all notes for given library
        this.notes.forEach(note => this.noteRange.forEach(octave => {
            // TODO -- support for other file types other than mp3?
            const namedNote = note + octave;
            const noteDir = dir + namedNote + ".mp3";
            noteMap[namedNote] = new Pizzicato.Sound(noteDir, function(error) { // On load
                if (error && !errorOccured) {
                    callback(error);
                    errorOccured = true;
                }

                if (errorOccured) {
                    return;
                }

                notesLoaded += 1
                if (notesLoaded === totalNoteCount) { // Loaded all notes
                    callback(null);
                }
            })
        }));
        this.preloadedAudio[key] = noteMap;
    }

    unloadSoundLibrary(instrument) {

    }

    playSingleNote(instrument, namedNote) {

    }

}