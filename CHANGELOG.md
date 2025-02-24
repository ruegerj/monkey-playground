# 0.6.0

**Features:**

- Saving Code Snippets ([#3](https://github.com/ruegerj/monkey-playground/issues/3))

  - adds a form for either creating a new or updating an existing code snippet
  - adds infrastructure for loading a snippet by its dedicated id as url-parameter
  - adds global error page (e.g. for displaying 404 - Not found when a snippet doesn't exist)

- Overview & Display saved Code Snippets ([#4](https://github.com/ruegerj/monkey-playground/issues/4))
  - adds collapsible sidebar listing all snippets of a signed in user

# 0.5.0

**Features:**

- Writing & Running Monkey Code ([#1](https://github.com/ruegerj/monkey-playground/issues/1))

  - adds global page layout with navbar
  - adds main page for writing code and displaying the result
  - uses koffi for calling the FFI of the monkey-compiler in order to compile and run code

- Sign-up/Sign-in ([#2](https://github.com/ruegerj/monkey-playground/issues/2))
  - uses Lucia Auth in combination with artic to implement GitHub OAuth flow
  - adds cookie-based session auth, using GitHub as identity provider (OAuth)
