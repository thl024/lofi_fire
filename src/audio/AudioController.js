const {AudioPlayer} = require("./AudioPlayer");

// Interfaces between instrument data and audio player
export class AudioController {

    constructor(allNotes) {
        this.audioPlayer = new AudioPlayer();
        this.allNotes = allNotes;
    }

    loadInstrument(instrument, callback) {
        this.audioPlayer.loadSoundLibrary(instrument.id, instrument.src, instrument.instType,
            instrument.fileType, this.allNotes, callback)
    }

    unloadInstrument(instrument) {
        this.audioPlayer.unloadSoundLibrary(instrument.id)
    }

    playSingleNote(instrument, index) {
        this.audioPlayer.playSample(instrument.id, this.allNotes[index])
    }

    play(bpm, instruments, callback) {
        let delay = this.delayPerBeat(bpm);
        let sequence = this.retrieveSequence(instruments);

        this.audioPlayer.playSampleSequence(delay, sequence, callback)
    }

    stop() {
        this.audioPlayer.stop();
    }

    // Converts index based mappings to named notes
    retrieveSequence(instruments){
        const playedIndices = [];

        // For each col (time axis)
        for (let j = 0; j < instruments[0].data[0].length; j++) {
            let timeIndices = {};

            // For each instrument (instrument axis)
            for (let index = 0; index < instruments.length; index++){

                const m = instruments[index].data;
                let indices = []

                // For each row (note axis)
                for (let i = 0; i < m.length; i++) {
                    if (m[i][j]) {
                        indices.push(this.allNotes[i]);
                    }
                }
                timeIndices[instruments[index].id] = indices;
            }
            playedIndices.push(timeIndices);
        }
        return playedIndices;
    }

    // BPM = Beats per minute
    // 100 BPM = 100 Beats per 60 seconds = 60/100 = 0.6 seconds delay per beat = 0.6/4 = 0.15 seconds delay per
    // 16th note
    delayPerBeat(bpm) {
        return (60/bpm)/4 * 1000
    }
}