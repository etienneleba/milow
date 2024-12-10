# Milow

---

## Setup

Milow runs on [Bun](https://bun.sh/), make sure you first install the latest Bun version.

1. Install Milow globally as a CLI:

   ```sh
   curl -sSL https://raw.githubusercontent.com/etienneleba/milow/main/install.sh | bash
   ```

2. Get your API key from [OpenAI](https://platform.openai.com/account/api-keys). Make sure you add payment details, so API works.

3. Set the key to Milow config:

   ```sh
   milow config set API_KEY <your_api_key>
   ```

   Your api key is stored locally in `~/.milow/config` config file and is not stored anywhere in any other way.

4. Set the command to run the tests:

   ```sh
   milow config set RUN_TESTS "npm run test"
   ```

Your api key is stored locally in `~/.milow/config` config file and is not stored anywhere in any other way.


## Usage

You can call Milow like this:

```sh
milow run
```

## Payments

You pay for your own requests to OpenAI API. Milow uses latest GPT model by default, check it's [pricing](https://openai.com/pricing). Maximum response tokens are set to 2000, you can adjust it via `ait config set maxTokens=<number>`.

I couldn't manage ChatGPT model to solve the problem. I tried to few shot it with a response example, it doesn't understand what I want. If you want to try manage it via ChatGPT — test it and open a PR 🚀
