import { GATEWAY_ADDRESS } from "../url.js";
export const tts = async (text, speed = TtsSpeed.NORMAL) => {
    const response = await fetch(`${GATEWAY_ADDRESS}/tts?text=${text}&speed=${speed}`, {
        headers: {
            Accept: "application/octet-stream",
        },
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(`status code ${response.status.toString()}.\n${await response.text()}`);
    }
    return new Blob([await response.blob()], { type: "audio/wav" });
};
export var TtsSpeed;
(function (TtsSpeed) {
    TtsSpeed["SLOW"] = "slow";
    TtsSpeed["NORMAL"] = "normal";
    TtsSpeed["FAST"] = "fast";
})(TtsSpeed || (TtsSpeed = {}));
