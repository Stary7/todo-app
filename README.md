# Welcome to Your Expo App 🚀

This Expo project is configured to work with a backend service and includes details on the API endpoints and deployment links.

## Project Overview

This app is connected to the backend service hosted at:

- **Backend URL**: `https://backend-todo-suoo.onrender.com`

## API Endpoints

### Authentication

- **Register User**
  - **URL**: `/api/auth/register`
  - **Method**: POST
  - **Request Body**:
    ```json
    {
      "username": "your_username",
      "email": "your_email@example.com",
      "password": "your_password"
    }
    ```
  - **Success Response**:
    - **Code**: 201
    - **Content**: `{ "message": "User registered successfully" }`

- **Login User**
  - **URL**: `/api/auth/login`
  - **Method**: POST
  - **Request Body**:
    ```json
    {
      "email": "your_email@example.com",
      "password": "your_password"
    }
    ```
  - **Success Response**:
    - **Code**: 200
    - **Content**: `{ "token": "your_jwt_token" }`

### Tasks

- **Get Tasks**
  - **URL**: `/api/tasks`
  - **Method**: GET
  - **Headers**:
    - `Authorization: Bearer <your_jwt_token>`
  - **Success Response**:
    - **Code**: 200
    - **Content**: `[ { "id": "task_id", "title": "Task Title", "completed": false } ]`

- **Create Task**
  - **URL**: `/api/tasks`
  - **Method**: POST
  - **Request Body**:
    ```json
    {
      "title": "New Task Title"
    }
    ```
  - **Headers**:
    - `Authorization: Bearer <your_jwt_token>`
  - **Success Response**:
    - **Code**: 201
    - **Content**: `{ "id": "task_id", "title": "New Task Title", "completed": false }`

- **Update Task**
  - **URL**: `/api/tasks/{id}`
  - **Method**: PUT
  - **Request Body**:
    ```json
    {
      "title": "Updated Task Title",
      "completed": true
    }
    ```
  - **Headers**:
    - `Authorization: Bearer <your_jwt_token>`
  - **Success Response**:
    - **Code**: 200
    - **Content**: `{ "id": "task_id", "title": "Updated Task Title", "completed": true }`

- **Delete Task**
  - **URL**: `/api/tasks/{id}`
  - **Method**: DELETE
  - **Headers**:
    - `Authorization: Bearer <your_jwt_token>`
  - **Success Response**:
    - **Code**: 200
    - **Content**: `{ "message": "Task deleted successfully" }`

## Deployment

To build the app for preview or production, use the following commands:

- **Build for Preview** (APK for Android):
  ```bash
  eas build --profile preview --platform android

 

![App Screenshot](./assets/todo-app.png)

## Application url--->https://expo.dev/accounts/starydv-7/projects/todo-app/builds/004e7f38-0e18-473c-8d26-b0139639ce0f