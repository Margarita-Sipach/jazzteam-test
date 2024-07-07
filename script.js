const style = getComputedStyle(document.body)
const WRAPPER = {
    WIDTH: parseInt(style.getPropertyValue('--width')),
    HEIGHT: parseInt(style.getPropertyValue('--height')),
}

const START_SUBTITLE_SIZE = parseInt(style.getPropertyValue('--subtitle-size'));
const SUBTITLE_DIF = 10;
const SUBTITLE_SIZE = START_SUBTITLE_SIZE + SUBTITLE_DIF

requestAnimationFrame(moveSubtitle)

const TITLE = document.querySelector('.title');
let titlePoint = 0

function moveTitle(){
    titlePoint += WRAPPER.WIDTH / 20;
    const left = Math.round(-WRAPPER.WIDTH + titlePoint);
    TITLE.style.left = `${left}px`;

    if(left >= 0) {
        return
    }

    requestAnimationFrame(moveTitle)
}


const SUBTITLE = document.querySelector('.subtitle');
let subtitlePoint = 0

function moveSubtitle(){
    subtitlePoint += WRAPPER.HEIGHT / 40;
    const top = Math.round(-WRAPPER.HEIGHT + subtitlePoint)
    SUBTITLE.style.top = `${top}px`
        
    if(top >= 0) {
        subtitlePoint = 0;
        requestAnimationFrame(increaseSubtitle)
        return
    }

    requestAnimationFrame(moveSubtitle)
}
function increaseSubtitle(){
    subtitlePoint += SUBTITLE_DIF / 20;
    const fontSize = START_SUBTITLE_SIZE + subtitlePoint
    SUBTITLE.style.fontSize = `${fontSize}px`
    if(SUBTITLE_SIZE <= fontSize) {
        requestAnimationFrame(moveTitle)
        requestAnimationFrame(rotateBoard)
        requestAnimationFrame(rotateElements)
        requestAnimationFrame(rotateStationery)
        requestAnimationFrame(rotateShapes)
        return
    }
    requestAnimationFrame(increaseSubtitle)
}


const ROTATE_ANGLE = 40;

function rotateUp(params, animation){
    const {element, point, isIncrease} = params
    params.point += (isIncrease ? ROTATE_ANGLE : -ROTATE_ANGLE) / 20;
    
    element.style.transform = `rotate(${point}deg)`;
    if(params.point >= ROTATE_ANGLE) params.isIncrease = !params.isIncrease;
    
    if(params.point <= 0) {
        return 'finish'
    }
    requestAnimationFrame(animation)
}

function rotateDown(params, animation){
    const {element, point, isIncrease} = params
    params.point += (isIncrease ? ROTATE_ANGLE : -ROTATE_ANGLE) / 20;
    
    element.style.transform = `rotate(${point}deg)`;
    if(params.point <= -ROTATE_ANGLE) params.isIncrease = !isIncrease;

    if(params.point >= 0) {
        return 'finish'
    }
    requestAnimationFrame(animation)
}

let boardParams = {
    isIncrease: false,
    element: document.querySelector('.img_board'),
    point: 0
}
function rotateBoard(){
    if(rotateDown(boardParams, rotateBoard) === 'finish') return
}

let elementsParams = {
    isIncrease: true,
    element: document.querySelector('.img_elements'),
    point: 0
}
function rotateElements(){
    if(rotateUp(elementsParams, rotateElements) === 'finish') return
}

let shapesParams = {
    isIncrease: true,
    element: document.querySelector('.img_shapes'),
    point: 0
}
function rotateShapes(){
    if(rotateUp(shapesParams, rotateShapes) === 'finish') return
}

let stationeryParams = {
    isIncrease: false,
    element: document.querySelector('.img_stationery'),
    point: 0
}
function rotateStationery(){
    if(rotateDown(stationeryParams, rotateStationery) === 'finish') return
}