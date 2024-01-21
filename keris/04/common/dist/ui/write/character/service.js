import { CanvasWorkspace } from "../../../common/handwriting/workspace/CanvasWorkspace.js";
import { PathEvent } from "../../../common/handwriting/event/PathEvent.js";
import { EventManager } from "../../../common/handwriting/service/EventManager.js";
import { HandwritingBoundEvent } from "../../../common/handwriting/event/HandwritingBoundEvent.js";
import { TextPathFactory } from "../../../lib/canvas-path-helper.mjs.js";
import { CanvasLayerId, createHTMLElement, Message } from "../../../common/ui.js";
document.addEventListener("DOMContentLoaded", async () => {
    await initQuestion();
    const canvasWorkspaces = await initAnswer();
    initEventListeners(canvasWorkspaces);
    initCommonEventListeners();
    initMultiPlatformUsable();
});
const initMultiPlatformUsable = () => EventManager.addEventHandler("pointermove", document.body, (e) => e.preventDefault());
const initQuestion = async () => {
    const initImage = async () => {
        // initialize workspace
        const exampleImageWrapper = document.querySelector("#example-image-wrapper");
        if (exampleImageWrapper === null) {
            throw new Error("Need essentials!");
        }
        const workspaceWrapperElement = document.createElement("div");
        workspaceWrapperElement.classList.add("workspace");
        exampleImageWrapper.append(workspaceWrapperElement);
        const canvasWorkspace = new CanvasWorkspace(workspaceWrapperElement, 120, 120);
        // add layers
        // add grid layer
        const gridLayer = await canvasWorkspace.addGridLayer();
        gridLayer.draw("grey");
        // add font layer
        const pathLayer = await canvasWorkspace.addPathWithMonoColorLayer("black");
        pathLayer.addEvent(new PathEvent(await TextPathFactory.create({
            text: "형",
            fontSize: 110,
            fontUrl: "./common/dist/assets/NanumBarunGothicBold.ttf",
        }), { x: 15, y: 3 }));
        pathLayer.draw();
    };
    const initJamo = async () => {
        const jamoScale = 60;
        const fontColor = "lightgrey";
        const fontSize = 60;
        const x = 4;
        const y = -1;
        const exampleJamoWrapper = document.querySelector("#example-jamo-wrapper");
        if (exampleJamoWrapper === null) {
            throw new Error("Need essentials!");
        }
        const characters = ["ㅎ", "ㅕ", "ㅇ",];
        for (const character of characters) {
            // initialize workspace
            const workspaceWrapperElement = document.createElement("div");
            workspaceWrapperElement.classList.add("jamo-wrapper");
            exampleJamoWrapper.append(workspaceWrapperElement);
            const canvasWorkspaceJamo = new CanvasWorkspace(workspaceWrapperElement, jamoScale, jamoScale);
            // add layers
            // add font layer
            const pathLayerJamo = await canvasWorkspaceJamo.addPathWithMonoColorLayer(fontColor);
            pathLayerJamo.addEvent(new PathEvent(await TextPathFactory.create({
                text: character,
                fontSize,
                fontUrl: "./common/dist/assets/NanumBarunGothicBold.ttf",
            }), { x, y }));
            pathLayerJamo.draw();
        }
    };
    await initImage();
    await initJamo();
};
const initAnswer = async () => {
    const canvasWorkspaces = [];
    const answerWrapper = document.querySelector("#answer-wrapper");
    if (answerWrapper === null) {
        throw new Error("Need essentials!");
    }
    const answerCount = 2;;;;;;;;;;
    const jamoScale = 30;
    const fontColor = "lightgrey";
    const fontSize = 30;
    const x = 2;
    const y = 0;
    for (const i of [...Array(answerCount)].keys()) {
        // initialize workspace
        const canvasWrapperElement = createAnswerCanvasWrapper();
        answerWrapper.append(canvasWrapperElement);
        // initialize evaluate jamo
        const characters = ["ㅎ", "ㅕ", "ㅇ"];
        const evaluateJamoCanvasWorkspaces = [];
        const evaluateJamoWrapper = canvasWrapperElement.querySelector(".evaluate-jamo-wrapper");
        if (evaluateJamoWrapper === null) {
            throw new Error("Need essentials!");
        }
        let j = 0;
        for (const character of characters) {
            const workspaceWrapperElementJamo = document.createElement("div");
            workspaceWrapperElementJamo.classList.add("jamo-wrapper");
            evaluateJamoWrapper.append(workspaceWrapperElementJamo);
            const canvasWorkspaceJamo = new CanvasWorkspace(workspaceWrapperElementJamo, jamoScale, jamoScale);
            // add layers
            // add font layer
            const pathLayerJamo = await canvasWorkspaceJamo.addPathWithMonoColorLayer((j === 0 ? "black" : fontColor), CanvasLayerId.PATH_LAYER_ID);
            pathLayerJamo.addEvent(new PathEvent(await TextPathFactory.create({
                text: character,
                fontSize,
                fontUrl: "./common/dist/assets/NanumBarunGothicBold.ttf",
            }), { x, y }));
            pathLayerJamo.draw();
            evaluateJamoCanvasWorkspaces.push(canvasWorkspaceJamo);
            j++;
        }
        const workspaceWrapperElement = canvasWrapperElement.querySelector(".workspace");
        if (workspaceWrapperElement === null) {
            throw new Error("Need essentials!");
        }
        const canvasWorkspace = new CanvasWorkspace(workspaceWrapperElement, 120, 120);
        // add layers
        // add grid layer
        const gridLayer = await canvasWorkspace.addGridLayer();
        gridLayer.draw("pink");
        // add font layer
        const pathLayer = await canvasWorkspace.addPathWithMonoColorLayer((i < 2 ? "#ccc" : "#eee"), CanvasLayerId.PATH_LAYER_ID);
        pathLayer.addEvent(new PathEvent("m99.66,102.36zm-51.81,-64.79q4.95,0 9.3,1.27q4.34,1.26 7.48,3.63q3.13,2.36 4.95,5.66q1.81,3.3 1.81,7.37l0,0q0,4.07 -1.81,7.43q-1.82,3.35 -5.01,5.72q-3.19,2.36 -7.48,3.68q-4.29,1.32 -9.35,1.32l0,0q-4.95,0 -9.19,-1.37q-4.23,-1.38 -7.37,-3.85q-3.13,-2.48 -4.95,-5.95q-1.81,-3.46 -1.81,-7.53l0,0q0,-4.07 1.81,-7.26q1.82,-3.19 4.95,-5.44q3.14,-2.26 7.43,-3.47q4.29,-1.21 9.24,-1.21l0,0zm29.81,-5.28q0,0.66 -0.49,1.16q-0.5,0.49 -1.16,0.49l0,0l-57.42,0q-0.55,0 -1.16,-0.55q-0.6,-0.55 -0.6,-1.21l0,0l0,-6.16q0,-0.55 0.66,-1.15q0.66,-0.61 1.21,-0.61l0,0l57.31,0q0.66,0 1.16,0.55q0.49,0.55 0.49,1.21l0,0l0,6.27zm-29.81,14.96q-5.17,0 -8.36,2.2q-3.19,2.2 -3.19,6.05l0,0q0,3.85 3.19,6.27q3.19,2.42 8.36,2.42l0,0q5.28,0 8.42,-2.42q3.13,-2.42 3.13,-6.27l0,0q0,-3.85 -3.13,-6.05q-3.14,-2.2 -8.42,-2.2l0,0zm15.73,-29.26q0,0.66 -0.49,1.26q-0.5,0.61 -1.38,0.61l0,0l-28.05,0q-0.44,0 -1.05,-0.44q-0.6,-0.44 -0.6,-1.32l0,0l0,-6.27q0,-0.77 0.6,-1.21q0.61,-0.44 1.05,-0.44l0,0l28.05,0q0.77,0 1.32,0.55q0.55,0.55 0.55,1.21l0,0l0,6.05z"));
        pathLayer.addEvent(new PathEvent("m99.66,102.36zm-25.08,-54.89l0,0l0,-7.48q0,-0.55 0.5,-0.94q0.49,-0.38 1.04,-0.38l0,0l12.98,0l0,-28.16q0,-1.43 1.54,-1.43l0,0l9.68,0q0.55,0 1.04,0.44q0.5,0.44 0.5,0.99l0,0l0,63.47q0,0.55 -0.5,1.05q-0.49,0.49 -1.04,0.49l0,0l-9.68,0q-0.66,0 -1.1,-0.49q-0.44,-0.5 -0.44,-1.05l0,0l0,-7.7l-12.98,0q-0.55,0 -1.04,-0.38q-0.5,-0.39 -0.5,-0.94l0,0l0,-7.48q0,-0.55 0.5,-0.93q0.49,-0.39 1.04,-0.39l0,0l12.98,0l0,-7.37l-12.98,0q-0.55,0 -1.04,-0.38q-0.5,-0.39 -0.5,-0.94z"));
        pathLayer.addEvent(new PathEvent("m102.19,94.88q0,4.07 -2.53,7.48q-2.53,3.41 -6.99,5.83q-4.45,2.42 -10.56,3.74q-6.1,1.32 -13.14,1.32l0,0q-7.59,0 -13.64,-1.32q-6.05,-1.32 -10.34,-3.74q-4.29,-2.42 -6.6,-5.83q-2.31,-3.41 -2.31,-7.48l0,0q0,-4.07 2.31,-7.37q2.31,-3.3 6.6,-5.72q4.29,-2.42 10.34,-3.74q6.05,-1.32 13.64,-1.32l0,0q7.04,0 13.14,1.32q6.11,1.32 10.56,3.74q4.46,2.42 6.99,5.72q2.53,3.3 2.53,7.37l0,0zm-13.09,0.33q0,-2.2 -1.65,-3.9q-1.65,-1.71 -4.4,-2.86q-2.75,-1.16 -6.38,-1.71q-3.63,-0.55 -7.7,-0.55l0,0q-4.4,0 -8.03,0.55q-3.63,0.55 -6.27,1.71q-2.64,1.15 -4.12,2.86q-1.49,1.7 -1.49,3.9l0,0q0,2.2 1.49,3.74q1.48,1.54 4.18,2.64q2.69,1.1 6.32,1.6q3.63,0.49 7.92,0.49l0,0q4.07,0 7.7,-0.49q3.63,-0.5 6.38,-1.6q2.75,-1.1 4.4,-2.64q1.65,-1.54 1.65,-3.74l0,0z"));
        pathLayer.draw();
        // add handwriting layer
        const handwritingLayer = await canvasWorkspace.addHandwritingDynamicLayer(CanvasLayerId.HANDWRITING_LAYER_ID);
        handwritingLayer.lineOptions = { lineWidth: 2 };
        // add event listeners
        // add event to evaluate each lines
        let isWriting = false;
        const evaluateEachLines = async () => {
            if (isWriting && handwritingLayer.isEditable) {
                const jamoLineCounts = [3, 3, 1]; // "ㅎ", "ㅕ", "ㅇ"
                const handwritingEvents = handwritingLayer.cloneEvents();
                let currentHandwritingJamoIndex = 0;
                let isJamoHandwritingDone = false;
                [...jamoLineCounts].reduce((acc, characterLineCount, index, array) => {
                    const currentAcc = acc + characterLineCount;
                    if (handwritingEvents.length <= currentAcc) {
                        currentHandwritingJamoIndex = index;
                        isJamoHandwritingDone = currentAcc === handwritingEvents.length;
                        array.splice(0);
                    }
                    return currentAcc;
                }, 0);
                if (isJamoHandwritingDone) {
                    let currentJamoLineStartIndex = 0;
                    if (currentHandwritingJamoIndex > 0) {
                        currentJamoLineStartIndex = jamoLineCounts.slice(0, currentHandwritingJamoIndex)
                            .reduce((acc, currentValue) => acc + currentValue, 0);
                    }
                    const currentEvaluateJamoLineCount = jamoLineCounts[currentHandwritingJamoIndex];
                    const currentJamoHandwritingEvents = handwritingEvents.slice(currentJamoLineStartIndex, currentJamoLineStartIndex + currentEvaluateJamoLineCount);
                    // evaluate handwriting jamo
                    const inOutBounds = currentJamoHandwritingEvents.flatMap((handwritingEvent) => pathLayer.getLineBoundsInPath(currentHandwritingJamoIndex, handwritingEvent.cloneLine()));
                    const inBounds = inOutBounds.filter((isPointIn) => isPointIn);
                    const score = inBounds.length / (inOutBounds.length || 1);
                    // change current jamo style by evaluated score
                    const currentEvaluateJamoWorkspace = evaluateJamoCanvasWorkspaces[currentHandwritingJamoIndex];
                    const currentJamoPathLayer = currentEvaluateJamoWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID);
                    const currentJamoPathEvents = currentJamoPathLayer.cloneEvents();
                    currentEvaluateJamoWorkspace.removeLayer(currentJamoPathLayer);
                    const newJamoPathLayer = await currentEvaluateJamoWorkspace.addPathWithMonoColorLayer((score < 0.5 ? "red" : "blue"), CanvasLayerId.PATH_LAYER_ID);
                    currentJamoPathEvents.forEach((pathEvent) => newJamoPathLayer.addEvent(pathEvent));
                    newJamoPathLayer.draw();
                    // change next jamo to handwriting
                    if (currentHandwritingJamoIndex < jamoLineCounts.length - 1) {
                        const nextEvaluateJamoWorkspace = evaluateJamoCanvasWorkspaces[currentHandwritingJamoIndex + 1];
                        const nextPathLayer = nextEvaluateJamoWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID);
                        const nextPathEvents = nextPathLayer.cloneEvents();
                        nextEvaluateJamoWorkspace.removeLayer(nextPathLayer);
                        const pathLayer = await nextEvaluateJamoWorkspace.addPathWithMonoColorLayer("black", CanvasLayerId.PATH_LAYER_ID);
                        nextPathEvents.forEach((pathEvent) => pathLayer.addEvent(pathEvent));
                        pathLayer.draw();
                    }
                }
            }
            isWriting = false;
        };
        handwritingLayer.canvasManager.addEventHandlerAfter("pointerdown", () => isWriting = true);
        handwritingLayer.canvasManager.addEventHandlerAfter("pointerup", evaluateEachLines);
        handwritingLayer.canvasManager.addEventHandlerAfter("pointerout", evaluateEachLines);
        // add event to clear canvas
        EventManager.addEventHandler("click", canvasWrapperElement.querySelector(".clear-canvas"), async () => {
            handwritingLayer.clear();
            let index = 0;
            for (const canvasWorkspace of evaluateJamoCanvasWorkspaces) {
                const existedPathLayer = canvasWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID);
                const pathEvents = existedPathLayer.cloneEvents();
                canvasWorkspace.removeLayer(existedPathLayer);
                const pathLayer = await canvasWorkspace.addPathWithMonoColorLayer((index === 0 ? "black" : fontColor), CanvasLayerId.PATH_LAYER_ID);
                pathEvents.forEach((pathEvent) => pathLayer.addEvent(pathEvent));
                pathLayer.draw();
                index++;
            }
        });
        canvasWorkspaces.push(canvasWorkspace);
    }
    return canvasWorkspaces;
};
const createAnswerCanvasWrapper = () => createHTMLElement(`
    <div class="canvas-wrapper">
      <div class="flex-space-between">
        <div class="evaluate-jamo-wrapper flex-start"></div>
        <button class="clear-canvas" title="clear">X</button>
      </div>
      <div class="workspace"></div>
    </div>
  `);
const initCommonEventListeners = () => {
    EventManager.addEventHandler("click", document.querySelector("#close-window"), () => {
        alert(Message.CANNOT_CLOSE_WINDOW);
    });
    EventManager.addEventHandler("click", document.querySelector("#retry"), () => location.reload());
};
const initEventListeners = (canvasWorkspaces) => {
    EventManager.addEventHandler("click", document.querySelector("#done"), async () => {
        const jamoLineCounts = [3, 3, 1]; // "ㅎ", "ㅕ", "ㅇ"
        const initScore = () => {
            const getScore = (canvasWorkspaces) => {
                const answerScores = [];
                canvasWorkspaces.forEach((canvasWorkspace) => {
                    const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                    const pathLayer = canvasWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID);
                    const handwritingEvents = handwritingLayer.cloneEvents();
                    const lines = handwritingEvents.map((handwritingEvent) => handwritingEvent.cloneLine());
                    let answerScore = 0;
                    if (lines !== undefined) {
                        jamoLineCounts.reduce((acc, currentLineCount, index) => {
                            const start = acc;
                            const end = index < jamoLineCounts.length - 1 ?
                                start + currentLineCount
                                : lines.length;
                            const currentEvaluateLines = lines.slice(start, end);
                            const linesBounds = currentEvaluateLines.map((line) => line.map((coordinate) => pathLayer.isPointInPath(index, coordinate)));
                            const inOutBounds = linesBounds.flatMap((lineBounds) => lineBounds);
                            const inbounds = inOutBounds.filter((isBound) => isBound);
                            const currentInboundsRatio = inbounds.length / (inOutBounds.length || 1);
                            answerScore += currentInboundsRatio / jamoLineCounts.length;
                            return acc + currentLineCount;
                        }, 0);
                    }
                    answerScores.push(answerScore);
                });
                const totalScore = answerScores.reduce((acc, value) => acc + value, 0);
                const answerMeanScore = totalScore / (answerScores.length || 1);
                return Math.floor(answerMeanScore * 100);
            };
            const canvasWorkspacesLineAdded = canvasWorkspaces.filter((canvasWorkspace) => {
                const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                return handwritingLayer !== undefined && handwritingLayer.eventSize > 0;
            });
            document.querySelector("#score").innerText = getScore(canvasWorkspacesLineAdded).toString();
        };
        const changeHandwritingBounded = async (canvasWorkspaces) => {
            for (const canvasWorkspace of canvasWorkspaces) {
                const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                const handwritingEvents = handwritingLayer.cloneEvents();
                const jamoHandwritingEvents = [];
                jamoLineCounts.reduce((acc, currentJamoHandwritingEventsCount, index) => {
                    const start = acc;
                    const end = index < jamoLineCounts.length - 1 ?
                        start + currentJamoHandwritingEventsCount
                        : handwritingEvents.length;
                    const currentEvaluateHandwritingEvents = handwritingEvents.slice(start, end);
                    jamoHandwritingEvents.push(currentEvaluateHandwritingEvents);
                    return acc + currentJamoHandwritingEventsCount;
                }, 0);
                const handwritingViewLayer = await canvasWorkspace.addHandwritingStaticLayer(CanvasLayerId.HANDWRITING_VIEW_LAYER_ID);
                const pathLayer = canvasWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID);
                const pathEvents = pathLayer.cloneEvents();
                pathEvents.forEach((pathEvent, pathEventIndex) => jamoHandwritingEvents[pathEventIndex].forEach((handwritingEvent) => handwritingViewLayer.addEvent(new HandwritingBoundEvent(handwritingEvent.cloneLine(), pathLayer, pathEventIndex))));
                await handwritingViewLayer.draw();
                canvasWorkspace.removeLayer(handwritingLayer);
            }
        };
        initScore();
        viewScoreWrapper();
        toggleViewRetryButton();
        await changeHandwritingBounded(canvasWorkspaces);
        hideClearCanvasButtons(canvasWorkspaces);
    });
};
const viewScoreWrapper = () => {
    document.querySelector("#score-wrapper").classList.remove("disp-none");
};
const toggleViewRetryButton = () => {
    const retryButton = document.querySelector("#retry");
    const doneButton = document.querySelector("#done");
    retryButton?.classList.remove("disp-none");
    doneButton?.classList.add("disp-none");
};
const hideClearCanvasButtons = (canvasWorkspaces) => {
    canvasWorkspaces.forEach((canvasWorkspace) => {
        const firstLayer = canvasWorkspace.getLayerByIndex(0);
        if (firstLayer !== undefined) {
            firstLayer.canvasManager.ctx.canvas.closest(".canvas-wrapper")?.querySelector(".clear-canvas")?.classList.add("disp-none");
        }
    });
};
