import {audio_metadata} from "../audio_metadata";
import {getAudio} from "../../utils/network";
import {_base64ToArrayBuffer} from "../../utils/utils";

export class AudioPlayer {

    constructor() {
        this.preloadedAudio = {};
        this.typeMap = {};

        // Play state contains currentTimer, current delay, and current sequence
        this.playState = {
            currentTimer: null,
            delay: -1,
            sequence: null
        };

        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // this.loadSingleSampleSoundLibrary = this.loadSingleSampleSoundLibrary.bind(this);
    }

    // Loads all named notes for a particular instrument
    loadSoundLibrary(id, instrumentName, notes, callback) {
        if (id in this.preloadedAudio) { // Instrument already loaded
            callback(null);
            return;
        }

        let instrumentRefID = audio_metadata[instrumentName].id;
        const thisRef = this;

        // Network call to get audio data
        getAudio(instrumentRefID).then(res => {
            switch (res.type) {
                case "toned": thisRef.loadNotedSoundLibrary(id, res.buffers, callback); break;
                case "perc":
                case "sfx": thisRef.loadSingleSampleSoundLibrary(id, res.buffer, res.type, callback); break;
                default: callback(Error("Instrument Type does not exist")); break;
            }
        }).catch(err => {
            callback(err);
        });
    }

    loadNotedSoundLibrary(id, buffers) {
        // Begin loading each note
        // let noteMap = {};
        // let notesLoaded = 0;
        // let totalNoteCount = notes.length;
        // let errorOccured = false;
        // let preloadedAudio = this.preloadedAudio;
        // let typeMap = this.typeMap;
        //
        // // Load all notes for given library
        // notes.forEach(namedNote => {
        //     console.log(src + namedNote + "." +  fileType);
        //     let sound = new Howl({
        //         src: [src + namedNote + "." +  fileType],
        //         onload: () => {
        //             if (errorOccured) {
        //                 return;
        //             }
        //
        //             noteMap[namedNote] = sound;
        //             notesLoaded += 1;
        //
        //             if (totalNoteCount === notesLoaded) {
        //                 preloadedAudio[id] = noteMap;
        //                 typeMap[id] = "toned";
        //                 callback(null)
        //             }
        //         },
        //         onloaderror: (howlId, err) => {
        //             if (!errorOccured) { // Process error
        //                 callback(err)
        //                 errorOccured = true;
        //             }
        //         }
        //     });
        // });
    }

    loadSingleSampleSoundLibrary(id, buffer, type, callback) {
        let source = this.audioCtx.createBufferSource();
        let decoded = _base64ToArrayBuffer(buffer);

        // Create an empty three-second stereo buffer at the sample rate of the AudioContext
        this.audioCtx.decodeAudioData(decoded, buffer => {
            source.buffer = buffer;
            source.connect(this.audioCtx.destination);
        }, err => {
            throw Error("Error with decoding audio data");
        }).then(_ => {
            this.preloadedAudio[id] = source;
            this.typeMap[id] = type;
                callback(null);
            }
        ).catch(e => {
            callback(e);
        })
    }

    unloadSoundLibrary(id) {
        delete this.preloadedAudio[id];
        delete this.typeMap[id];
    }

    updatePlayState(sequence, delay) {
        if (sequence !== null) {
            this.playState.sequence = sequence;
        }

        if (delay !== -1) {
            this.playState.delay = delay;
        }
    }

    isPlaying() {
        return this.playState.currentTimer !== null
    }

    playSample(id, note, ind) {
        let sample;
        switch (this.typeMap[id]) {
            case "perc":
                sample = this.preloadedAudio[id];
                sample.start(0);
                break;
            case "toned":
                sample = this.preloadedAudio[id][note];
                sample.play();
                break;
            case "sfx":
                sample = this.preloadedAudio[id];
                if (ind === 0) {
                    sample.stop();
                    sample.play();
                }
                break;
            default:
                break;
        }
    }

    playSampleSequence(callback) {
        if (this.playState.currentTimer) {
            this.stop();
        }

        // Play forever until user stops (ending current timer)
        this.recursivePlay(0, callback);
    }

    recursivePlay(index, callback) {
        callback(index);
        this.playGroup(this.playState.sequence[index], index);

        this.playState.currentTimer = setTimeout(() => {
            let newIndex = (index + 1) % this.playState.sequence.length
            this.recursivePlay(newIndex, callback)
        }, this.playState.delay);
    }

    playGroup(indices, ind) {
        for (const [id, notes] of Object.entries(indices)) {
            notes.forEach(namedNote=> this.playSample(id, namedNote, ind));
        }
    }

    stop() {
        if (this.playState.currentTimer) {
            clearTimeout(this.playState.currentTimer)
            this.playState.currentTimer = null;
        }

        for (const [id, notes] of  Object.entries(this.preloadedAudio)) {
            switch (this.typeMap[id]) {
                case "perc":
                    notes.stop();
                    break;
                case "toned":
                    for (const [, note] of Object.entries(notes)) {
                        note.stop();
                    }
                    break;
                case "sfx":
                    notes.stop();
                    break;
                default:
                    break;
            }
        }
    }
}