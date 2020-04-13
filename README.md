# Externalized Telegram Notifications Action

[GitHub Action](https://github.com/features/actions) that sends messages to Telegram, retrieving the message content from an external URL. HTML (default mode) or Markdown formats are both supported.

The purpose of this action is getting a changelog with the changes from an external URL and sending it to a Telegram channel.

You should add configurations for: `to` with a channel id or a chat id , `token` with your telegram token, `content-url` with a public accesible URL that has the content that you want to send. Optionally you can send the `parse_mode` that it'll be used for the telegram API.

## Example usage

```yaml
name: Send notifications to telegram
on:
  push
jobs:
  build:
    name: A job to launch telegram notifications
    runs-on: ubuntu-latest
    steps:
    - name: Send notifications
      id: send_notificsations
      uses: danilat/externalized-telegram-notifications-action@master
      with:
        to: ${{ secrets.TELEGRAM_ID_OR_CHANNEL }}
        token: ${{ secrets.TELEGRAM_TOKEN }}
        content-url: ${{ secrets.CONTENT_URL }}
        parse_mode: html
```

## Considerations

- You can get the Telegram token [creating your bot using BotFather](https://core.telegram.org/bots#3-how-do-i-create-a-bot).
- If you want to send messages to a channel you should use `@channelname` in the `to` variable.
- If you want to send messages to an user you need the id of the conversation, you can get it with `curl https://api.telegram.org/bot<telegram_token>/getUpdates`.
- In the content that responds to `content-url` you should use only the [supported formatting options](https://core.telegram.org/bots/api#formatting-options).
