import exec from "../../services/ssh.exec.js"


export default {

    exec: async (req, res, next) => {
        const { host, port, username, command } = req?.body || {};

        if (!host || !port || !username || req?.files?.[0]?.fieldname != "privateKey" ) {
           return res.status(404).send({ message: "parameters missing" })
        }

        const result = await exec({ host, port, username, privateKey: req?.files?.[0]?.buffer, command })
        return res.status(result?.status || 304).send({ ...result })
    }

}