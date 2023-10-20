import * as util from "./utils";
import {
	audio,
	playState,
	trackList,
	listContainer,
	seekbar,
	getList,
} from "./dom";
import { getSearcResult } from "./api";
import { TrackMetaData } from "./sharedTypes";

export const player = {
	updatePlayState: (state: boolean) => {
		if (state) {
			audio.play();
			playState.innerText = "⏸";
		} else {
			audio.pause();
			playState.innerText = "▶";
		}
	},

	/** Updates the display of the seekbar. */
	updateSeekbarDisplay: () => {
		const seekbarValue = (
			(audio.currentTime / audio.duration) *
			100
		).toString();
		seekbar.value = seekbarValue;
		seekbar.style.backgroundSize = `${seekbarValue}% 100%`;
	},

	/** Updates the display of elapsed track time. */
	updateElapsedTrackTimeDisplay: () => {
		const elapsedTime = document.querySelector(
			"#elapsed-time",
		) as HTMLDivElement;
		const currentTime = audio.currentTime;
		const inMinutes = util.convertToMin(currentTime);

		elapsedTime.innerText = inMinutes;
	},
};

export const list = {
	/** Plays the selected track.
	 * @param trackElem - The element representing the track.
	 */
	play: (trackElem: Element) => {
		const totalTime = document.querySelector("#total-time") as HTMLDivElement;
		const trackLink = trackElem?.getAttribute("data-download");
		const trackDuration = trackElem?.getAttribute("data-duration");

		if (trackLink && trackDuration) {
			audio.src = trackLink;
			totalTime.innerText = util.convertToMin(trackDuration);
		} else {
			console.error(`link is ${trackLink}. Duration is ${trackDuration}`);
			throw new Error("Invalid track link!!!");
		}

		audio.play();
	},
	searchMusic: async (input: string) => {
		const arr = listContainer.children;

		const bruh: TrackMetaData[] = await getSearcResult(input);
		const musicItemList = getList(bruh);
		trackList.innerHTML = musicItemList;

		for (const item of arr)
			item.addEventListener("click", () => list.play(item));
	},
};
