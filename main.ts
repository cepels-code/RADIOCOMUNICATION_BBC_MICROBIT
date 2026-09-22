// Index for tracking the current letter (0 = A, 1 = B, 2 = C, ...)
let letterIndex = 0
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Set radio group
radio.setGroup(1)

// Display the first letter "A" on startup
basic.showString(alphabet.charAt(letterIndex))

// --- BUTTON B: Cycle through the alphabet ---
input.onButtonPressed(Button.B, function () {
    letterIndex = (letterIndex + 1) % alphabet.length // Move to the next letter
    basic.showString(alphabet.charAt(letterIndex))
})

// --- BUTTON A: Send the selected letter via radio ---
input.onButtonPressed(Button.A, function () {
    let selectedLetter = alphabet.charAt(letterIndex)

    // Send the letter as a string message
    radio.sendString(selectedLetter)

    // Quick flash effect to confirm sending
    basic.clearScreen()
    basic.pause(100)
    basic.showString(selectedLetter)
})

// --- BUTTONS A+B: Clear screen and reset ---
input.onButtonPressed(Button.AB, function () {
    letterIndex = 0
    basic.clearScreen()
})

// --- RECEIVE MESSAGE: Display received letter ---
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})