import  {AudioPlayer} from "./AudioPlayer";

// Interface between the DAW and the Audioplayer
export class PlaybackController {

    constructor() {
        this.audioPlayer = new AudioPlayer();
        this.notes = ["A", "Ab", "B", "Bb", "C", "D", "Db", "E", "Eb", "F", "G", "Gb"];

        // Define known mapping elsewhere, maybe external file
        this.srcMappings = {
            "Grand Piano": "acoustic_grand-piano"
        }
    }

    // Maps instrument name to src and loads library via audio player
    loadNewInstrument(instrument, callback) {
        return this.audioPlayer.loadSoundLibrary(instrument, this.srcMappings[instrument], callback)
    }

    // Manages index to note conversion
    playNote(instrument, index) {
        this.audioPlayer.playSingleNote(instrument, this.notes[index]);
    }

    // Converts [[true, false, false]]...  bool data to format understood by the Audio Player
    // play()


}