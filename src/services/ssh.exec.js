import ssh from 'ssh2';

export default async function test(config) {
    const { host, port, username, privateKey, command } = config;

    return new Promise((resolve, reject) => {
        try {
            const conn = new ssh.Client();

            conn.on('error', (error, stream) => {
                conn.end();
                return resolve({ message: "Authentication failed", error: error, status: 400 });
            })

            conn.on('ready', () => {
                conn.exec(command, (error, stream) => {
                    if (error) {
                        return resolve({ message: "Failed to establish a connection", error: error, status: 400 });
                    }
                    stream.on('close', (code, signal) => {
                        // console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                        conn.end();
                        return resolve({ message: "Connection established!", data: '', status: 200 });
                    }).on('data', (data) => {
                        // console.log('STDOUT: ' + data);
                        return resolve({ message: "Command executed with status code 0", data: '' + data, status: 200 });
                    }).stderr.on('data', (data) => {
                        // console.log('STDERR: ' + data);
                        return resolve({ message: "Command executed with status code 1", data: '' + data, status: 200 });
                    });
                });
            }).connect({
                host: host,
                port: port,
                username: username,
                privateKey: privateKey
            });

        } catch (error) {
            // console.log(error);
            return resolve({ message: "Something went wrong", error: error, status: 400 });
        }
    })
}


