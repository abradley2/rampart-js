class GameLoop extends createjs.EventDispatcher

    constructor: ->
        @ticker = createjs.Ticker

        # configuration
        @ticker.framerate = 50
        @ticker.timingMode = 'RAF'

        # keys
        @keys = require './keys.coffee'

        # field map
        @field = require './field.coffee'

        # canons, fire, build
        @mode = 'build'

    pause: ->
        @ticker.removeAllEventListeners()

    resume: ->
        @ticker.addEventListener 'tick', @onAnimationFrame

    onAnimationFrame: =>
        return true

    onUpdate: =>
        return true

module.exports = new GameLoop()