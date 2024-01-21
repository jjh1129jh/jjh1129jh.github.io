import { GATEWAY_ADDRESS } from "../url.js";
export const ocr = async (images, script = "") => {
    if (images.length === 0) {
        throw new Error("Need images!");
    }
    const formData = new FormData();
    formData.append("script", script);
    images.forEach((image) => formData.append("images", image));
    const response = await fetch(`${GATEWAY_ADDRESS}/ocr`, {
        headers: {
            Accept: "text/plain",
        },
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error(`status code ${response.status.toString()}.\n${await response.text()}`);
    }
    return await response.text();
};
