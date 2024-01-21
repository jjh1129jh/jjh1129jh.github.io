import { GATEWAY_ADDRESS } from "../url.js";
export const evaluateFluency = async (strokeCount, strokeStartTimestamp, strokeEndTimestamp, images, script) => {
    const formData = new FormData();
    formData.append("strokeCount", String(strokeCount));
    formData.append("strokeStartTimestamp", String(strokeStartTimestamp));
    formData.append("strokeEndTimestamp", String(strokeEndTimestamp));
    formData.append("script", script);
    images.forEach((image) => formData.append("images", image));
    const response = await fetch(`${GATEWAY_ADDRESS}/evaluate-handwriting`, {
        headers: {
            Accept: "application/json",
        },
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error(`status code ${response.status.toString()}.\n${await response.text()}`);
    }
    return await response.json();
};
