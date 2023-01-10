# PRACTICE ONE

## OVERVIEW

- This document provides information about ReactJS Practice one.

## TIMELINE

- 10 days

## TEAMSIZE

- 1 dev

## TARGET

- This practice will let you understand about simple flow in React:
> - Using React hooks
> - Filter and editing list of products
> - Create mocking data: write a JSON file and import it into your JSX
> - User edits/deletes product item
> - react routing
> - form validation, form events
> - list -> filter, sort, search, pagination (edited) 
> - API request, error handling
> - authentication
- At the end of this step, trainees should be able to join projects for hot training and doing React Components.

## TECHNICAL

- HTML5, SASS
- NODE (18.12.1)
- ReactJS (18.12.0)
- React Router (6.6.1)
- Axios (1.2.2)

## REQUIREMENTS

* Database:
- User: (id, first name, last name, email, avatarUrl,role, password). We have 2 roles: (Manager, Developer)
* Ticket: (id, name description, createDate, dueDate, createBy, assignBy, priority, status). Priority: (High, low, normal). Status: (Todo, > - > - In-progress, Review, Done)
* Login page.  Refer to the design
- Using Json server create API login
- Admin can login with email and password.
* Home page. Refer to the design
-  Using Json server create API get list tickets.
- Admin can sort by create date, due date,  can filter by assign user, priority, status, and can search by name
- Only show 10 items for 1 page. Admin can see next previous page
- Admin can create a ticket.
- Admin can delete, edit a ticket. If role is Developer they have permission do on ticket that they had created

## HOW TO RUN THE PROJECT

- Step 1: Clone the project and select branch develop
> ```
> git  clone git@github.com:dunguyen-3112/training-03-React.git
> git checkout develop
> ```

- Step 2: Install dependencies  and run Backend
> ```
> cd json-server
> npm install
> npm start
> ```

- Step 3: Install dependencies  and run frontend
> ```
> cd app
> npm install
> npm run dev
> ```

- Hold `ctrl` and `click` on the successfully created localhost link to view the website

- View the project on port: `http://localhost:5173`
