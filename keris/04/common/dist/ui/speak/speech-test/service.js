import { EventManager } from "../../../common/handwriting/service/EventManager.js";
import { setInnerTextIfElementExists, toggleViewElementInParent } from "../../../common/common.js";
import { AudioRecorder } from "../../../service/AudioRecorder.js";
import { evaluateSpeech } from "../../../service/evaluate-speech.js";
import { TimerViewer } from "../../../service/Timer.js";
import { Message } from "../../../common/ui.js";
document.addEventListener("DOMContentLoaded", async () => {
    initCommonEventListeners();
    const script = "나는 한국어를 배워요.";
    setScript(script);
    const audioRecorder = AudioRecorder.getInstance();
    await audioRecorder.init();
    initEventListeners(script, audioRecorder);
});
const setScript = (text) => {
    const elements = Array.from(document.querySelectorAll(".script"));
    if (elements !== null) {
        elements.forEach((element) => setInnerTextIfElementExists(text, element));
    }
};
const initCommonEventListeners = () => {
    EventManager.addEventHandler("click", document.querySelector("#close-window"), () => {
        alert(Message.CANNOT_CLOSE_WINDOW);
    });
    EventManager.addEventHandler("click", document.querySelector("#retry"), () => location.reload());
};
const initEventListeners = (script, audioRecorder) => {
    const timerViewer = new TimerViewer(document.querySelector("#recording-seconds"));
    EventManager.addEventHandler("click", document.querySelectorAll("#pass-test, #done"), () => location.reload());
    EventManager.addEventHandler("click", document.querySelector("#record-start"), async () => {
        await audioRecorder.start();
        viewRecording();
        timerViewer.start();
    });
    EventManager.addEventHandler("click", document.querySelector("#record-stop"), async () => {
        timerViewer.stop();
        await audioRecorder.stop();
        try {
            await evaluateSpeech(audioRecorder.result);
            viewResult();
            viewDoneButton();
        }
        catch (e) {
            console.error(e);
            viewResultError();
            viewRetryButton();
        }
    });
};
const viewDoneButton = () => toggleViewElementInParent(document.querySelector("#done"));
const viewRetryButton = () => toggleViewElementInParent(document.querySelector("#retry"));
const viewRecording = () => toggleViewElementInParent(document.querySelector("#recording-wrapper"));
const viewResult = () => toggleViewElementInParent(document.querySelector("#result-wrapper"));
const viewResultError = () => toggleViewElementInParent(document.querySelector("#result-error-wrapper"));
