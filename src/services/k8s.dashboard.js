import k8s from'@kubernetes/client-node';
const kc = new k8s.KubeConfig();

export default async function dashboard(config) {
    try {

        kc.loadFromString(JSON.stringify(config));
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);


        const nodes = (await k8sApi.listNode()).body
        const componentStatus = (await k8sApi.listComponentStatus()).body
        const namespace = (await k8sApi.listNamespace()).body
        const services = (await k8sApi.listServiceForAllNamespaces()).body
        const events = (await k8sApi.listEventForAllNamespaces()).body
        const pods = (await k8sApi.listPodForAllNamespaces()).body
        const listAllEndpoints = (await k8sApi.listEndpointsForAllNamespaces()).body


        // const nodes = (await k8sApi.getAPIResources('default')).body
        // const listReplicationControllerForAllNamespaces = (await k8sApi.listReplicationControllerForAllNamespaces()).body
        // const listResourceQuotaForAllNamespaces = (await k8sApi.listResourceQuotaForAllNamespaces()).body
        // const readNodeStatus = (await k8sApi.readNodeStatus('8bitboy')).body

        // const nodes = await k8sApi.listNamespacedPod('default')
        // const nodes = await k8sApi.listSecretForAllNamespaces()
        // const nodes = await k8sApi.listPersistentVolume()
        // const node_8bitboy = await k8sApi.readNode('node1-lenovo')


        var podStatus = {
            "PodReadyToStartContainers": [0, 0],
            "Initialized": [0, 0],
            "Ready": [0, 0],
            "ContainersReady": [0, 0],
            "PodScheduled": [0, 0],
            "DisruptionTarget": [0, 0],
        }

        for (let index = 0; index < pods?.items?.map(item => { return item.status?.conditions?.map(item => { return { [item?.type]: item?.status } }) }).length; index++) {

            pods?.items?.map(item => { return item.status?.conditions?.map(item => { return { [item?.type]: item?.status } }) })[index].forEach(item => { item[Object.keys(item)[0]] == "True" ? podStatus[Object.keys(item)[0]][0] += 1 : podStatus[Object.keys(item)[0]][1] += 1 })

        }

        const apiServerEndpoint = listAllEndpoints?.items?.filter(item => item?.metadata?.name == "kubernetes")?.[0]?.subsets?.[0];


        const data = {
            apiServerEndpoint: `${apiServerEndpoint?.addresses?.[0]?.ip}:${apiServerEndpoint?.ports?.[0]?.port}`,
            componentStatus: componentStatus?.items?.map(item => { return { name: item?.metadata?.name, conditions: item?.conditions } }),
            namespace: namespace?.items?.map(item => item?.metadata?.name),
            events: [...new Set(events?.items?.map(item => item.type))].map(item => { return { [item]: events?.items?.map(item => item.type).filter(x => x == item).length } }),
            nodes: nodes?.items?.map(item => {
                return {
                    hostname: item?.metadata?.name,
                    addresses: item?.status?.addresses?.filter(item => item.type == "InternalIP").map(item => { return item?.address }),
                    ready: item?.status?.conditions?.filter(item => item?.type == "Ready")[0].status,
                    capacity: item?.status?.allocatable,
                    nodeInfo: item?.status?.nodeInfo,
                }
            }),
            pods: {
                totalPods: pods?.items?.length,
                runningPods: podStatus?.ContainersReady[0] - podStatus?.DisruptionTarget[0],
                terminatedPods: podStatus?.DisruptionTarget[0],
                failedPods: podStatus?.PodScheduled[1]
            },
            // pods: pods?.items?.filter(item => { return item?.status?.phase == "Running"}).length,
            services: services?.items.map(item => {
                return {
                    name: item?.metadata?.name, network: `${item?.spec?.clusterIP}: ${item?.spec?.ports[0].port}-> ${item?.spec?.ports[0].targetPort}`
                }
            }).reduce((obj, item) => Object.assign(obj, { [item.name]: item.network }), {}),
        }

        return { message: "dashboard data fatched successfully!", data, status: 200 };
    } catch (error) {
        return { error: error, status: 400 };
    }
}