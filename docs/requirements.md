# Monkey Playground - Requirements

## Table of Contents

- [Motivation](#motivation)
- [Tech-Stack](#tech-stack)
- [Requirements](#requirements)
  - [1 - Writing & Running Monkey Code](#story-1-writing--running-monkey-code-must)
  - [2 - Sign-up/Sign-in](#story-2-sign-upsign-in-must)
  - [3 - Saving Code Snippets](#story-3-saving-code-snippets-must)
  - [4 - Overview & Display saved Code Snippets](#story-4-overview--display-saved-code-snippets-must)
  - [5 - Share Code Snippets](#story-5-share-code-snippets-should)
  - [6 - View Bytecode of executed Code](#story-6-view-bytecode-of-executed-code-could)
  - [7 - View AST of executed Code](#story-7-view-ast-of-executed-code-could)
  - [8 - Delete Code Snippets](#story-8-delete-code-snippets-should)

## Motivation

[Monkey](https://monkeylang.org/) is a fictional programming language used to teach on how write a custom interpreter & compiler from scratch using Go (see books _[Writing An Interpreter In Go](https://interpreterbook.com/)_ & _[Writing A Compiler in Go](https://interpreterbook.com/)_ by [Thorsten Ball](https://github.com/mrnugget)).
Within the context of these books, one builds a simple REPL (read-eval-print loop) for interacting with the compiler and playing around with the language.
However this is a bit cumbersome to use and makes it hard for potentially interested people to try out Monkey.

_Monkey Playground_ aims to solve this by providing a sandbox for writing, compiling and running Monkey code directly in the Browser.
Additionally, signed-in users have the possibility to safe their Monkey snippets and share them with potential future Monkey enjoyers.

## Tech-Stack

- Fullstack Framework: [SvelteKit](https://svelte.dev/docs/kit/introduction)
- DB: [SQLight](https://www.sqlite.org/)
- ORM: [Drizzle](https://orm.drizzle.team/)
- Auth: OAuth 2.0 (OICD) - Github
- UI: [TailwindCSS](https://tailwindcss.com/) or Tailwind-based library
- Icons: [unplugin-icons](https://github.com/unplugin/unplugin-icons) as source
- Monkey Backbone: [monkey](https://github.com/ruegerj/monkey)[^1]

[^1]: standalone monkey compiler written in Go (artefact of book write along), serves as backbone for compiling & running monkey code

## Requirements

### Story-1: Writing & Running Monkey Code (_Must_)

As a user, I want to write monkey code and run it, in order to see its outcome.

**Acceptance criteria:**

- Every user (anonymous & signed-in) can write code in a multiline input field
- The written code must contain at least one character and mustn't exceed a configurable upper limit, for it to be executed
- Signed-in users can compile & run their code remotely
- Outcome of the ran code is displayed in dedicated area
- If the compiler runs into an error compiling (semantics) or running the code, an according error message is provided as outcome

### Story-2: Sign-up/Sign-in (_Must_)

As an anonymous user, I want to be able to either sign-up or sign-in with my GitHub account, in order to get access to the extended features of the app for authenticated users with an account.

**Acceptance criteria:**

- When an unknown user signs-up, they will be guided through the common OAuth-flow granting the necessary permissions for their GitHub account
- After successfully completing the OAuth-flow (permissions granted) a user account is created and the user is signed in
- When a user has already an account and signs-up with the same GitHub-account, they are signed-in and no new account is created (implicit login)

### Story-3: Saving Code Snippets (_Must_)

As a signed-in user, I want to be able to save a Monkey code snippet in order to extend it at a later point in time.

**Acceptance criteria:**

- The written code must contain at least one character and mustn't exceed a configurable upper limit
- For saving a snippet a dedicated name (mandatory, text) must be supplied
- If the snippet was saved before, its code and name can be modified and saved again (when meeting the validation criteria)

### Story-4: Overview & Display saved Code Snippets (_Must_)

As a signed-in user, I want to be able to see all my previously saved code snippets in order to access and view them.

**Acceptance criteria:**

- If the user hasn't saved any snippets an according information is displayed
- All saved snippets are listed with their name
- Every saved snippets code can be inspected when selecting it from the list
- Anonymous users can't view other peoples snippets (unless explicitly shared, see [#5](#story-5-share-code-snippets-should))

### Story-5: Share Code Snippets (_Should_)

As a signed-in user, I want to be able to share a snippet in order for other people to view it.

**Acceptance criteria:**

- When a snippet is shared, the users receives a unique share link
- Every user (anonymous & signed-in) can view the snippet, when in possession of the share link
- No user except the owner of the snippet is able to edit it (name, code etc.)
- Signed-in users are able to run a shared snippet

### Story-6: View Bytecode of executed Code (_Could_)

As a signed-in user, I want to view the generated bytecode after executing code in order to inspect it.

**Acceptance criteria:**

- After a successful execution of the code, the generated bytecode is displayed in a dedicated area
- If the compilation of the code failed, no bytecode is displayed
- The bytecode can be viewed both i a raw (hexadecimal) and readable (named mnemonics, numbers etc.) format

### Story-7: View AST of executed Code (_Could_)

As a signed-in user, I want to view the generated abstract syntax tree (AST) after executing the code in order to inspect the codes structure and understand the language better.

**Acceptance criteria:**

- After a successful execution of the code, the generated AST is displayed in a dedicated area
- If the compilation of the code failed, no AST is displayed

### Story-8: Delete Code Snippets (_Should_)

As a signed-in user, I want to be able to delete a previously saved snippet of mine when I don't need it anymore. [^2]

**Acceptance criteria:**

- Signed-in users can delete snippets one at a time
- An additional confirmation should occur before the snippet is deleted
- No user except the owner of the snippet is able to delete it

[^2]: Issue was identified during the development process. Since it was a relatively "low hanging fruit" it was prioritized before the other _could_ stories.
