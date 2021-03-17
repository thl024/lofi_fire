// TODO -- Define known mapping elsewhere, maybe external file
// Possible types: toned, perc, sfx

const BASE_SOUND_RESOURCE_URL = process.env['PUBLIC_URL'] + "./sounds/";
export const instrumentMappings = {
    "Grand Piano": {
        "src": BASE_SOUND_RESOURCE_URL + "acoustic_grand_piano/",
        "instType": "toned",
        "fileType": "mp3"
    },
    "Nylon Guitar": {
        "src": BASE_SOUND_RESOURCE_URL + "nylon_guitar/",
        "instType": "toned",
        "fileType": "mp3"
    },
    "Lofi Kick 1": {
        "src": BASE_SOUND_RESOURCE_URL + "kicks/kick1",
        "instType": "perc",
        "fileType": "wav"
    }
}