import test from "../../services/k8s.test.js"
import dashboard from "../../services/k8s.dashboard.js"
import componentStatus from "../../services/k8s.componentStatus.js"
import events from "../../services/k8s.events.js"
import namespaces from "../../services/k8s.namespaces.js"
import nodes from "../../services/k8s.nodes.js"
import services from "../../services/k8s.services.js"
import pods from "../../services/k8s.pods.js"


export default {

    test: async (req, res, next) => {
        const result = await test(req?.body)

        if (result?.status == 200) {
            res.status(200).send({ message: result?.message, data: result?.data });
        } else if (result?.status == 400) {
            res.status(400).send({ message: result?.message, error: result?.error });
        } else {
            res.status(500).send({ message: "something went wrong", error: null });
        }
    },

    dashboard: async (req, res, next) => {
        const result = await dashboard(req?.body)

        if (result?.status == 200) {
            res.status(200).send({ message: result?.message, data: result?.data });
        } else if (result?.status == 400) {
            res.status(400).send({ message: result?.message, error: result?.error });
        } else {
            res.status(500).send({ message: "something went wrong", error: null });
        }
    },

    componentStatus: async (req, res, next) => {
        const result = await componentStatus(req?.body)

        if (result?.status == 200) {
            res.status(200).send({ message: result?.message, data: result?.data });
        } else if (result?.status == 400) {
            res.status(400).send({ message: result?.message, error: result?.error });
        } else {
            res.status(500).send({ message: "something went wrong", error: null });
        }
    },

    events: async (req, res, next) => {
        const result = await events(req?.body)

        if (result?.status == 200) {
            res.status(200).send({ message: result?.message, data: result?.data });
        } else if (result?.status == 400) {
            res.status(400).send({ message: result?.message, error: result?.error });
        } else {
            res.status(500).send({ message: "something went wrong", error: null });
        }
    },

    namespaces: async (req, res, next) => {
        const result = await namespaces(req?.body)

        if (result?.status == 200) {
            res.status(200).send({ message: result?.message, data: result?.data });
        } else if (result?.status == 400) {
            res.status(400).send({ message: result?.message, error: result?.error });
        } else {
            res.status(500).send({ message: "something went wrong", error: null });
        }
    },

    nodes: async (req, res, next) => {
        const result = await nodes(req?.body)

        if (result?.status == 200) {
            res.status(200).send({ message: result?.message, data: result?.data });
        } else if (result?.status == 400) {
            res.status(400).send({ message: result?.message, error: result?.error });
        } else {
            res.status(500).send({ message: "something went wrong", error: null });
        }
    },


    pods: async (req, res, next) => {
        const result = await pods(req?.body)

        if (result?.status == 200) {
            res.status(200).send({ message: result?.message, data: result?.data });
        } else if (result?.status == 400) {
            res.status(400).send({ message: result?.message, error: result?.error });
        } else {
            res.status(500).send({ message: "something went wrong", error: null });
        }
    },

    services: async (req, res, next) => {
        const result = await services(req?.body)

        if (result?.status == 200) {
            res.status(200).send({ message: result?.message, data: result?.data });
        } else if (result?.status == 400) {
            res.status(400).send({ message: result?.message, error: result?.error });
        } else {
            res.status(500).send({ message: "something went wrong", error: null });
        }
    },
}