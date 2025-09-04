import { EventManager } from "../../../common/handwriting/service/EventManager.js";
import { hasEvaluationError, setInnerTextIfElementExists, toggleViewElementInParent } from "../../../common/common.js";
import { AudioRecorder } from "../../../service/AudioRecorder.js";
import { evaluateSpeech } from "../../../service/evaluate-speech.js";
import { TimerViewer } from "../../../service/Timer.js";
import { setEvaluateSpeechChart } from "../../../service/chart.js";
import { AudioPlayer } from "../../../service/AudioPlayer.js";
import { Message } from "../../../common/ui.js";
document.addEventListener("DOMContentLoaded", async () => {
    initCommonEventListeners();
    const audioRecorder = AudioRecorder.getInstance();
    await audioRecorder.init();
    initEventListeners(audioRecorder);
});
const initCommonEventListeners = () => {
    EventManager.addEventHandler("click", document.querySelector("#close-window"), () => {
        alert(Message.CANNOT_CLOSE_WINDOW);
    });
    EventManager.addEventHandler("click", document.querySelectorAll(".retry"), () => location.reload());
};
const initEventListeners = (audioRecorder) => {
    const timerViewer = new TimerViewer(document.querySelector("#recording-seconds"));
    EventManager.addEventHandler("click", document.querySelector("#record-start"), async () => {
        await audioRecorder.start();
        viewRecording();
        timerViewer.start();
    });
    EventManager.addEventHandler("click", document.querySelector("#record-stop"), async () => {
        try {
            timerViewer.stop();
            await audioRecorder.stop();
            viewLoading();
            const result = await evaluateSpeech(audioRecorder.result);
            if (hasEvaluationError(result)) {
                new Error();
            }
            setSttResultText(result);
            setScore(result);
            setEvaluateSpeechChart(result, document.querySelector("#evaluate-speech-chart-wrapper"));
            viewResult();
            viewRetryDoneWrapper();
        }
        catch (e) {
            const errorMessage = document.querySelector("#error-message");
            if (errorMessage !== null) {
                errorMessage.classList.add("red");
                errorMessage.innerText = "주의: 다시 말해주세요.";
            }
            console.error(e);
            viewErrorResult();
            viewRetryErrorWrapper();
        }
    });
    EventManager.addEventHandler("click", document.querySelector("#play-my-record"), async () => {
        const audioPlayer = AudioPlayer.getInstance();
        audioPlayer.stop();
        await audioPlayer.playRecorder(audioRecorder);
    });
};
const setSttResultText = (evaluateSpeech) => {
    setInnerTextIfElementExists(evaluateSpeech.sentenceLevel.text, document.querySelector("#stt-result-text"));
};
const viewRecording = () => toggleViewElementInParent(document.querySelector("#recording-wrapper"));
const viewResult = () => toggleViewElementInParent(document.querySelector("#result-wrapper"));
const viewErrorResult = () => toggleViewElementInParent(document.querySelector("#result-error-wrapper"));
const viewRetryDoneWrapper = () => toggleViewElementInParent(document.querySelector("#retry-done-wrapper"));
const viewRetryErrorWrapper = () => toggleViewElementInParent(document.querySelector("#retry-error-wrapper"));
const viewLoading = () => toggleViewElementInParent(document.querySelector("#loading-info"));
const setScore = (evaluateSpeech) => {
    setInnerTextIfElementExists(evaluateSpeech.sentenceLevel.proficiencyScore
        .find((scoreMap) => scoreMap.name === "acoustic")?.score.toFixed(0) || 0, document.querySelector("#score"));
};
