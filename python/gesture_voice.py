import serial
import pyttsx3

ser = serial.Serial('COM3', 9600)
engine = pyttsx3.init()

previous = ""

while True:
    try:
        data = ser.readline().decode().strip()
        f1, f2, f3, f4 = map(int, data.split(","))
    except:
        continue

    gesture = ""

    if f1 > 3000 and f2 > 3000 and f3 > 3000 and f4 > 3000:
        gesture = "Hello"

    elif f1 < 2000 and f2 < 2000 and f3 < 2000 and f4 < 2000:
        gesture = "I need help"

    elif f1 < 2000 and f2 > 3000 and f3 > 3000:
        gesture = "Yes"

    elif f2 < 2000 and f1 > 3000 and f3 > 3000:
        gesture = "No"

    if gesture != "" and gesture != previous:
        print("Output:", gesture)
        engine.say(gesture)
        engine.runAndWait()
        previous = gesture
