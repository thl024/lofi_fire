import {Howl} from 'howler';

// TODO make this stateful, create a "RunTime" struct that has all of the details needed for running during playback
// runtime struct will update dynamically allowing for playback to change as variables change (like notes or bpm)
export class Audio_player {

    constructor() {
        this.preloadedAudio = {};
        this.typeMap = {};
        this.currentTimer = null;
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
            let sound = new Howl({
                src: [src + namedNote + "." +  fileType],
                onload: () => {
                    if (errorOccured) {
                        return;
                    }

                    noteMap[namedNote] = sound;
                    notesLoaded += 1;

                    if (totalNoteCount === notesLoaded) {
                        preloadedAudio[id] = noteMap;
                        typeMap[id] = "toned";
                        callback(null)
                    }
                },
                onloaderror: (howlId, err) => {
                    if (!errorOccured) { // Process error
                        callback(err)
                        errorOccured = true;
                    }
                }
            });
        });
    }

    loadPercSoundLibrary(id, src, fileType, callback) {
        let sound = new Howl({
            src: [src + "." + fileType],
            onload: () => {
                this.typeMap[id] = "perc";
                this.preloadedAudio[id] = sound;
                callback(null);
            },
            onloaderror: (howlId, err) => {
                callback(err);
            }
        });
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