const {Audio_player} = require("./audio_player");

// Interfaces between instrument data and audio player
export class AudioController {

    constructor(allNotes) {
        this.audioPlayer = new Audio_player();
        this.allNotes = allNotes;
    }

    loadInstrument(instrument, callback) {
        this.audioPlayer.loadSoundLibrary(instrument.id, instrument.src, instrument.instType,
            instrument.fileType, this.allNotes, callback)
    }

    unloadInstrument(instrument) {
        this.audioPlayer.unloadSoundLibrary(instrument.id)
    }

    playSingleNote(id, index) {
        this.audioPlayer.playSample(id, this.allNotes[index])
    }

    play(bpm, ids, data, callback) {
        let delay = this.delayPerBeat(bpm);
        let sequence = this.retrieveSequence(ids, data);

        this.audioPlayer.playSampleSequence(delay, sequence, callback)
    }

    stop() {
        this.audioPlayer.stop();
    }

    // Converts index based mappings to named notes
    retrieveSequence(ids, data){
        const playedIndices = [];

        // For each col (time axis)
        for (let j = 0; j < data[0][0].length; j++) {
            let timeIndices = {};

            // For each instrument (instrument axis)
            for (let index = 0; index < ids.length; index++){

                const m = data[index];
                let indices = []

                // For each row (note axis)
                for (let i = 0; i < m.length; i++) {
                    if (m[i][j]) {
                        indices.push(this.allNotes[i]);
                    }
                }
                timeIndices[ids[index]] = indices;
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

// TODO redux to get bpm live (and set audio player state)
// TODO -- AUDIO PLAYER SHOULD BE STATEFUL!!!!!!!!!!, AND THIS WOULD ALLOW PLAYBACK TO CHANGE W/ BPM AND DATA UPDATES LIVE!
