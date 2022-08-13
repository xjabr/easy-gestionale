import app from './server';

import { PORT } from './configuration';

require('dotenv').config();

app.listen(PORT, () => console.log(`SERVER LISTENING ON PORT ${PORT}`));