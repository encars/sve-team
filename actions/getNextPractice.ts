import axios from "axios"

const getNextPractice = async () => {
    try {
        const res = await axios.get("/api/practices/next");

        const nextPractice = res.data;

        return nextPractice;
    } catch (error: any) {
        return null;
    }
}

export default getNextPractice;