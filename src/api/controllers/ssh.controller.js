import exec from "../../services/ssh.exec.js"


export default {

    exec: async (req, res, next) => {
        const { host, port, username, privateKey, command } = req?.body || {};

        if (!host || !port || !username || !privateKey ) {
           return res.status(404).send({ message: "parameters missing" })
        }

        const privateKeyBuffer = Buffer.from(privateKey, 'utf-8');
        // console.log(privateKeyBuffer);

        const result = await exec({ host, port, username, privateKey: privateKeyBuffer, command })
        return res.status(result?.status || 304).send({ ...result })
    }

}