import k8s from '@kubernetes/client-node';
const kc = new k8s.KubeConfig();


export default async function test(config) {
    console.log(config);

    try {
        kc.loadFromString(JSON.stringify(config));
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

        const nodes = await k8sApi.listNamespace()

        // const nodes = await k8sApi.getAPIResources('default')
        // const nodes = await k8sApi.listNode('default')
        // const nodes = await k8sApi.listComponentStatus('default')
        // const nodes = await k8sApi.listNamespacedPod('default')
        // const nodes = await k8sApi.listPodForAllNamespaces()
        // const nodes = await k8sApi.listServiceForAllNamespaces()
        // const nodes = await k8sApi.listSecretForAllNamespaces()
        // const nodes = await k8sApi.listPersistentVolume()
        // const nodes = await k8sApi.readNode('8bitboy')

        return { message: "API is working", data: nodes?.body, status: 200 };
    } catch (error) {
        console.log(error);
        return { message: "API is not working", error: error, status: 400 };
    }
}