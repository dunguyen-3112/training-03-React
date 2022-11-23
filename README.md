<<<<<<< HEAD
# training-03-React

### OVERVIEW

A revision of React training plan which focuses on the latest version  of React (v17.0.2). It will help trainees learn React fundamentals step by step following the instructions and hands-on practices.

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
We use Vite which is a build tool that aims(muc tieu, am chi) to provide a faster and leaner development experience for modern web projects.
#### HELLO WORLD

If you have pnpm installed already, let’s start your first project using pnpm and vite. You can either choose template as react, or react-ts if you want to init with TypeScript. From your terminal, run:
```javascript

pnpm create vite my-react-app -- --template react-ts

# Install and run on local:

cd my-react-app
pnpm install
pnpm dev

```
Open your browser at [http://localhost:3000](http://localhost:3000/)

Try modifying your React component and see how it changes.

If you are using VS Code and Windows Subsystem for Linux (WSL), make sure you installed extension [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
Start reading [Hello World](https://reactjs.org/docs/hello-world.html) documentation.           

### MAIN CONCEPTS (1 week)
- Step by step learning the main concepts. For any examples you found in the documentation, you can try it in your first React app created above.
- While reading Main Concepts, you can also do hands-on practice at the same time.

+ [Introduction JSX](https://reactjs.org/docs/introducing-jsx.html)
+ [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
+ [Components and Props](https://reactjs.org/docs/components-and-props.html)
+ [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
+ [Handling Events](https://reactjs.org/docs/handling-events.html)
+ [Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)
+ [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
+ [Forms](https://reactjs.org/docs/forms.html)
+ [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)
+ [Composition with Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)
+ [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

#### STORBOOK

- [Storybook](https://storybook.js.org/) is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing and documentation.

- Init storybook into your first React app:

```javascript
# init storybook

pnpx sb init -s

# install dependencies

pnpm install

# run it

pnpm storybook

```

Try to create a Storybook for your example components. https://storybook.js.org/tutorials/intro-to-storybook/react/en/simple-component/

#### PRACTICE

Apply  what you have read to rewrite your previous HTML/CSS practice into React components.

+ Apply Storybook into your practice.

### REACT HOOKS

- Hooks let you use state and other React features without writing a class.
+ [Introduction Hooks](https://reactjs.org/docs/hooks-intro.html)
+ [Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)
+ [useState Hook](https://reactjs.org/docs/hooks-state.html)
+ [useEffect Hook](https://reactjs.org/docs/hooks-effect.html)
+ [useRef Hook](https://reactjs.org/docs/hooks-reference.html#useref)
+ [Rules Hook](https://reactjs.org/docs/hooks-rules.html)
+ [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)

#### DEBUGGING
- Debug tools: React Devtools. Supported have to present how this tool works.
- Install the extension and use it to debug your practices.

#### PRACTICE

This practice will let you understand about simple flow in React:
+ Using React hooks
+ Filter and editing list of products
> Create mocking data: write a JSON file and import it into your JSX
> User edits/deletes product item
> react routing
> form validation, form events
> list -> filter, sort, search, pagination (edited) 
> API request, error handling
> authentication
At the end of this step, trainees should be able to join projects for hot training and doing React Components.

### ADVANCED GUIDES (1 week)
All the topics in the Advanced Guides need to be read. Some highlight topics need more focus:

+ [Code-Splitting](https://reactjs.org/docs/code-splitting.html)
+ [Context](https://reactjs.org/docs/context.html)
+ [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
+ [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html)
+ [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html)
+ [Profiler](https://reactjs.org/docs/profiler.html)
+ [Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html)
+ [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)

#### DATA FETCHING

- [SWR] - React Hooks for Data Fetching
- [Getting Started](https://swr.vercel.app/docs/getting-started) - use pnpm to install instead of npm/yarn
+ [Global Configuration](https://swr.vercel.app/docs/global-configuration)
+ [Data Fetching](https://swr.vercel.app/docs/data-fetching)
+ [Error Handling](https://swr.vercel.app/docs/error-handling)
+ [Auto Revalidation](https://swr.vercel.app/docs/revalidation)
+ [Pagination](https://swr.vercel.app/docs/pagination)

#### UNIT TESTING (Optional)

- Supporters should give a brief introduction for unit testing and how to set it up.
+ [Testing Overview](https://reactjs.org/docs/testing.html)
> [Jest](https://jestjs.io/)
> [React Test Library](https://testing-library.com/docs/react-testing-library/intro/)
> [Test Utilities](https://reactjs.org/docs/test-utils.html)
+ [Testing Recipes](https://reactjs.org/docs/testing-recipes.html)
+ [Testing environments](https://reactjs.org/docs/testing-environments.html)

#### PRACTICE

- Adding more features for practice 2
> User adds & deletes a product
> User deletes a product
> User opens product detail page
> User edits product information in product detail page
> Product data will be kept when refresh the page
> Apply useContext and useReducer for state management
> Apply SWR for fetching data - from a simple json-server
- Unit test coverage should greater than 80%

### REFERENCES
This is not in the plan, trainees may want to read more about debugging tools, state management, etc.

> Debugging Tools

+ [React perf](https://facebook.github.io/react/docs/perf.html)
+ [Reactotron](https://github.com/infinitered/reactotron)

> State Management

+ [Redux](https://redux.js.org/)
<<<<<<< HEAD
    + [Redux logger](https://github.com/evgenyrodionov/redux-logger)
    + [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
=======
>> [Redux logger](https://github.com/evgenyrodionov/redux-logger)
>> [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
>>>>>>> edit readme file
+ [Mobx](https://mobx.js.org/)
> React Component libraries
+ [Chakra UI](https://chakra-ui.com/)
+ [Material UI](https://mui.com/)
+ [React Bootstrap](https://react-bootstrap.github.io/)
+ [Ant Design](https://ant.design/)
> React Router
+ [React Router v6](https://reactrouter.com/)
<<<<<<< HEAD


=======
# Expense-Management

## Overview

- Finance: Expense Management

* Nowadays, people shop so much that they become unable to regulate their expenditures.
* Many e-commerce websites, particularly in the technological era, such as Tiki, Shoppe, Lazada, and Grab (bikes, marts), make it simple for customers to make purchases online without carefully considering their choices.
* Typically, people buy things like clothing, gadgets, phones, books, coffee, milk tea, and other beverages.
* The following are some issues folks are having today:
  - How can they monitor their expenditures both physically (when they go to the store) and digitally?
  - How can they connect to their banks and various e-commerce sites to monitor their spending?
  - How do they create spending restrictions and notify consumers when they are met?
  - Challenge Statement:
    - Create a solution to address those issues;
    - don't limit yourself to the issues listed above;
    - consider additional issues people are already encountering.
* Notes:
  - Although some e-commerce companies do not offer APIs to access consumer data, for the purposes of this challenge, let's suppose that they do.
=======
>>>>>>> edit readme file

## TECHNICAL

- HTML5: [Link](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
- CSS3: [Link](https://www.w3schools.com/css/)
- Sass: [Link](https://sass-lang.com/)
- Vite: [Link](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- React: [Link](https://reactjs.org/)

## ENVIRONMENT

- Node.js 18.10.0
- npm 8.19.2

## SETUP & RUN

- Install node and npm : [Link](https://nodejs.org/en/)
- Setup and run projectL

```
    git clone https://github.com/dunguyen-3112/Expense-Management.git
    cd Expense-Management
    npm install
    npm run build
    npm run dev
    output: http://localhost:5173/
```
>>>>>>> 64de6ef026cf7b8b977edff45f902e79fa5aa5fd
