const app = require('express')();
var mongoose = require('mongoose') // 引入 mongoose
var url = "mongodb://localhost:27017/srm"; // 本地数据库地址

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect(url)
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then((e) => console.log('meow', e));
// connect() 返回一个状态待定（pending）的连接，可以用来判断连接成功或失败
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Successful connection to " + url)
});
module.exports = {
  path: 'api',
  handler: app
}