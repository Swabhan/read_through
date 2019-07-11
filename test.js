var read = require('./src/readThrough').read;



var test = new read('https://www.cnn.com/2019/07/10/us/new-orleans-sinking-into-sea-trnd/index.html');

test.summarize(5);
test.timeToRead();