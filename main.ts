/**
 * Repository: RADIOCOMUNICATION_BBC_MICROBIT
 * URL: https://github.com/cepels-code/RADIOCOMUNICATION_BBC_MICROBIT
 * Description: A two-way radio alphabet transceiver for BBC micro:bit V2
 * Language: TypeScript (MakeCode micro:bit)
 * 
 * Controls:
 * - Button B: Move forward in the alphabet (A -> B -> C)
 * - Gold Touch Logo: Move backward in the alphabet (C -> B -> A)
 * - Button A: Transmit selected letter via radio
 * - Buttons A+B: Clear both local and remote LED displays
 */

// Track letter position (0 = A, 1 = B, 2 = C, ...)
let letterIndex = 0
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Set radio frequency group (must be identical on all micro:bits)
radio.setGroup(1)

// Display 'A' on startup
basic.showString(alphabet.charAt(letterIndex))

// --- BUTTON B: Move FORWARD in the alphabet (A -> B -> C) ---
input.onButtonPressed(Button.B, function () {
    letterIndex = (letterIndex + 1) % alphabet.length
    basic.showString(alphabet.charAt(letterIndex))
})

// --- GOLD LOGO: Move BACKWARD in the alphabet (C -> B -> A) ---
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    letterIndex = letterIndex - 1
    if (letterIndex < 0) {
        letterIndex = alphabet.length - 1 // Wrap around to Z if going below A
    }
    basic.showString(alphabet.charAt(letterIndex))
})

// --- BUTTON A: Send the selected letter via radio ---
input.onButtonPressed(Button.A, function () {
    let selectedLetter = alphabet.charAt(letterIndex)

    radio.sendString(selectedLetter)

    // Quick flash effect to confirm sending
    basic.clearScreen()
    basic.pause(100)
    basic.showString(selectedLetter)
})

// --- BUTTONS A+B: Clear both local and remote screens ---
input.onButtonPressed(Button.AB, function () {
    radio.sendString("CLEAR")
    letterIndex = 0
    basic.clearScreen()
})

// --- RECEIVE MESSAGE: Display received letter or clear screen ---
radio.onReceivedString(function (receivedString) {
    if (receivedString == "CLEAR") {
        basic.clearScreen()
    } else {
        basic.showString(receivedString)
    }
})