import express  from 'express';
import Gun from 'gun';
import cors from 'cors';
import { config } from 'dotenv';

config();
const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(Gun.serve);

app.get('/', (_, res) => {
    res.status(200).json({message: 'Pong', timestamp: new Date().toISOString()});
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

Gun({web: server});