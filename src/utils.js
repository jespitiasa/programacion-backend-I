import crypto from 'crypto'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filepath = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filepath)

export const errorHandler = (res, error) => {
    console.log(error)
    res.setHeader('Content-Type','application/json');
    return res.status(500).json({error})
}

export const generateId = () => {
    return crypto.randomUUID()
}