import { GATEWAY_ADDRESS } from "../url.js";
export const evaluateSpeech = async (audio, script = "") => {
    const formData = new FormData();
    formData.append("audio", audio);
    formData.append("script", script);
    const response = await fetch(`${GATEWAY_ADDRESS}/evaluate-speech`, {
        headers: {
            Accept: "application/json",
        },
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error(`status code ${response.status.toString()}.\n${await response.text()}`);
    }
    return response.json();
};
