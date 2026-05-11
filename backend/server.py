import asyncio
import serial
import websockets
import json
from datetime import datetime

ser = serial.Serial('COM3', 9600, timeout=1)

HIGH = 3000
LOW = 2000


def detect_gesture(f1, f2, f3, f4):

    if f1 > HIGH and f2 > HIGH and f3 > HIGH and f4 > HIGH:
        return "Good morning"

    elif f1 < LOW and f2 > HIGH and f3 > HIGH and f4 > HIGH:
        return "Our project is Smart Sensor Glove"

    elif f1 > HIGH and f2 < LOW and f3 > HIGH and f4 > HIGH:
        return "It supports speech impaired individuals"

    elif f1 < LOW and f2 < LOW and f3 > HIGH and f4 < LOW:
        return "We are Team Cognexis"

    elif f1 < LOW and f2 < LOW and f3 < LOW and f4 < LOW:
        return "Cognexis"

    return ""


async def handler(websocket):

    while True:
        try:
            line = ser.readline().decode().strip()

            if not line:
                continue

            values = line.split(",")

            if len(values) != 4:
                continue

            f1, f2, f3, f4 = map(int, values)

            gesture = detect_gesture(f1, f2, f3, f4)

            data = {
                "gesture": gesture,
                "sensor_values": [f1, f2, f3, f4],
                "timestamp": datetime.now().strftime("%H:%M:%S")
            }

            await websocket.send(json.dumps(data))

            await asyncio.sleep(0.15)

        except:
            continue


async def main():
    async with websockets.serve(handler, "localhost", 8765):
        print("WebSocket running at ws://localhost:8765")
        await asyncio.Future()


asyncio.run(main())
