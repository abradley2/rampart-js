keyDictionary = require './config/keyDictionary.coffee'

class Keys

    constructor: ->
        @keys = {}

        for code, name in keyDictionary
            @keys[name] = false

        document.addEventListener 'keydown', @_keydownHandler
        document.addEventListener 'keyup', @_keyupHandler

    _keydownHandler: (e) =>
        @keys[e.keyCode] = true

    _keyupHandler: (e) =>
        @keys[e.keyCode] = false

    pressed: (key) ->
        return @keys[key]

module.exports = new Keys()