gameLoop = require './gameLoop.coffee'
gameSettings = require './config/gameSettings.coffee'

document.addEventListener 'DOMContentLoaded', ->

    canvas = document.createElement 'canvas'

    canvas.setAttribute 'width', gameSettings.width
    canvas.setAttribute 'height', gameSettings.height
    canvas.setAttribute 'style', 'border: solid thin black;display: inline-block;margin: 10px'

    document.body.appendChild canvas

    gameLoop.resume()
