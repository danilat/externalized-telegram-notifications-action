
const core = require('@actions/core');
const sendMessage = require('../sendMessage');
require('dotenv').config()

test('run the action', async () => {
  core.getInput = (argName) => {
    switch (argName) {
      case "to":
        return process.env.TO;
      case "content-url":
        return process.env.URL;
      case "token":
        return process.env.TOKEN;
        case "parse-mode":
          return "html";
    }
  }; 
  const reponse = await sendMessage()
  expect(reponse.message.statusCode).toBe(200);
});