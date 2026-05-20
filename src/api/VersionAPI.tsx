
import axios from "axios";

export const VersionApi = axios.create({
    baseURL: 'https://api.github.com/repos/Igor-Wolf/Cordeo/releases',
    headers: {
      'Content-Type': 'application/json',
    }
})