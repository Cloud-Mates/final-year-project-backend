import k8s from '@kubernetes/client-node';
const kc = new k8s.KubeConfig();

export default async function pods(config) {
    try {

        kc.loadFromString(JSON.stringify(config));
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);


        const pods = (await k8sApi.listPodForAllNamespaces()).body

        const data = {
            pods
        }

        return { message: "pods data fatched successfully!", data, status: 200 };
    } catch (error) {
        return { error: error, status: 400 };
    }
}