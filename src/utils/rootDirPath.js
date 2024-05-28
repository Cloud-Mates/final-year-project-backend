import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = () => {
    const dirArray = path.dirname(fileURLToPath(import.meta.url)).split("/");
    const root = dirArray.splice(0, dirArray.length - 2).join("/");
    return root;
}

export default rootDir