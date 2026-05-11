# Smart Sensor Glove for Real-Time Gesture-Based Voice Communication Using ESP32

A wearable assistive communication system that detects hand gestures using flex sensors and converts them directly into real-time voice output. The project is designed to support speech-impaired individuals through a low-cost, portable, and practical solution.

# Smart Sensor Glove for Real-Time Gesture-Based Voice Communication Using ESP32

## Overview
This project is a wearable assistive communication system for speech-impaired individuals.

The glove uses flex sensors to detect finger movements. ESP32 reads the sensor values and sends them to a Python-based program that identifies predefined gestures and generates voice output in real time.

## Features
- real-time gesture recognition
- direct voice output
- low-cost wearable prototype
- ESP32 based
- Python speech synthesis

## Hardware Components
- ESP32 development board
- 4 flex sensors
- 10kΩ resistors
- glove
- breadboard
- jumper wires

## Software Tools
- Arduino IDE
- Python
- PySerial
- pyttsx3

## Gesture Mapping

| Gesture | Output |
|---|---|
| Open hand | Hello |
| Closed fist | I need help |
| Thumb bent | Yes |
| Index bent | No |

## Working Flow

Hand gesture → flex sensors → ESP32 → serial communication → Python → voice output

## Team Members
- Sujitha C
- Rithikaa V
- ## Institution
SRI SHAKTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY
