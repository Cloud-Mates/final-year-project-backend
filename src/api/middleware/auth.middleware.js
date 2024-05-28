import fs from 'fs/promises'
import sha256 from 'crypto-js/sha256.js';

import rootDirPath from '../../utils/rootDirPath.js'

export default async (req, res, next) => {

    const passkey = req?.headers?.passkey;

    const encpasskey = sha256(passkey).toString();

    const rootDir = rootDirPath();

    const secret = await fs.readFile(`${rootDir}/secret-key`, { encoding: "utf8" });


    if (encpasskey != secret) {
        return res.status(401).send({ message: "unauthorized access" })
    }

    return next();
}