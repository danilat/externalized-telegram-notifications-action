# Externalized Telegram Notifications Action

[GitHub Action](https://github.com/features/actions) that send messages to Telegram, previously retrieves the message content from an external url. Html (default mode) or markdown formats are both supporte in the retrieved content for the message.

The purpose of this action is get a changelog with the changes from an external url and send it to a telegram channel.

You should add cofigurations for: `to` with a channel id or a chat id , `token` with your telegram token, `content-url` with a public accesible url that has the content that you cant to send. Optionally you can send the `parse_mode` that it'll be used for telegram API.

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

- You'll get the telegram token [when you create your bot using the BotFather](https://core.telegram.org/bots#3-how-do-i-create-a-bot).
- If you want send messages for a channel you should use `@channelname` in `to` variable.
- If you want send messages to a user you need the id of the conversation using, you can get it with `curl https://api.telegram.org/bot<telegram_token>/getUpdates`.
- In the content that responds to `content-url` you should use only the [supported formatting options](https://core.telegram.org/bots/api#formatting-options).