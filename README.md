# ejs-multifiles

Render multiple files from one EJS template.

## Index

- [ejs-multifiles](#ejs-multifiles)
  - [Index](#index)
  - [Installation](#installation)
  - [Syntax](#syntax)
  - [Usage](#usage)
  - [Command-line utility](#command-line-utility)

## Installation

```sh
npm install ejs-multifiles
```

The Github project is found at [https://github.com/allnulled/ejs-multifiles](https://github.com/allnulled/ejs-multifiles).

The NPM package is found at [https://www.npmjs.com/package/ejs-multifiles](https://www.npmjs.com/package/ejs-multifiles).

## Syntax

The syntax to follow is the same as [`ejs`](https://ejs.co/#docs) but intercepting the [`file-splitter-syntax`](https://github.com/allnulled/file-splitter-syntax).

For example:

```
<%
const user = "Carl";
const age = 33;
%>
<## index.js ##>
console.log("Hello, <%-user%>!");
console.log("I know you are <%-age%>");

<## package.json ##>
{}

<## mkdir src ##>

Carpeta para ficheros fuente.

<## mkdir test ##>

Carpeta para ficheros de test.

<## mkdir dist ##>

Carpeta para ficheros de distribución.
```

As you can see, we define in `default.txt` file (the default file of every template) some variables.

Later, we use them to render that data from `index.js`.

After that, we render another file. It does not use any data, though.

You see? With EJS you can only render 1 file, and the logic of that file is born and ended at the same file. However, with `ejs-multifiles` you can break this pattern, and enjoy templates logic across multiple files.

## Usage

The test verses as follows:

```js
const fs = require("fs");
const emf = require("ejs-multifiles");
const contents = fs.readFileSync(__dirname + "/examples/project1.emf").toString();

const main = async function() {
    try {
        await emf.render(contents, {}, { basedir: __dirname + "/examples/project1" });
        await emf.renderFile(__dirname + "/examples/project2.emf", {}, {});
    } catch (error) {
        console.log(error);
    }
};

main();
```

In it, we demonstrate the 2 ways of using this library:
 
  - by `render` function
  - by `renderFile` function

Both return a `Promise` as any asynchronous function.

The first function, `render`, receives:
  - `template`, the text.
  - `parameters`, the parameters.
  - `configurations`, the configurations of the templates.

The second function, `renderFile`, receives:
  - `file`, the file to render.
  - `parameters`, the parameters.
  - `configurations`, the configurations of the templates.

In order to distinguish this kind of template files, I set the extension `emf` to every template file. However, this is not mandatory in any way.

## Command-line utility

This is how it works, pretty easy:

```sh
emf file1.emf file2.emf file3.emf
```

The rendered file can produce undetermined number of files by itself. So this acts as a uncompresser of files and projects with its limitations, but moreover enabling variables and code.