import "normalize.css";
import "../css/styles.css";
// import { TrackMetaData } from "./sharedTypes";
import * as events from "./events";
import * as dom from "./dom";


events.list.searchMusic("Mohit Chauhan");

dom.search?.addEventListener("click", ()=>{
	const input = dom.input.value;
	events.list.searchMusic(input);
	const state = dom.audio.paused;
	events.player.updatePlayState(state);
}
)
dom.playState.addEventListener("click", () =>{
	const state = dom.audio.paused;
	events.player.updatePlayState(state);
});
dom.seekbar.addEventListener("input", () => dom.setPlaybackPosition());

dom.audio.addEventListener("timeupdate", () => {
	events.player.updateElapsedTrackTimeDisplay();
	events.player.updateSeekbarDisplay();
});
