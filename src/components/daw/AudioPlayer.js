// import {Howl} from 'howler';
import * as Pizzicato from 'pizzicato';

export class AudioPlayer {

    constructor(allKeys) {
        this.preloadedAudio = {};
        this.allKeys = allKeys;

        this.currentTimer = null;
    }

    resumeContext() {
        Pizzicato.context.resume();
    }

    // initializeNotes() {
    //     const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    //     const noteRange = [3, 4];
    //
    //     const allNotes = [];
    //     noteRange.forEach(octave => {notes.forEach(note => {
    //         allNotes.push(note+octave);
    //     })})
    //     allNotes.push("C5")
    //     this.allNotes = allNotes
    // }

    // Loads all named notes for a particular instrument
    loadSoundLibrary(key, src, callback) {
        if (key in this.preloadedAudio) { // Instrument already loaded
            callback(null);
            return;
        }

        // Begin loading each note
        const dir = process.env['PUBLIC_URL'] + "./sounds/" + src + "/"
        let noteMap = {};
        let notesLoaded  = 0;
        var totalNoteCount = this.allKeys.length;
        var errorOccured = false
        var preloadedAudio = this.preloadedAudio

        // Load all notes for given library
        this.allKeys.forEach(namedNote => {
            // TODO -- support for other file types other than mp3?
            const noteDir = dir + namedNote + ".mp3";
            noteMap[namedNote] = new Pizzicato.Sound({
                source: 'file',
                options: { path: noteDir }
            }, function(error) {
                if (error) { // Process error
                    errorOccured = true;
                    callback(error)
                }
                if (errorOccured) {
                    return;
                }
                notesLoaded += 1
                if (totalNoteCount === notesLoaded) {
                    preloadedAudio[key] = noteMap;
                    callback(null)
                }
            });
        });
    }

    unloadSoundLibrary(key) {
        this.preloadedAudio.delete(key)
    }

    playSingleNote(key, index) {
        const note = this.preloadedAudio[key][this.allKeys[index]];
        note.stop();
        note.play();
    }

    play(key, bpm, noteMap) {
        // var noteMapInverse = this.transposeMatrix(noteMap);
        let delay = this.delayPerBeat(bpm);
        let playedNotes = this.retrievePlayedNotes(noteMap);
        this.recursivePlay(key, playedNotes, delay)
    }

    recursivePlay(key, playedNotes, delay) {
        if (playedNotes.length === 0) {
            this.currentTimer =  null;
            return;
        }

        const notes = playedNotes[0];
        this.playGroup(key, notes)

       this.currentTimer = setTimeout(() => {
           playedNotes.shift()
            this.recursivePlay(key, playedNotes, delay)
        }, delay)
    }

    playGroup(key, indices) {
        let groupItems = [];
        indices.forEach(index=>{
            const note = this.preloadedAudio[key][this.allKeys[index]];
            groupItems.push(note);
        });

        let group = new Pizzicato.Group(groupItems);
        group.stop();
        group.play();
    }

    stop() {
        this.currentTimer = null;
    }

    // BPM = Beats per minute
    // 100 BPM = 100 Beats per 60 seconds = 60/100 = 0.6 seconds delay per beat = 0.6/4 = 0.15 seconds delay per
    // 16th note
    delayPerBeat(bpm) {
        return (60/bpm)/4 * 1000
    }

    retrievePlayedNotes(m){
        let playedIndices = []
        for (let j = 0; j < m[0].length; j++) {
            let indices = [];
            for (let i = 0; i < m.length; i++) {
                if (m[i][j]) {
                    indices.push(i);
                }
            }
            playedIndices.push(indices);
        }
        return playedIndices;
    }
}