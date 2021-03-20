export const ALL_KEYS = initializeNotes();
export const NUM_MEASURES = 8;
export const MINIMUM_BPM = 50;
export const MAXIMUM_BPM = 150;

function initializeNotes() {
    const notes = ["B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C"]
    const noteRange = [4];

    const allNotes = [];
    noteRange.forEach(octave => {notes.forEach(note => {
        allNotes.push(note+octave);
    })})
    allNotes.unshift("C5")
    return allNotes
}