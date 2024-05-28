import k8s from '@kubernetes/client-node';
const kc = new k8s.KubeConfig();

export default async function events(config) {
    try {

        kc.loadFromString(JSON.stringify(config));
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

        const events = (await k8sApi.listEventForAllNamespaces()).body

        const data = {
            events
        }

        return { message: "events data fatched successfully!", data, status: 200 };
    } catch (error) {
        return { error: error, status: 400 };
    }
}