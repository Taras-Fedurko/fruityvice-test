# Fruityvice Frontend Application

## [Live Demo](https://fruityvice-test.vercel.app/)

## Overview

### Key Features:
- **Dynamic Data Fetching:** Fetch fruit data from the Fruityvice API.
- **State Management:** Efficiently manage state without unnecessary re-renders.
- **Error Handling:** Error boundary using `react-error-boundary`.
- **Data Visualization:** Visualize fruit nutrition data using interactive charts.

## Technology Stack

### 1. Material UI
- [**@mui/material**](https://mui.com/material-ui/getting-started/overview/)
- [**@mui/icons-material**](https://mui.com/material-ui/material-icons/)

Used for building a responsive and consistent UI with Material Design components, ensuring clean and user-friendly interfaces.

### 2. React query
- [**@tanstack/react-query**](https://tanstack.com/query/v4)

Simplifies server-side state management with caching, background updates, and synchronization, allowing for efficient and scalable data fetching and management.

### 3. Axios
- [**axios**](https://axios-http.com/)

Chosen for its simplicity and reliability in making HTTP requests to the Fruityvice API, ensuring smooth and consistent data handling.

### 4. Chartjs
- [**chart.js**](https://www.chartjs.org/) + [**react-chartjs-2**](https://react-chartjs-2.js.org/)

Integrated to create interactive and visually appealing charts for representing fruit nutrition data, providing an intuitive and dynamic user experience.

### 5. React Error Boundary
[**react-error-boundary**](https://github.com/bvaughn/react-error-boundary)

Implemented to handle potential runtime errors gracefully, offering fallback UIs and ensuring uninterrupted user interactions. Choose to install this application to save time on development.

## Testing Strategy
I have implemented integration tests focusing on the core functionality to ensure the app behaves as expected across different user interactions.

- **Integration Tests**: Focus on the Container component, simulating user interactions with the app as a whole.
- **Testing Tools**: 
  - **@testing-library/react** and **@testing-library/user-event** for clean and maintainable UI interaction tests.
  - **Jest** as the test runner, though I recommend **Vite** for larger projects due to its faster performance.
  
  _Note: Since the tests are designed to cover the app's flow, some components like Jar and Fruit are not tested individually._

## How to Run the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run the tests:**
   ```bash
   npm test
   ```

## Why I Chose These Technologies

Each library and tool was chosen with scalability, maintainability, and performance in mind:

- **@mui/material**: Provides a rich set of pre-built components to create a polished UI with minimal effort.
- **@tanstack/react-query**: Enables powerful, declarative data fetching and caching, which improves performance and developer experience.
- **axios**: Simplifies HTTP requests, especially when working with APIs, by providing an easy-to-use API with excellent error handling.
- **chart.js**: Provides extensive charting options and is widely trusted for building data visualizations.
- **react-error-boundary**: Enhances error handling and recovery, creating a robust and user-friendly experience.
