const express = require('express');
const axios = require('axios');
const slackToken = process.env.slackToken
process.env.slackToken = "xoxp-4023700489232-4000006880482-3999969954899-3164d0598ad4cefb383170ed45ee0c47"
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/form-submit', async (req, res) => {
  const { text, emoji, time } = req.body;
  console.log(text, emoji, time);
  const { data } = await axios.post(
    'https://slack.com/api/users.profile.set',
    {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ` *${text}*\n`,
          },
        },
      ],
    },
    {
      "profile": {
        "status_text": text,
        "status_emoji": emoji,
        "status_expiration": time
      }
    },
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${slackToken}`
      }
    }
  );
  console.log(data)
  res.redirect("/")
})

app.listen(4000, () => {
  console.log('Example app listening on port 4000!')
})