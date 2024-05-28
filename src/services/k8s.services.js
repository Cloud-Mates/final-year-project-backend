import k8s from '@kubernetes/client-node';
const kc = new k8s.KubeConfig();

export default async function services(config) {
    try {

        kc.loadFromString(JSON.stringify(config));
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);


        const services = (await k8sApi.listServiceForAllNamespaces()).body

        const data = {
            services
        }

        return { message: "services data fatched successfully!", data, status: 200 };
    } catch (error) {
        return { error: error, status: 400 };
    }
}