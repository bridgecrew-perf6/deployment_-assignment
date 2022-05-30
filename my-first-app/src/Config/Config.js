const env = process.env.REACT_APP_ENV;

let config = {
    baseURL:"https://localhost"
}

switch (env.toUpperCase()){
    case "STAGE":
        config.baseURL = "https://stage.skillsunion.com"
        break;
    case "PRODUCTION":
        config.baseURL = "https://skillunion.com"
        break;
}

export default config