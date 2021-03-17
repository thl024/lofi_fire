// import {Howl} from 'howler';
import * as Pizzicato from 'pizzicato';

export class AudioPlayer {

    constructor() {
        this.preloadedAudio = {};
        this.typeMap = {};
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
        let typeMap = this.typeMap;

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
                    typeMap[id] = "toned";

                    callback(null)
                }
            });
        });
    }

    loadPercSoundLibrary(id, src, fileType, callback) {
        let typeMap = this.typeMap;

        this.preloadedAudio[id] = new Pizzicato.Sound({
            source: 'file',
            options: { path: src + "." + fileType }
        }, function(error) {
            if (error) {
                callback(error)
                return;
            }
            typeMap[id] = "perc";
            callback(null);
        })
    }

    unloadSoundLibrary(id) {
        this.preloadedAudio.delete(id);
        this.typeMap.delete(id);
    }

    playSample(id, note) {
        let sample;
        if (this.typeMap[id] === "perc") {
            sample = this.preloadedAudio[id];
        } else {
            sample = this.preloadedAudio[id][note];
        }
        sample.stop();
        sample.play();
    }

    playSampleSequence(delay, sequence, callback) {
        if (this.currentTimer) {
            this.stop();
        }

        // Play forever until user stops (ending current timer)
        this.recursivePlay([...sequence], sequence, delay, callback);
    }

    recursivePlay(fullSequence, tempSequence, delay, callback) {
        if (tempSequence.length === 0) {
            // Repeat sequence
            tempSequence = [...fullSequence];
        }

        const notes = tempSequence[0];
        this.playGroup(notes)

        this.currentTimer = setTimeout(() => {
            tempSequence.shift()

            // Notify that one tick has passed
            callback(fullSequence.length - tempSequence.length);

            this.recursivePlay(fullSequence, tempSequence, delay, callback)
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

        for (const [id, notes] of  Object.entries(this.preloadedAudio)) {
            if (this.typeMap[id] === "perc") {
                notes.stop();
            } else {
                for (const [, note] of Object.entries(notes)) {
                    note.stop();
                }
            }
        }
    }
}