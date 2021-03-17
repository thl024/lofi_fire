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
    loadSoundLibrary(id, src, notes, callback) {
        if (id in this.preloadedAudio) { // Instrument already loaded
            callback(null);
            return;
        }

        // Begin loading each note
        let noteMap = {};
        let notesLoaded  = 0;
        var totalNoteCount = notes.length;
        var errorOccured = false
        var preloadedAudio = this.preloadedAudio


        // Load all notes for given library
        notes.forEach(namedNote => {
            // TODO -- support for other file types other than mp3?
            const noteDir = src + namedNote + ".mp3";
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
                    preloadedAudio[id] = noteMap;
                    callback(null)
                }
            });
        });
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