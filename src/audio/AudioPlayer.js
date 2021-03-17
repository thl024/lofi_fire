// import {Howl} from 'howler';
import * as Pizzicato from 'pizzicato';

export class AudioPlayer {

    constructor() {
        this.preloadedAudio = {};
        this.currentTimer = null;
    }

    resumeContext() {
        Pizzicato.context.resume();
    }

    // Loads all named notes for a particular instrument
    loadSoundLibrary(id, src, instType, fileType, notes, callback) {
        if (id in this.preloadedAudio) { // Instrument already loaded
            callback(null);
            return;
        }

        switch (instType) {
            case "toned": this.loadNotedSoundLibrary(id,  src, fileType, notes, callback); break;
            case "perc": this.loadPercSoundLibrary(id, src, fileType, callback); break;
        }
    }

    loadNotedSoundLibrary(id, src, fileType, notes, callback) {
        // Begin loading each note
        let noteMap = {};
        let notesLoaded = 0;
        let totalNoteCount = notes.length;
        let errorOccured = false;
        let preloadedAudio = this.preloadedAudio;

        // Load all notes for given library
        notes.forEach(namedNote => {
            noteMap[namedNote] = new Pizzicato.Sound({
                source: 'file',
                options: { path: src + namedNote + "." +  fileType }
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
                    preloadedAudio[id] = noteMap;
                    callback(null)
                }
            });
        });
    }

    loadPercSoundLibrary(id, src, fileType, callback) {
        this.preloadedAudio[id] = new Pizzicato.Sound({
            source: 'file',
            options: { path: src + fileType }
        }, function(error) {
            if (error) {
                callback(error)
                return;
            }
            callback(null);
        })
    }

    unloadSoundLibrary(id) {
        this.preloadedAudio.delete(id)
    }

    playSample(id, note) {
        const sample = this.preloadedAudio[id][note];
        sample.stop();
        sample.play();
    }

    playSampleSequence(delay, sequence) {
        if (this.currentTimer) {
            this.stop()
        }

        this.recursivePlay(sequence, delay)
    }

    recursivePlay(sequence, delay) {
        if (sequence.length === 0) {
            this.currentTimer =  null;
            return;
        }

        const notes = sequence[0];
        this.playGroup(notes)

        this.currentTimer = setTimeout(() => {
           sequence.shift()
           this.recursivePlay(sequence, delay)
        }, delay)
    }

    playGroup(indices) {
        for (const [id, notes] of Object.entries(indices)) {
            notes.forEach(namedNote=> this.playSample(id, namedNote));
        }
    }

    stop() {
        if (this.currentTimer) {
            clearTimeout(this.currentTimer)
            this.currentTimer = null;
        }

        for (const [, notes] of  Object.entries(this.preloadedAudio)) {
            for (const [, note] of Object.entries(notes)) {
                note.stop();
            }
        }
    }
}