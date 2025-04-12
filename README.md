# Project Overview

## Technology Stack

This project leverages the following technologies:

- **TanStack Query** - For efficient asynchronous state management
- **Zustand** - For lightweight global state management
- **React Native Reusables** - For consistent UI components and theming

## Project Creation Flow

1. User initiates project creation
   - System validates that the prompt is valid
2. System creates a project in Firestore
   - System generates a random duration between 30-60 seconds
   - This duration is assigned to the new project and saved to Firestore
3. UI updates ETA Chip showing the loading indicator and the ETA
4. ETA countdown reaches zero
5. Mock project completion process executes
   - System updates the project's ETA to 0 in Firestore
6. "Your Design is Ready" chip is displayed
7. User can now view the project by pressing the "Your Design is Ready" chip

## Development Notes

- I did not implement react-hook-form because the project is small and the form is simple.
- I did not implemented any backend expect simple firestore database.
