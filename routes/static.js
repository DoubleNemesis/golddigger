import path from 'path';
import fs from 'fs/promises';
import { sendResponse } from '../utils/sendResponse.js';
import { getContentType } from '../utils/getContentType.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function serveStatic(req, res) {
    const publicDir = path.join(__dirname, '../public');
    let filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    const contentType = getContentType(extname);

    try {
        const content = await fs.readFile(filePath);
        sendResponse(res, 200, contentType, content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            const content = await fs.readFile(path.join(publicDir, '404.html'));
            sendResponse(res, 404, 'text/html', content);
        } else {
            sendResponse(res, 500, 'text/html', `Server Error: ${err.code}`);
        }
    }
}
