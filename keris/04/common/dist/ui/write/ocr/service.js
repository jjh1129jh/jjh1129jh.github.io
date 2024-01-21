import { EventManager } from "../../../common/handwriting/service/EventManager.js";
import { toggleViewElementInParent } from "../../../common/common.js";
import { CanvasLayerId, createHTMLElement, initDictationBoard, Message } from "../../../common/ui.js";
import { CanvasWorkspace } from "../../../common/handwriting/workspace/CanvasWorkspace.js";
import { ScanService } from "../../../common/handwriting/service/ScanService.js";
import { ocr } from "../../../service/ocr.js";
document.addEventListener("DOMContentLoaded", async () => {
    initCommonEventListeners();
    const script = getSpacedString(7);
    const answerCanvasWorkspaceGroups = await initAnswer(script);
    initEventListeners(answerCanvasWorkspaceGroups);
    initMultiPlatformUsable();
});
const initMultiPlatformUsable = () => EventManager.addEventHandler("pointermove", document.body, (e) => e.preventDefault());
const getSpacedString = (count) => [...Array(count)].map(() => " ").join().replaceAll(",", "");
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
    return await initDictationBoard(question, 1, boardWrapperElement, createAnswerCanvasWrapper, 80, 80, false);
};
const initCommonEventListeners = () => {
    EventManager.addEventHandler("click", document.querySelector("#close-window"), () => {
        alert(Message.CANNOT_CLOSE_WINDOW);
    });
    EventManager.addEventHandler("click", document.querySelector("#retry"), () => location.reload());
};
const initEventListeners = (answerCanvasWorkspaceGroups) => {
    EventManager.addEventHandler("click", document.querySelector("#done"), async () => {
        try {
            const ocrResults = [];
            for (const answerCanvasWorkspaceGroup of answerCanvasWorkspaceGroups) {
                const answerImages = await createWordOcrImages(answerCanvasWorkspaceGroup);
                ocrResults.push(await ocr(answerImages));
            }
            setOcrResultText(ocrResults);
            viewResult();
            viewRetryButton();
        }
        catch (e) {
            const errorMessage = document.querySelector("#error-message");
            if (errorMessage !== null) {
                errorMessage.innerText = "오류가 발생하였습니다.";
            }
            console.error(e);
            viewErrorResult();
            viewRetryButton();
        }
    });
};
const setOcrResultText = (answers) => {
    const textWrapper = document.querySelector("#ocr-result-text");
    if (textWrapper !== null) {
        answers.forEach((answer, answerIndex) => {
            if (answerIndex > 0) {
                const spanElement = document.createElement("span");
                spanElement.innerText = " / ";
                textWrapper.append(spanElement);
            }
            const answerWords = answer.split(" ");
            answerWords.forEach((answerWord, wordIndex) => {
                if (wordIndex > 0) {
                    textWrapper.append(document.createTextNode(" "));
                }
                const spanElement = document.createElement("span");
                spanElement.innerText = answerWord;
                textWrapper.append(spanElement);
            });
        });
    }
};
const createWordOcrImages = async (rawCanvasWorkspaces) => {
    const getWordCanvasWorkspaces = (canvasWorkspaces) => {
        const isStroked = (handwritingLayer) => handwritingLayer !== undefined && handwritingLayer.eventSize > 0;
        const wordCanvasWorkspaces = [];
        let wordCanvasWorkspace = [];
        canvasWorkspaces.forEach((canvasWorkspace, index) => {
            const handwritingLayer = canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID);
            if (isStroked(handwritingLayer)) {
                wordCanvasWorkspace.push(canvasWorkspace);
                if (index === canvasWorkspaces.length - 1) {
                    wordCanvasWorkspaces.push(wordCanvasWorkspace);
                }
            }
            else {
                if (wordCanvasWorkspace.length > 0) { // saved
                    wordCanvasWorkspaces.push(wordCanvasWorkspace);
                    wordCanvasWorkspace = [];
                }
            }
        });
        return wordCanvasWorkspaces;
    };
    const ocrImages = [];
    const wordCanvasWorkspaces = getWordCanvasWorkspaces(rawCanvasWorkspaces);
    for (const wordCanvasWorkspace of wordCanvasWorkspaces) {
        ocrImages.push(await getWordHandwritingImage(wordCanvasWorkspace));
    }
    return ocrImages;
};
const getWordHandwritingImage = async (canvasWorkspaces) => {
    const createDestCanvasWorkspace = (handwritingLayers) => {
        const destCanvasWrapper = document.querySelector("#copy-canvas-wrapper");
        const sumWidth = handwritingLayers.reduce((acc, current) => acc + current.canvasManager.width, 0);
        const maxHeight = handwritingLayers.reduce((max, current) => max > current.canvasManager.height ? max : current.canvasManager.height, 0);
        return new CanvasWorkspace(destCanvasWrapper, sumWidth, maxHeight);
    };
    const createWordHandwritingImage = async (handwritingLayers, destCanvasLayer) => {
        const drawImages = async (handwritingLayers) => {
            let dx = 0;
            for (const handwritingLayer of handwritingLayers) {
                const srcCanvasManager = handwritingLayer.canvasManager;
                const scanService = new ScanService(srcCanvasManager);
                const blob = await scanService.read();
                const srcImage = new Image();
                srcImage.src = URL.createObjectURL(blob);
                await new Promise((resolve) => {
                    srcImage.onload = () => {
                        destCanvasLayer.canvasManager.ctx.drawImage(srcImage, 0, 0, srcCanvasManager.width * srcCanvasManager.scaleWeight, srcCanvasManager.height * srcCanvasManager.scaleWeight, dx, 0, srcCanvasManager.width, srcCanvasManager.height);
                        dx += srcCanvasManager.width;
                        srcImage.remove();
                        resolve();
                    };
                });
            }
        };
        const read = async (canvasLayer) => {
            const destScanService = new ScanService(canvasLayer.canvasManager);
            return await destScanService.read();
        };
        await drawImages(handwritingLayers);
        return await read(destCanvasLayer);
    };
    const handwritingLayers = canvasWorkspaces.map((canvasWorkspace) => canvasWorkspace.getLayerById(CanvasLayerId.HANDWRITING_LAYER_ID));
    const destCanvasWorkspace = createDestCanvasWorkspace(handwritingLayers);
    const destCanvasLayer = await destCanvasWorkspace.addFilledLayer();
    destCanvasLayer.fill("white");
    const blob = await createWordHandwritingImage(handwritingLayers, destCanvasLayer);
    destCanvasWorkspace.clear();
    return blob;
};
const viewResult = () => toggleViewElementInParent(document.querySelector("#result-wrapper"));
const viewErrorResult = () => toggleViewElementInParent(document.querySelector("#result-error-wrapper"));
const viewRetryButton = () => toggleViewElementInParent(document.querySelector("#retry"));
