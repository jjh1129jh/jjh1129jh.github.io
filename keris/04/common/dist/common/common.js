export const toggleViewElementInParent = (viewElement) => toggleViewElementInWrapper(viewElement, viewElement?.parentElement);
export const toggleViewElementInWrapper = (viewElement, wrapperElement) => {
    if (viewElement !== null && wrapperElement !== null) {
        Array.from(wrapperElement.children).forEach((child) => hide(child));
        show(viewElement);
    }
};
export const show = (element) => element?.classList.remove("disp-none");
export const hide = (element) => element?.classList.add("disp-none");
export const setInnerTextIfElementExists = (text, element) => {
    if (element !== null) {
        element.innerText = text;
    }
};
export var EvaluateSpeechSubject;
(function (EvaluateSpeechSubject) {
    EvaluateSpeechSubject["KO_HOLISTIC"] = "\uC720\uCC3D\uC131";
    EvaluateSpeechSubject["KO_PITCH"] = "\uC5B5\uC591";
    EvaluateSpeechSubject["KO_SEGMENT"] = "\uBA85\uB8CC\uC131";
    EvaluateSpeechSubject["KO_RATE"] = "\uC18D\uB3C4";
    EvaluateSpeechSubject["KO_PHONOLOGY"] = "\uC815\uD655\uC131";
})(EvaluateSpeechSubject || (EvaluateSpeechSubject = {}));
export const isInit = (object) => object !== undefined && object !== null;
export const hasEvaluationError = (evaluateResult) => evaluateResult.sentenceLevel.proficiencyScore.filter((proficiencyScore) => proficiencyScore.name !== "acoustic" && proficiencyScore.score < 1).length > 0;
