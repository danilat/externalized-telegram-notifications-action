const core = require('@actions/core');
const github = require('@actions/github');
const http = require('@actions/http-client');
const httpClient = new http.HttpClient();

try {
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  getMessage()
} catch (error) {
  core.setFailed(error.message);
}

async function getMessage(){
  const contentUrl = core.getInput("content-url");
  const token = core.getInput("token");
  const to = core.getInput("to");
  let response = await httpClient.get(contentUrl)
  let message = await response.readBody()
  console.log("Message to send to telegram:", message)
  console.log("Sending message to send:", to)
  const telegramEndopoint = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${to}&text="${message}"`
  const telegramResponse = await httpClient.get(telegramEndopoint)
  const telegramMessage = await telegramResponse.readBody()
  if (telegramResponse.message.statusCode != 200) {
    core.setFailed("Telegram FAILED", telegramMessage);
  } else {
    core.setOutput("Telegrams SUCCESS", telegramMessage);
  }
  console.log("Telegrams response:", telegramMessage)

}
