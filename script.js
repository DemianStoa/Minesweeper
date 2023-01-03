//DISPLAY/UI

import { createBoard, markTile, TILE_STATUSES, revealTile, checkWin, checkLose} from "./minesweeper.js"

const BOARD_SIZE = 8
const NUMBER_OF_MINES =5


const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)

const boardElement = document.querySelector(".board")
const minesLeftText = document.querySelector("[data-mine-count]")
const messageText = document.querySelector(".subtext")

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click', () => {
            revealTile(board, tile)
            checkGameEnd()
        })
        tile.element.addEventListener('contextmenu', e=> {
            e.preventDefault()
            markTile(tile)
            listMineLeft()
        })
    })
})
boardElement.style.setProperty("--size",BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES

function listMineLeft() {
    const markedTileCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)
    
    minesLeftText.textContent = NUMBER_OF_MINES - markedTileCount
}

function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)

    if(win || lose) {
        boardElement.addEventListener("click", stopProp, {capture: true})
        boardElement.addEventListener("contextmenu", stopProp, {capture: true})
    }
    if(win) {
        messageText.textContent = "you win"
    }
    if (lose) {
        messageText.textContent = "game over"
        board.forEach(row => {
            row.forEach(tile =>{
                if(tile.mine) {
                   
                    if(tile.status === TILE_STATUSES.MARKED) { markTile(tile)}
                    revealTile(board, tile)
                }
            })
        })
    }
}

function stopProp(e) {

    e.stopImmediatePropagation()
}
//1. POPULATE A BOARD WITH TILES/MINES
//2. LEFT CLICK ON TILES
 //A. REVEAL TILES
//3.RIGHT CLICK ON TILES
  // A.MARK TILES
//4. CHECK FOR WIN/LOSE