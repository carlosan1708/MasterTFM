import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const classificationClient = axios.create({
    baseURL: 'https://solar-function-cloud-run-classification-h7tla2r3ya-uc.a.run.app'
});

export {
  classificationClient
};