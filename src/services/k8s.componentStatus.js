import k8s from '@kubernetes/client-node';
const kc = new k8s.KubeConfig();

export default async function componentStatus(config) {
    try {

        kc.loadFromString(JSON.stringify(config));
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);


        const componentStatus = (await k8sApi.listComponentStatus()).body


        const data = {
            componentStatus
        }

        return { message: "component status data fatched successfully!", data, status: 200 };
    } catch (error) {
        return { error: error, status: 400 };
    }
}