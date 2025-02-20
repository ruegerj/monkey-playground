# 0.5.0

**Features:**

- Writing & Running Monkey Code ([#1](https://github.com/ruegerj/monkey-playground/issues/1))

  - adds global page layout with navbar
  - adds main page for writing code and displaying the result
  - uses koffi for calling the FFI of the monkey-compiler in order to compile and run code

- Sign-up/Sign-in ([#2](https://github.com/ruegerj/monkey-playground/issues/2))
  - uses Lucia Auth in combination with artic to implement GitHub OAuth flow
  - adds cookie-based session auth, using GitHub as identity provider (OAuth)
