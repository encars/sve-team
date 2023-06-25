import axios from "axios";

const getMatches = async () => {
    try {
        const res = await axios.get("http://192.168.2.141:3000/api/matches");

        const matches = res.data;

        return matches;
    } catch (error: any) {
        return [];
    }
};

export default getMatches;
