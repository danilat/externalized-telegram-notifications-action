const core = require("@actions/core");
const http = require("@actions/http-client");
const httpClient = new http.HttpClient();

async function sendMessage(){
  const contentUrl = core.getInput("content-url");
  const token = core.getInput("token");
  const to = core.getInput("to");
  const parse_mode = core.getInput("parse-mode");

  try {
    let response = await httpClient.get(contentUrl)
  
    let message = encodeURI(await response.readBody())
    console.log("Message to send to telegram:", message)
    console.log("Sending message to send:", to)
    const telegramEndopoint = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${to}&text=${message}&parse_mode=${parse_mode}`
    const telegramResponse = await httpClient.post(telegramEndopoint)
    const telegramMessage = await telegramResponse.readBody()
    console.log("Telegrams response:", telegramMessage)
    if (telegramResponse.message.statusCode != 200) {
      core.setFailed("Telegram FAILED", telegramMessage);
    } else {
      core.setOutput("Telegrams SUCCESS", telegramMessage);
    }
    return telegramResponse;
  } catch(error){
    core.setFailed("Some error happened", error);
  }

}

module.exports = sendMessage;