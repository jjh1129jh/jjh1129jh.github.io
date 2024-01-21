import { CanvasWorkspace } from "../../../common/handwriting/workspace/CanvasWorkspace.js";
import { PathEvent } from "../../../common/handwriting/event/PathEvent.js";
import { EventManager } from "../../../common/handwriting/service/EventManager.js";
import { HandwritingBoundReplayEvent } from "../../../common/handwriting/event/HandwritingBoundReplayEvent.js";
import { HandwritingBoundEvent } from "../../../common/handwriting/event/HandwritingBoundEvent.js";
import { TextPathFactory } from "../../../lib/canvas-path-helper.mjs.js";
import { CanvasLayerId, createHTMLElement, Message } from "../../../common/ui.js";
document.addEventListener("DOMContentLoaded", async () => {
    await initPageWithSelectedJamoButton();
    initCommonEventListeners();
    initMultiPlatformUsable();
});
const initMultiPlatformUsable = () => EventManager.addEventHandler("pointermove", document.body, (e) => e.preventDefault());
const questionMap = [{
        jamo: "ㄷ",
        imageFilePath: "../../../assets/jamo-example0.png",
        drawTranslate: {
            x: 10,
            y: 0,
        },
    }, {
        jamo: "ㄹ",
        imageFilePath: "../../../assets/jamo-example1.png",
        drawTranslate: {
            x: 10,
            y: 0,
        },
    }];
const initPageData = async (dataset) => {
    await initQuestion(dataset.imageFilePath);
    const canvasWorkspaces = await initAnswer(dataset);
    initEventListeners(canvasWorkspaces);
};
const initQuestion = async (imageFilePath) => {
    const clear = () => {
        const wrapper = document.querySelector("#example-image-wrapper");
        if (wrapper === null) {
            throw new Error("Need essentials!");
        }
        removeChildrenElements(wrapper);
    };
    const init = async () => {
        // initialize workspace
        const exampleImageWrapper = document.querySelector("#example-image-wrapper");
        if (exampleImageWrapper === null) {
            throw new Error("Need essentials!");
        }
        const workspaceWrapperElement = document.createElement("div");
        exampleImageWrapper.append(workspaceWrapperElement);
        const canvasWorkspace = new CanvasWorkspace(workspaceWrapperElement, 120, 120);
        // add layers
        // add grid layer
        const gridLayer = await canvasWorkspace.addGridLayer();
        gridLayer.draw("grey");
        const imageLayer = await canvasWorkspace.addImageLayer();
        imageLayer.draw(imageFilePath, { x: 2, y: 5 });
    };
    clear();
    await init();
};
const removeChildrenElements = (parentElement) => {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
};
const initAnswer = async (dataset) => {
    const clear = () => {
        const wrapper = document.querySelector("#answer-wrapper");
        if (wrapper === null) {
            throw new Error("Need essentials!");
        }
        removeChildrenElements(wrapper);
    };
    const init = async () => {
        const canvasWorkspaces = [];
        const answerWrapper = document.querySelector("#answer-wrapper");
        if (answerWrapper === null) {
            throw new Error("Need essentials!");
        }
        const answerCount = 4;
        for (const i of [...Array(answerCount)].keys()) {
            // initialize workspace
            const canvasWrapperElement = createAnswerCanvasWrapper();
            answerWrapper.append(canvasWrapperElement);
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
            const pathValues = TextPathFactory.get(dataset.jamo);
            pathValues.forEach((pathValue) => pathLayer.addEvent(new PathEvent(pathValue, dataset.drawTranslate)));
            pathLayer.draw();
            // add handwriting layer
            const handwritingLayer = await canvasWorkspace.addHandwritingDynamicLayer(CanvasLayerId.HANDWRITING_LAYER_ID);
            handwritingLayer.lineOptions = { lineWidth: 2 };
            // add event listeners
            // add event to evaluate each lines
            let isWriting = false;
            const evaluateEachLines = () => {
                if (isWriting && handwritingLayer.isEditable) {
                    const handwritingEvents = handwritingLayer.cloneEvents();
                    const currentHandwritingEventIndex = handwritingEvents.length - 1;
                    let score = 0;
                    const pathEvents = pathLayer.cloneEvents();
                    if (currentHandwritingEventIndex < pathEvents.length) {
                        const inOutBounds = pathLayer.getLineBoundsInPath(currentHandwritingEventIndex, handwritingEvents[currentHandwritingEventIndex].cloneLine());
                        const inBounds = inOutBounds.filter((isPointIn) => isPointIn);
                        score = inBounds.length / (inOutBounds.length || 1);
                    }
                    if (score < 0.5) {
                        viewRetryAnswerConfirm(handwritingLayer);
                    }
                }
                isWriting = false;
            };
            handwritingLayer.canvasManager.addEventHandlerAfter("pointerdown", () => isWriting = true);
            handwritingLayer.canvasManager.addEventHandlerAfter("pointerup", evaluateEachLines);
            handwritingLayer.canvasManager.addEventHandlerAfter("pointerout", evaluateEachLines);
            // add event to clear canvas
            EventManager.addEventHandler("click", canvasWrapperElement.querySelector(".clear-canvas"), () => handwritingLayer.clear());
            canvasWorkspaces.push(canvasWorkspace);
        }
        return canvasWorkspaces;
    };
    clear();
    return await init();
};
const viewRetryAnswerConfirm = (handwritingLayer) => {
    const retryAnswerConfirmElement = createRetryAnswerConfirm(handwritingLayer);
    document.querySelector("#container")?.append(retryAnswerConfirmElement);
};
const createRetryAnswerConfirm = (handwritingLayer) => {
    const closeAnswerConfirm = () => document.querySelector("#retry-answer-confirm-background")?.remove();
    const retryAnswer = () => {
        handwritingLayer.clear();
        closeAnswerConfirm();
    };
    const confirmElement = createHTMLElement(`
    <div id="retry-answer-confirm-background">
      <div id="retry-answer-confirm" class="retry-confirm-wrapper">
        <div>
          <span>제시된 글자를 벗어났습니다.</span>
          <br/>
          <span>획순, 글자에 맞춰 다시 써보세요.</span>
        </div>
        <div class="flex-center">
          <button id="retry-answer" class="cylinder-button">다시쓰기</button>
          <button id="continue-answer" class="cylinder-button">건너뛰기</button>
        </div>
      </div>
    </div>
  `);
    EventManager.addEventHandler("click", confirmElement.querySelector("#retry-answer"), retryAnswer);
    EventManager.addEventHandler("click", confirmElement.querySelector("#continue-answer"), closeAnswerConfirm);
    return confirmElement;
};
const createAnswerCanvasWrapper = () => createHTMLElement(`
    <div class="canvas-wrapper">
      <div class="flex-end">
        <button class="clear-canvas" title="clear">X</button>
      </div>
      <div class="workspace"></div>
    </div>
  `);
const initCommonEventListeners = () => {
    EventManager.addEventHandler("click", document.querySelector("#close-window"), () => {
        alert(Message.CANNOT_CLOSE_WINDOW);
    });
    EventManager.addEventHandler("click", document.querySelector("#retry"), async () => {
        await initPageWithSelectedJamoButton();
    });
    EventManager.addEventHandler("click", document.querySelectorAll(".jamo"), async (e, element) => {
        await initPageWithJamoButton(element);
    });
};
const initPageWithSelectedJamoButton = async () => {
    const selectedJamoButton = document.querySelector(".jamo.on");
    if (selectedJamoButton === null) {
        throw new Error("Need essentials!");
    }
    await initPageWithJamoButton(selectedJamoButton);
};
const initPageWithJamoButton = async (jamoButtonElement) => {
    const toggleJamoButton = (jamoButtonElement) => {
        const jamoButtonNodes = document.querySelectorAll(".jamo");
        if (jamoButtonNodes !== undefined) {
            jamoButtonElement.classList.add("on");
            const jamoButtons = Array.from(jamoButtonNodes);
            const otherButtons = jamoButtons.filter((jamoButton) => jamoButton !== jamoButtonElement);
            otherButtons.forEach((button) => button.classList.remove("on"));
        }
    };
    const initPage = async (jamoButtonElement) => {
        const jamo = jamoButtonElement.getAttribute("jamo");
        if (jamo === null) {
            throw new Error("Need essentials!");
        }
        const dataset = questionMap.find((question) => question.jamo === jamo);
        await initPageData(dataset || questionMap[0]);
    };
    hideScoreWrapper();
    toggleHideRetryButton();
    toggleJamoButton(jamoButtonElement);
    await initPage(jamoButtonElement);
};
const initEventListeners = (canvasWorkspaces) => {
    (() => {
        const getNewButtonElementForInitEventListener = (id, innerText, classNames) => {
            const originButtonElement = document.querySelector(`#${id}`);
            let newButtonElementWithoutEventListener;
            if (originButtonElement === null) {
                newButtonElementWithoutEventListener = document.createElement("button");
                newButtonElementWithoutEventListener.id = id;
                classNames.forEach((className) => newButtonElementWithoutEventListener.classList.add(className));
                newButtonElementWithoutEventListener.innerText = innerText;
            }
            else {
                newButtonElementWithoutEventListener = originButtonElement.cloneNode(true);
            }
            return newButtonElementWithoutEventListener;
        };
        const getNewDoneButtonElementForInitEventListener = () => getNewButtonElementForInitEventListener("done", "결과 보기", ["cylinder-button"]);
        const getNewReplayButtonElementForInitEventListener = () => getNewButtonElementForInitEventListener("replay", "다시보기", ["cylinder-button", "disp-none"]);
        const overrideElement = (originElement, newElement) => {
            if (originElement !== null) {
                originElement.remove();
            }
            const wrapperElement = document.querySelector("#page-control-button-wrapper");
            if (wrapperElement === null) {
                throw new Error("Need essentials!");
            }
            wrapperElement.insertAdjacentElement("afterbegin", newElement);
        };
        const overrideDoneButtonElement = () => overrideElement(document.querySelector("#done"), getNewDoneButtonElementForInitEventListener());
        const overrideReplayButtonElement = () => overrideElement(document.querySelector("#replay"), getNewReplayButtonElementForInitEventListener());
        overrideDoneButtonElement();
        overrideReplayButtonElement();
    })();
    EventManager.addEventHandler("click", document.querySelector("#replay"), async () => {
        for (const canvasWorkspace of canvasWorkspaces) {
            const originHandwritingViewLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_VIEW_LAYER_ID);
            const handwritingEvents = originHandwritingViewLayer.cloneEvents();
            canvasWorkspace.removeLayer(originHandwritingViewLayer);
            const newHandwritingViewLayer = await canvasWorkspace.addHandwritingStaticLayer(CanvasLayerId.HANDWRITING_VIEW_LAYER_ID);
            const pathLayer = canvasWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID);
            handwritingEvents.forEach((handwritingEvent, handwritingEventIndex) => {
                newHandwritingViewLayer.addEvent(new HandwritingBoundReplayEvent(handwritingEvent.cloneLine(), pathLayer, handwritingEventIndex));
            });
            await newHandwritingViewLayer.draw();
        }
    });
    EventManager.addEventHandler("click", document.querySelector("#done"), async () => {
        const initScore = () => {
            const getScore = (canvasWorkspaces) => {
                const getJudgeableEvents = (handwritingEvents, pathEvents) => {
                    const minLength = pathEvents.length > handwritingEvents.length ?
                        handwritingEvents.length : pathEvents.length;
                    const judgeableLength = minLength;
                    return {
                        handwritingEvents: handwritingEvents.slice(0, judgeableLength),
                        pathEvents: pathEvents.slice(0, judgeableLength),
                    };
                };
                let workspacesScoreSum = 0;
                canvasWorkspaces.forEach((canvasWorkspace) => {
                    const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                    const pathLayer = canvasWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID);
                    const originHandwritingEvents = handwritingLayer.cloneEvents();
                    const originPathEvents = pathLayer.cloneEvents();
                    const { handwritingEvents } = getJudgeableEvents(originHandwritingEvents, originPathEvents);
                    const judgeableInOutBoundLines = handwritingEvents.map((handwritingEvent, index) => pathLayer.getLineBoundsInPath(index, handwritingEvent.cloneLine()));
                    const maxLength = originHandwritingEvents.length > originPathEvents.length ? originHandwritingEvents.length : originPathEvents.length;
                    const unmatchedLength = maxLength - handwritingEvents.length;
                    let inOutBoundLines = judgeableInOutBoundLines;
                    for (let i = 0; i < unmatchedLength; i++) {
                        inOutBoundLines = inOutBoundLines.concat([[false]]);
                    }
                    const inOutBoundsScores = inOutBoundLines.map((inOutBounds) => {
                        const inBounds = inOutBounds.filter((inOutBound) => inOutBound);
                        return inBounds.length / (inOutBounds.length || 1);
                    });
                    const inOutBoundsScoreSum = inOutBoundsScores.reduce((acc, currentScore) => acc + currentScore, 0);
                    workspacesScoreSum += (inOutBoundsScoreSum / (inOutBoundsScores.length || 1)) * 100;
                });
                return Math.floor(workspacesScoreSum / (canvasWorkspaces.length || 1));
            };
            const canvasWorkspacesLineAdded = canvasWorkspaces.filter((canvasWorkspace) => {
                const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                return handwritingLayer.eventSize > 0;
            });
            document.querySelector("#score").innerText = getScore(canvasWorkspacesLineAdded).toString();
        };
        const changeHandwritingBounded = async (canvasWorkspaces) => {
            for (const canvasWorkspace of canvasWorkspaces) {
                const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                const pathLayer = canvasWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID);
                const handwritingViewLayer = await canvasWorkspace.addHandwritingStaticLayer(CanvasLayerId.HANDWRITING_VIEW_LAYER_ID);
                const handwritingEvents = handwritingLayer.cloneEvents();
                handwritingEvents.forEach((handwritingEvent, handwritingEventIndex) => {
                    handwritingViewLayer.addEvent(new HandwritingBoundEvent(handwritingEvent.cloneLine(), pathLayer, handwritingEventIndex));
                });
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
    document.querySelector("#score-wrapper")?.classList.remove("disp-none");
};
const hideScoreWrapper = () => {
    document.querySelector("#score-wrapper")?.classList.add("disp-none");
};
const toggleViewRetryButton = () => {
    const retryButton = document.querySelector("#retry");
    const replayButton = document.querySelector("#replay");
    const doneButton = document.querySelector("#done");
    retryButton?.classList.remove("disp-none");
    replayButton?.classList.remove("disp-none");
    doneButton?.classList.add("disp-none");
};
const toggleHideRetryButton = () => {
    const retryButton = document.querySelector("#retry");
    const replayButton = document.querySelector("#replay");
    const doneButton = document.querySelector("#done");
    retryButton?.classList.add("disp-none");
    replayButton?.classList.add("disp-none");
    doneButton?.classList.remove("disp-none");
};
const hideClearCanvasButtons = (canvasWorkspaces) => {
    canvasWorkspaces.forEach((canvasWorkspace) => {
        const firstLayer = canvasWorkspace.getLayerByIndex(0);
        if (firstLayer !== undefined) {
            firstLayer.canvasManager.ctx.canvas.closest(".canvas-wrapper")?.querySelector(".clear-canvas")?.classList.add("disp-none");
        }
    });
};
