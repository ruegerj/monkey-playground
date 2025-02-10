# Work Journal

> All [requirements](./requirements.md) are tracked as GitHub issues and manged on a dedicated [KanBan board](https://github.com/users/ruegerj/projects/1).

This document lists all efforts going towards the implementation of the project.

| Date       | Time (h) | Description                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 05.02.2025 | 2h       | - Technology research & conception <br/> - Write project requirements & specification                                                                                                                                                                                                                                                                                                               |
| 06.02.2025 | 5h       | - Initialize SvelteKit app & setup workspace <br/> - Implement GitHub OAuth flow for sign-in & sign-up ([#2][i2]) <br/> - Implement sample page utilizing the session data including sign-out option ([#2][i2])                                                                                                                                                                                     |
| 07.02.2025 | 9h       | - Setup GitHub workflows to continuously build & test the app (CI pipeline) <br/> - Setup [ShadCn](https://shadcn-svelte.com/) as UI component library <br/> - setup [uplugin-icons](https://github.com/unplugin/unplugin-icons) in order to use [Iconifiy](https://iconify.design/) icons in the app <br/> - Setup FFI bindings to call go-binary (monkey compiler) from NodeJS context ([#1][i1]) |
| 10.02.2025 | _INSERT_ | - Setup FFI bindings to call go-binary (monkey compiler) from NodeJS context ([#1](i1))                                                                                                                                                                                                                                                                                                             |

[i1]: https://github.com/ruegerj/monkey-playground/issues/1
[i2]: https://github.com/ruegerj/monkey-playground/issues/2
