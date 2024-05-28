import k8s from'@kubernetes/client-node';
const kc = new k8s.KubeConfig();

export default async function namespaces(config) {
    try {

        kc.loadFromString(JSON.stringify(config));
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);


        const namespaces = (await k8sApi.listNamespace()).body


        const data = {
            namespaces
        }

        return { message: "namespaces data fatched successfully!", data, status: 200 };
    } catch (error) {
        return { error: error, status: 400 };
    }
}