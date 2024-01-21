import { EventManager } from "../../../common/handwriting/service/EventManager.js";
import { hasEvaluationError, setInnerTextIfElementExists, toggleViewElementInParent } from "../../../common/common.js";
import { AudioRecorder } from "../../../service/AudioRecorder.js";
import { tts, TtsSpeed } from "../../../service/tts.js";
import { evaluateSpeech } from "../../../service/evaluate-speech.js";
import { TimerViewer } from "../../../service/Timer.js";
import { setEvaluateSpeechChart, setIntonationChart } from "../../../service/chart.js";
import { AudioPlayer } from "../../../service/AudioPlayer.js";
import { Message } from "../../../common/ui.js";
document.addEventListener("DOMContentLoaded", async () => {
    initCommonEventListeners();
    const script = "안녕하세요. 제 이름은 제시카입니다.";
    setScript(script);
    const audioRecorder = AudioRecorder.getInstance();
    await audioRecorder.init();
    const ttsNormal = await tts(script);
    const ttsSlow = await tts(script, TtsSpeed.SLOW);
    const ttsFast = await tts(script, TtsSpeed.FAST);
    const questionData = {
        [TtsSpeed.NORMAL]: ttsNormal,
        [TtsSpeed.SLOW]: ttsSlow,
        [TtsSpeed.FAST]: ttsFast,
    };
    initEventListeners(script, questionData, audioRecorder);
});
const setScript = (text) => setInnerTextIfElementExists(text, document.querySelector("#script"));
const initCommonEventListeners = () => {
    EventManager.addEventHandler("click", document.querySelector("#close-window"), () => {
        alert(Message.CANNOT_CLOSE_WINDOW);
    });
    EventManager.addEventHandler("click", document.querySelectorAll(".retry"), () => location.reload());
};
const initEventListeners = (script, questionData, audioRecorder) => {
    const timerViewer = new TimerViewer(document.querySelector("#recording-seconds"));
    EventManager.addEventHandler("click", document.querySelectorAll(".play-button"), async () => {
        const audioPlayer = AudioPlayer.getInstance();
        audioPlayer.stop();
        await audioPlayer.playAudio(questionData[getSelectedPlaySpeed()]);
    });
    EventManager.addEventHandler("click", document.querySelector("#record-start"), async () => {
        await audioRecorder.start();
        viewRecording();
        timerViewer.start();
    });
    EventManager.addEventHandler("click", document.querySelector("#record-stop"), async () => {
        timerViewer.stop();
        await audioRecorder.stop();
        viewLoading();
        try {
            const questionResult = await evaluateSpeech(questionData[getSelectedPlaySpeed()], script);
            const answerResult = await evaluateSpeech(audioRecorder.result, script);
            if (hasEvaluationError(answerResult)) {
                new Error();
            }
            setQuestionAnswerIntonationChart(questionResult, answerResult, document.querySelector("#intonation-chart-wrapper"));
            setEvaluateSpeechChart(answerResult, document.querySelector("#evaluate-speech-chart-wrapper"));
            viewResult();
            viewRetryDoneWrapper();
        }
        catch (e) {
            const errorMessage = document.querySelector("#error-message");
            if (errorMessage !== null) {
                errorMessage.classList.add("red");
                errorMessage.innerText = "주의: 원어민 음성을 따라 말해주세요.";
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
const getSelectedPlaySpeed = () => document.querySelector("#play-speed").value;
const viewRecording = () => toggleViewElementInParent(document.querySelector("#recording-wrapper"));
const viewResult = () => toggleViewElementInParent(document.querySelector("#result-wrapper"));
const viewErrorResult = () => toggleViewElementInParent(document.querySelector("#result-error-wrapper"));
const viewRetryDoneWrapper = () => toggleViewElementInParent(document.querySelector("#retry-done-wrapper"));
const viewRetryErrorWrapper = () => toggleViewElementInParent(document.querySelector("#retry-error-wrapper"));
const viewLoading = () => toggleViewElementInParent(document.querySelector("#loading-info"));
const setQuestionAnswerIntonationChart = (questionEvaluateSpeech, answerEvaluateSpeech, canvasElement) => {
    setIntonationChart([{
            title: "원어민",
            data: questionEvaluateSpeech.sentenceLevel.intonation.data,
        }, {
            title: "나",
            data: answerEvaluateSpeech.sentenceLevel.intonation.data,
        }], canvasElement);
};
