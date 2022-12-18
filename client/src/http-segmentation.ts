import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const segmentationClient = axios.create({
    baseURL: 'https://solar-function-cloud-run-h7tla2r3ya-uc.a.run.app'
});

export {
  segmentationClient
};