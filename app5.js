const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.get("/luck", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';
  console.log('あなたの運勢は' + luck + 'です');
  res.render('luck', { number: num, luck: luck });
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand; // ユーザーが出した手
  let win = Number(req.query.win) || 0; // 勝利数
  let total = Number(req.query.total) || 0; // 試合数

  console.log({ hand, win, total });

  const num = Math.floor(Math.random() * 3 + 1); // 1から3のランダムな数を生成
  let cpu = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';

  // 勝敗の判定を行う
  let judgement = '';
  if (hand === 'グー') {
    if (cpu === 'チョキ') {
      judgement = '勝ち';
      win += 1; // 勝った場合は勝利数を1増やす
    } else if (cpu === 'パー') {
      judgement = '負け';
    } else {
      judgement = '引き分け';
    }
  } else if (hand === 'チョキ') {
    if (cpu === 'パー') {
      judgement = '勝ち';
      win += 1; // 勝った場合は勝利数を1増やす
    } else if (cpu === 'グー') {
      judgement = '負け';
    } else {
      judgement = '引き分け';
    }
  } else if (hand === 'パー') {
    if (cpu === 'グー') {
      judgement = '勝ち';
      win += 1; // 勝った場合は勝利数を1増やす
    } else if (cpu === 'チョキ') {
      judgement = '負け';
    } else {
      judgement = '引き分け';
    }
  }

  // 試合数を増やす
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render('janken', display);
});

app.get("/look", (req, res) => {
  let hand = Number(req.query.hand);
  let total = Number(req.query.total) || 0;

  console.log({ hand, total });

  const cpu = Math.floor(Math.random() * 100 + 1);

  let judgement = '';
  if (hand === cpu) {
    judgement = 'すごい！正解！';
    total += 1;
  } else {
    judgement = `まだまだ！答えは${cpu}でした！`;
  }

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    total: total
  };
  res.render('look', display);
});



app.get("/action", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win) || 0;
  let total = Number(req.query.total) || 0;
  let tame = Number(req.query.tame) || 0;

  console.log({ hand, win, total, tame });

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'シールド';
  else if (num == 2) cpu = 'ためる';
  else cpu = '攻撃';

  let judgement = '';

  if (hand == 'シールド') {
    if (cpu == '攻撃') {
      judgement = '勝ち';
      win += 1;
      total += 1;
    } else {
      judgement = '引き分け';
    }
  } else if (hand == 'ためる') {
    tame += 1; 
    if (cpu == '攻撃') {
      judgement = '負け';
      total += 1;
    } else {
      judgement = '引き分け';
    }
  } else if (hand == '攻撃') {
    if (tame > 0) {
      tame -= 1;
      if (cpu == 'シールド') {
        judgement = '負け';
        total += 1;
      } else if (cpu == '攻撃') {
        judgement = '相打ち';
        total += 1;
      } else if (cpu == 'ためる') {
        judgement = '勝ち';
        win += 1;
        total += 1;
      }
    } else {
      judgement = '攻撃できないよ！';
    }
  } else {
    judgement = '無効な手だよ！';
  }

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total,
    tame: tame
  };
  res.render('action', display);
});




app.listen(8080, () => console.log("Example app listening on port 8080!"));
