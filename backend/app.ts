import app from './server';

require('dotenv').config();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`SERVER LISTENING ON PORT ${PORT}`));