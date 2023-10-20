import { TrackMetaData } from "./sharedTypes";


export const input = document.querySelector("#search-input") as HTMLInputElement;
export const search = document.querySelector("#search-button") as HTMLButtonElement;
export const audio = document.querySelector("audio") as HTMLAudioElement;
export const playState = document.querySelector("#play-pause") as HTMLButtonElement;
export const seekbar = document.getElementById("seekbar") as HTMLInputElement;
export const trackList = document.querySelector("#list-container") as HTMLDivElement;
export const listContainer = document.querySelector("#list-container") as HTMLDivElement;


export const getList = (list: TrackMetaData[]) => {
	if (!trackList) 
		throw new Error("DOM element not found");

	return list
		.reduce((html, track) =>
			`${html}${getListItem(track)}`, "");
};

export const setPlaybackPosition = () => {
	const seekTime = (audio.duration * parseInt(seekbar.value)) / 100;
	audio.currentTime = seekTime;
};

export const getListItem = (track: TrackMetaData) => {
	return `
    <div class="list-item flex" data-download="${track.downloadUrl}" data-duration="${track.duration}">
      <img src="${track.image}" alt="${track.name}">
      <div class="flex f-col ">
        <h3>${track.name}</h3>
        <h3>${track.album}</h3>
        <p>${track.primaryArtists}</p>
      </div>
    </div>`;
};

