# training-03-React

### OVERVIEW

- A revision of React training plan which focuses on the latest version  of React (v17.0.2). It will help trainees learn React fundamentals step by step following the instructions and hands-on practices.

### TIMELINE

- Main concepts and Hooks: 2 weeks
- Advanced Guides: 2 weeks

### PREREQUISITE

- ES6
- TypeScript
- Install nvm and Node.js
- Install pnpm 

### GETTING STARTED

#### BUILD TOOL

#### HELLO WORLD

### MAIN CONCEPTS (1 week)
- Step by step learning the main concepts. For any examples you found in the documentation, you can try it in your first React app created above.
- While reading Main Concepts, you can also do hands-on practice at the same time.

+ Introduction JSX
+ Rendering Elements
+ Components and Props
+ State and Lifecycle
+ Handling Events
+ Conditional Rendering
+ Lists and Keys
+ Forms
+ Lifting State Up
+ Composition with Inheritance
+ Thinking in React

#### STORBOOK

- Storybook is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing and documentation.
- Init storybook into your first React app:

+ init storybook

```
pnpx sb init -s
```

+ install dependencies

```
pnpm install
```

+ run it

```
pnpm storybook
```

+ Try to create a Storybook for your example components. https://storybook.js.org/tutorials/intro-to-storybook/react/en/simple-component/

#### PRACTICE

- Apply  what you have read to rewrite your previous HTML/CSS practice into React components.

+ Apply Storybook into your practice.

### REACT HOOKS

- Hooks let you use state and other React features without writing a class.
+ Introduction Hooks
+ Hooks at a Glance
+ useState Hook
+ useEffect Hook
+ useRef Hook
+ Rules Hook
+ Hooks API Reference

#### DEBUGGING
- Debug tools: React Devtools. Supported have to present how this tool works.
- Install the extension and use it to debug your practices.

#### PRACTICE

- This practice will let you understand about simple flow in React:
+ Using React hooks
+ Filter and editing list of products
* Create mocking data: write a JSON file and import it into your JSX
* User edits/deletes product item
* react routing
* form validation, form events
* list -> filter, sort, search, pagination (edited) 
* API request, error handling
* authentication
- At the end of this step, trainees should be able to join projects for hot training and doing React Components.

### ADVANCED GUIDES (1 week)
- All the topics in the Advanced Guides need to be read. Some highlight topics need more focus:

+ Code-Splitting
+ Context
+ Error Boundaries
+ Higher-Order Components
+ Optimizing Performance
+ Profiler
+ Uncontrolled Components
+ Building Your Own Hooks

#### DATA FETCHING

- SWR - React Hooks for Data Fetching
- Getting Started - use pnpm to install instead of npm/yarn
+ Global Configuration
+ Data Fetching
+ Error Handling
+ Auto Revalidation
+ Pagination

#### UNIT TESTING (Optional)

- Supporters should give a brief introduction for unit testing and how to set it up.
+ Testing Overview
* Jest
* React Test Library
* Test Utilities
+ Testing Recipes
+ Testing environments

#### PRACTICE

- Adding more features for practice 2
* User adds & deletes a product
* User deletes a product
* User opens product detail page
* User edits product information in product detail page
* Product data will be kept when refresh the page
* Apply useContext and useReducer for state management
* Apply SWR for fetching data - from a simple json-server
- Unit test coverage should greater than 80%

### REFERENCES
- This is not in the plan, trainees may want to read more about debugging tools, state management, etc.

> Debugging Tools

+ React perf
+ Reactotron

> State Management

+ Redux
* Redux logger
* Redux DevTools
+ Mobx
> React Component libraries
+ Chakra UI
+ Material UI
+ React Bootstrap
+ Ant Design
> React Router
+ React Router v6


