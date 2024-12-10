# Milow: The Test-Driven AI Assistant

<br />


Milow is still in beta version, he is waiting for your feedback and contributions. 

<br />

## Setup

Milow runs on [Bun](https://bun.sh/). Ensure you have the latest version of Bun installed before proceeding.

<br />

#### 1. Install Milow globally as a CLI:

   ```sh
   curl -sSL https://raw.githubusercontent.com/etienneleba/milow/main/install.sh | bash
   ```
<br />

#### 2. Obtain your API key. Make sure to add payment details to activate the API:
- [OpenAI](https://platform.openai.com/account/api-keys)

<br />

#### 3. Init Milow :

   ```sh
   milow init # this command creates a milow.config.json file
   ```

This will generate a `milow.config.json` file:

   ```json
   {
      "testCommand": "test", // The command you use to run your tests
      "model": "gpt-4o", // The model you want to use. Run `milow check models` to see all available models
      "viewableFilesPattern": "./{src,tests}/**", // Glob pattern of all files Milow can access
      "contextFilesPattern": "./docs/milow/**" // Glob pattern of files included in Milow's context
   }
   ```

<br />

#### 4. Export the API key:

   ```sh
   export OPENAI_API_KEY=sk-*******
   ```

<br />

#### 5. Set up Milow's documentation context:

Create a `docs/milow` folder to store all documentation Milow can use to understand your project. Examples of useful files include:
- **`business.md`**: Describe the business context of your project.
- **`folder_structure.md`**: Explain the project architecture and the purpose of folders visible to Milow.
- **`technical_stack.md`**: Provide details about the language, framework, and libraries used in the project.
- **`test_strategy.md`**: Describe your testing approach, including the use of mocks, fakes, or in-memory objects, and your workflow (TDD, ATDD, Test-First, Wishful Thinking Programming, etc.).
- **`examples.md`**: List files Milow can use as examples (e.g., controllers, domain models, commands, command handlers, tests, buses, etc.).

The more accurately you describe your project, the more efficient Milow will be in generating quality code.

<br />

---

<br />

## Usage

You can run Milow using the following command:

```sh
milow run
```

You can also provide more specific commands:

```sh
milow run -f ./tests/functional/milow.test.ts
```

```sh
milow run -p "I want to create the AddProductToBasket feature" # This prompt will remain in Milow's context throughout the interaction
``` 

<br />

---

<br />

## Contributing 

[Contributing file](docs/CONTRIBUTING.md)

<br />

---

<br />

## They inspired Milow 
   
   - [di-sukharev/AI-TDD](https://github.com/di-sukharev/AI-TDD)
   - [Bouke Nijhuis | TDD & generative AI - a perfect pairing ?](https://www.youtube.com/watch?v=HpYpctLxfJk)



