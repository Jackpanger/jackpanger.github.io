---
title: Quick Start
createTime: 2024/11/12 14:35:05
permalink: /guide/materials/font-end-frameworks/deno/quick-start/
tags:
  - Deno
  - Quick Start
---

## Installation

[Relevant Link](https://docs.deno.com/runtime/getting_started/installation/)

::: code-tabs
@tab Shell

```sh
curl -fsSL https://deno.land/install.sh | sh
```

@tab Homebrew

```sh
brew install deno
```

@tab Windows PowerShell

```sh
irm https://deno.land/install.ps1 | iex

```

:::

## Initialize a new project

```sh
deno init my_project

```

This will create a new directory called my_project with the following structure:

```sh
my_project
├── deno.json
├── main_test.ts
└── main.ts
```

A deno.json file is created to configure your project, and two TypeScript files are created; main.ts and main_test.ts. The main.ts file is where you'll write your application code, on initial creation it will contain a simple program which adds two numbers together. The main_test.ts file is where you can write tests, initially it will contain a test for your addition program.

## Run your project

```sh
$ deno main.ts
Add 2 + 3 = 5
```

## Run your tests

Deno has a built in test runner. You can write tests for your code and run them with the deno test command. Run the tests in your new project with:

```sh
$ deno test
running 1 test from ./main_test.ts
addTest ... ok (1ms)

ok | 1 passed | 0 failed (3ms)
```

## Setting up your editor/IDE (Visual Studio Code )

In the Extensions tab, search for "Deno" and install the extension by Denoland.

Next, open the Command Palette by pressing `Ctrl+Shift+P` and type `Deno: Initialize Workspace Configuration`. Select this option to configure Deno for your workspace.
