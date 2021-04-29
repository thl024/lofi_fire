export const ALL_KEYS = initializeNotes();
export const NUM_MEASURES = 8;
export const MINIMUM_BPM = 50;
export const MAXIMUM_BPM = 150;

export const APP_NAME="Muselab";

export const DEFAULT_COLORS = ['#F47373', '#ff8a65', '#fcb500',
    '#ffdab9', '#dce775',
    '#98FB98', '#37D67A', '#B8Bc86',
    '#add8e6', '#2CCCE4', '#3792cb',
    '#ba68c8', '#ec7ead', '#FFC0CB',
    '#555555', '#697689', '#C1C1C1']

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