const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const PORT =
    process.env.NODE_ENV === 'production'
        ? process.env.PORT
        : config.get('port') || 5000;

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/link', require('./routes/link.route'));
app.use('t', require('./routes/redirect.route'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        app.listen(PORT, () =>
            console.log(`App has running on port - ${PORT}`)
        );
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
