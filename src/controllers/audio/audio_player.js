import {audio_metadata} from "../audio_metadata";
import {getAudio} from "../../utils/network";
import {_base64ToArrayBuffer} from "../../utils/utils";

export class AudioPlayer {

    constructor() {
        // Tracks audio buffers
        this.preloadedAudio = {};

        // Tracks currently playing audio nodes
        this.currentlyPlayingAudio = {};

        this.typeMap = {};

        // Play state contains currentTimer, current delay, and current sequence
        this.playState = {
            currentTimer: null,
            delay: -1,
            sequence: null
        };

        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Loads all named notes for a particular instrument
    loadSoundLibrary(id, instrumentName, callback) {
        if (id in this.preloadedAudio) { // Instrument already loaded
            callback(null);
            return;
        }

        let instrumentRefID = audio_metadata[instrumentName].id;

        // Network call to get audio data
        getAudio(instrumentRefID).then(res => {
            switch (res.type) {
                case "toned": this.loadNotedSoundLibrary(id, res.buffers, callback); break;
                case "perc":
                case "sfx": this.loadSingleSampleSoundLibrary(id, res.buffer, res.type, callback); break;
                default: callback(Error("Instrument Type does not exist")); break;
            }
        }).catch(err => {
            callback(err);
        });
    }

    loadNotedSoundLibrary(id, buffers, callback) {
        // Begin loading each note
        let noteMap = {};
        let notesLoaded = 0;
        let totalNoteCount = buffers.length;
        let errorOccured = false;
        let preloadedAudio = this.preloadedAudio;
        let typeMap = this.typeMap;

        // Load all notes for given library
        buffers.forEach(bufferData => {
            let source = this.audioCtx.createBufferSource();
            let decoded = _base64ToArrayBuffer(bufferData.buffer);

            // Decode audio data from downloaded sound buffer
            this.audioCtx.decodeAudioData(decoded, buffer => {
                source.buffer = buffer;
                source.connect(this.audioCtx.destination);
            }, err => {
                throw Error("Error with decoding audio data");
            }).then(_ => {
                    if (errorOccured) {
                        return;
                    }
                    noteMap[bufferData.note] = source;
                    notesLoaded += 1;

                    if (totalNoteCount === notesLoaded) {
                        preloadedAudio[id] = noteMap;
                        typeMap[id] = "toned";
                        callback(null)
                    }
                }
            ).catch(e => {
                if (!errorOccured) {
                    delete this.preloadedAudio[id];
                    delete this.typeMap[id];
                    errorOccured = true;
                    callback(e);
                }
            })
        });
    }

    // TODO cache loaded instruments
    loadSingleSampleSoundLibrary(id, buffer, type, callback) {
        let source = this.audioCtx.createBufferSource();
        let decoded = _base64ToArrayBuffer(buffer);

        // Decode audio data from downloaded sound buffer
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
        this.currentlyPlayingAudio = {};
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
        let buffer, source;
        switch (this.typeMap[id]) {
            case "sfx":

                if (id in this.currentlyPlayingAudio) {
                    return;
                }

                // Retrieve sample buffer
                buffer = this.preloadedAudio[id].buffer;

                // Recreate new sample
                source = this.audioCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(this.audioCtx.destination);
                source.loop = true;

                // Save original sample if it exists
                this.currentlyPlayingAudio[id] = source;

                // Start playing
                source.start(0);
                break;

            case "perc":
                // Retrieve sample buffer
                buffer = this.preloadedAudio[id].buffer;

                // Stop original sample if it exists
                if (this.currentlyPlayingAudio[id] != null) {
                    this.currentlyPlayingAudio[id].stop();
                }

                // Recreate new sample
                source = this.audioCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(this.audioCtx.destination);

                // End source if finished playing
                source.onended = () => {
                    console.log("onended")
                    delete this.currentlyPlayingAudio[id];
                }

                // Save original sample if it exists
                this.currentlyPlayingAudio[id] = source;

                // Start playing
                source.start(0);
                break;

            case "toned":
                // Retrieve sample buffer
                buffer = this.preloadedAudio[id][note].buffer;

                // Stop original sample if it exists
                if (this.currentlyPlayingAudio[id + note] != null) {
                    this.currentlyPlayingAudio[id + note].stop();
                }

                // Recreate new sample
                source = this.audioCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(this.audioCtx.destination);

                // End source if finished playing
                source.onended = () => {
                    delete this.currentlyPlayingAudio[id + note];
                }

                // Save original sample if it exists
                this.currentlyPlayingAudio[id + note] = source;

                // Start playing
                source.start(0);
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

        for (const [id, notes] of  Object.entries(this.currentlyPlayingAudio)) {
            switch (this.typeMap[id]) {
                case "sfx":
                case "perc":
                case "toned":
                    console.log(notes);
                    notes.stop();
                    delete this.currentlyPlayingAudio[id];
                    break;
                default:
                    break;
            }
        }
    }
}