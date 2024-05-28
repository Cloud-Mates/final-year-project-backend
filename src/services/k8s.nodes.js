import k8s from '@kubernetes/client-node';
const kc = new k8s.KubeConfig();

export default async function nodes(config) {
    try {

        kc.loadFromString(JSON.stringify(config));
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);


        const nodes = (await k8sApi.listNode()).body

        const data = {
            nodes
        }

        return { message: "nodes data fatched successfully!", data, status: 200 };
    } catch (error) {
        return { error: error, status: 400 };
    }
}