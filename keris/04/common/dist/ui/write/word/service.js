import { CanvasWorkspace } from "../../../common/handwriting/workspace/CanvasWorkspace.js";
import { PathEvent } from "../../../common/handwriting/event/PathEvent.js";
import { EventManager } from "../../../common/handwriting/service/EventManager.js";
import { TextPathFactory } from "../../../lib/canvas-path-helper.mjs.js";
import { CanvasLayerId, createHTMLElement, initDictationBoard, Message } from "../../../common/ui.js";


var urlParam = function(name){
    var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || 0;
}
try{
	var wordQuest =  aiWordText[Number(urlParam('quest'))];
}catch(e){
	var wordQuest =  aiWordText[0];
}
console.log(wordQuest)



document.addEventListener("DOMContentLoaded", async () => {
    const question = wordQuest;
    await initQuestion(question);
    const canvasWorkspaces = await initAnswer(question);
    initEventListeners(canvasWorkspaces);
    initCommonEventListeners();
    initMultiPlatformUsable();
});
const initMultiPlatformUsable = () => EventManager.addEventHandler("pointermove", document.body, (e) => e.preventDefault());
const initQuestion = async (question) => {
    /*const exampleImageWrapper = document.querySelector("#example-image-wrapper");
    if (exampleImageWrapper === null) {
        throw new Error("Need essentials!");
    }*/
    const characters = question.split("");
    for (const character of characters) {
        // initialize workspace
        const workspaceWrapperElement = document.createElement("div");
        /*exampleImageWrapper.append(workspaceWrapperElement);*/
        const canvasWorkspace = new CanvasWorkspace(workspaceWrapperElement, 150, 150);
        // add layers
        // add grid layer
        const gridLayer = await canvasWorkspace.addGridLayer();
        gridLayer.draw("grey");
        if (character !== " ") {
            // add font layer
            const pathLayer = await canvasWorkspace.addPathWithMonoColorLayer("black");
            pathLayer.addEvent(new PathEvent(await TextPathFactory.create({
                text: character,
                fontSize: 150,
                fontUrl: "./common/dist/assets/NanumBarunGothicBold.ttf",
            }), { x: 10, y: -2 }));
            pathLayer.draw();
        }
    }
};
const createAnswerCanvasWrapper = () => createHTMLElement(`
    <div class="canvas-wrapper">
      <div class="flex-end">
        <button class="clear-canvas" title="clear">X</button>
      </div>
      <div class="workspace"></div>
    </div>
  `);
const initAnswer = async (question) => {
    const boardWrapperElement = document.querySelector("#answer-wrapper");
    if (boardWrapperElement === null) {
        throw new Error("Need essentials!");
    }
    return await initDictationBoard(question, 1, boardWrapperElement, createAnswerCanvasWrapper, 150, 150, true);
};
const initCommonEventListeners = () => {
    EventManager.addEventHandler("click", document.querySelector("#close-window"), () => {
        alert(Message.CANNOT_CLOSE_WINDOW);
    });
    EventManager.addEventHandler("click", document.querySelector("#retry"), () => location.reload());
};
const initEventListeners = (canvasWorkspaceGroups) => {
    EventManager.addEventHandler("click", document.querySelector("#done"), async () => {
        const initScore = () => {
            const getScore = () => {
                const handwritingAddedCanvasWorkspaces = canvasWorkspaceGroups.filter((canvasWorkspaces) => {
                    const handwritingAddedCanvasWorkspaceGroup = canvasWorkspaces.filter((canvasWorkSpace) => {
                        const handwritingLayer = canvasWorkSpace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                        return handwritingLayer.eventSize > 0;
                    });
                    return handwritingAddedCanvasWorkspaceGroup.length > 0;
                });
                let score = 0;
                handwritingAddedCanvasWorkspaces.forEach((canvasWorkspaces) => {
                    const canvasWorkspacesLineAdded = canvasWorkspaces.filter((canvasWorkspace) => {
                        const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                        return handwritingLayer.eventSize > 0;
                    });
                    const canvasWorkspacesHasPathAndLineAdded = canvasWorkspacesLineAdded.filter((canvasWorkspace) => canvasWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID) !== undefined);
                    let workspacesScoreSum = 0;
                    canvasWorkspacesHasPathAndLineAdded.map((canvasWorkspace) => {
                        const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                        const pathLayer = canvasWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID);
                        workspacesScoreSum += getLayerInboundRatios(handwritingLayer, pathLayer) * 100;
                    });
                    score += workspacesScoreSum / (canvasWorkspacesHasPathAndLineAdded.length || 1);
                });
                return Math.floor(score / (handwritingAddedCanvasWorkspaces.length || 1));
            };
            document.querySelector("#score").innerText = getScore().toString();
        };
        const changeHandwritingBackendColor = async (canvasWorkspaces) => {
            const canvasWorkspacesLineAdded = canvasWorkspaces.filter((canvasWorkspace) => {
                const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                return handwritingLayer.eventSize > 0;
            });
            const canvasWorkspacesHasPathAndLineAdded = canvasWorkspacesLineAdded.filter((canvasWorkspace) => canvasWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID) !== undefined);
            const scores = [];
            canvasWorkspacesHasPathAndLineAdded.map((canvasWorkspace) => {
                const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                const pathLayer = canvasWorkspace.getLayerById(CanvasLayerId.PATH_LAYER_ID);
                scores.push(getLayerInboundRatios(handwritingLayer, pathLayer));
            });
            const confirmIndices = [];
            scores.forEach((score, index) => {
                if (score < 0.5) {
                    confirmIndices.push(index);
                }
            });
            confirmIndices.forEach((canvasWorkspaceIndex) => {
                const canvasWorkspaceConfirmable = canvasWorkspacesHasPathAndLineAdded[canvasWorkspaceIndex];
                const handwritingLayer = canvasWorkspaceConfirmable.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                const pinkColor = "rgba(255, 192, 203, 0.3)";
                handwritingLayer.canvasManager.ctx.canvas.style.backgroundColor = pinkColor;
            });
        };
        initScore();
        viewScoreWrapper();
        toggleViewRetryButton();
        const handwritingAddedCanvasWorkspaces = canvasWorkspaceGroups.filter((canvasWorkspaces) => {
            const handwritingAddedCanvasWorkspaceGroup = canvasWorkspaces.filter((canvasWorkSpace) => {
                const handwritingLayer = canvasWorkSpace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
                return handwritingLayer.eventSize > 0;
            });
            return handwritingAddedCanvasWorkspaceGroup.length > 0;
        });
        for (const canvasWorkspaces of handwritingAddedCanvasWorkspaces) {
            await changeHandwritingBackendColor(canvasWorkspaces);
        }
        for (const canvasWorkspaces of canvasWorkspaceGroups) {
            setUnEditableHandwritingLayers(canvasWorkspaces);
            hideClearCanvasButtons(canvasWorkspaces);
        }
    });
};
const viewScoreWrapper = () => {
    document.querySelector("#score-wrapper")?.classList.remove("disp-none");
};
const toggleViewRetryButton = () => {
    const retryButton = document.querySelector("#retry");
    const doneButton = document.querySelector("#done");
    retryButton?.classList.remove("disp-none");
    doneButton?.classList.add("disp-none");
};
const getLayerInboundRatios = (handwritingLayer, pathLayer) => {
    const pathEvents = pathLayer.cloneEvents();
    const handwritingEvents = handwritingLayer.cloneEvents();
    const inOutLineBounds = handwritingEvents.map((handwritingEvent) => handwritingEvent.cloneLine().map((coordinate) => {
        let isBound = false;
        pathEvents.some((pathEvent, index) => {
            isBound = pathLayer.isPointInPath(index, coordinate);
            return isBound;
        });
        return isBound;
    }));
    const linesInboundRatios = inOutLineBounds.map((lineInOutBounds) => {
        const lineInbounds = lineInOutBounds.filter((isPointBound) => isPointBound);
        return lineInbounds.length / (lineInOutBounds.length || 1);
    });
    return linesInboundRatios.reduce((acc, currentValue) => acc + currentValue, 0)
        / (linesInboundRatios.length || 1);
};
const hideClearCanvasButtons = (canvasWorkspaces) => {
    canvasWorkspaces.forEach((canvasWorkspace) => {
        const firstLayer = canvasWorkspace.getLayerByIndex(0);
        if (firstLayer !== undefined) {
            firstLayer.canvasManager.ctx.canvas.closest(".canvas-wrapper")?.querySelector(".clear-canvas")?.classList.add("disp-none");
        }
    });
};
const setUnEditableHandwritingLayers = (canvasWorkspaces) => {
    canvasWorkspaces.forEach((canvasWorkspace) => {
        const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
        handwritingLayer.setUnEditable();
    });
};
