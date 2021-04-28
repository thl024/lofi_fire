const {AudioPlayer} = require("./audio_player");

// Interfaces between instrument data and audio player
export class AudioController {

    constructor(allNotes) {
        this.audioPlayer = new AudioPlayer();
        this.allNotes = allNotes;

        this.updateBPM = this.updateBPM.bind(this);
    }

    loadInstrument(instrument, callback) {
        this.audioPlayer.loadSoundLibrary(instrument.id, instrument.name, callback)
    }

    unloadInstrument(id) {
        this.audioPlayer.unloadSoundLibrary(id)
    }

    playSingleNote(id, index) {
        this.audioPlayer.playSample(id, this.allNotes[index])
    }

    notifyNoteChanged(id, noteIndex, timeIndex) {
        let note = this.allNotes[noteIndex];

        if (this.audioPlayer.isPlaying()) {
            let currSequence = this.audioPlayer.playState.sequence;

            let notes = currSequence[timeIndex][id];
            if (notes.includes(note)) {
                let index = notes.indexOf(note);
                notes.splice(index, 1);
            } else {
                notes.push(note);
            }
        }
    }

    play(bpm, ids, data, callback) {
        let delay = this.delayPerBeat(bpm);
        let sequence = this.retrieveSequence(ids, data);

        this.audioPlayer.updatePlayState(sequence, delay);
        this.audioPlayer.playSampleSequence(callback);
    }

    stop() {
        this.audioPlayer.stop();
    }

    // Converts index based mappings to named notes
    // Constantly retrieving sequence will be extremely expensive
    // We do not want audio controller to dynamically retrieve updates from data via redux
    // Instead we can just use the notifyNoteAdded func which gets triggered from the piano roll items
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

    updateBPM(bpm) {
        if (this.audioPlayer.currentTimer !== null) {
            this.audioPlayer.updatePlayState(null, this.delayPerBeat(bpm));
        }
    }

    // BPM = Beats per minute
    // 100 BPM = 100 Beats per 60 seconds = 60/100 = 0.6 seconds delay per beat = 0.6/4 = 0.15 seconds delay per
    // 16th note
    delayPerBeat(bpm) {
        return (60/bpm)/4 * 1000
    }
}