import axios from "axios"

const getPlayersByPracticeId = async (id: string) => {
    try {
        const res = await axios.get(`/api/practices/${id}`);

        const players = res.data;

        return players;
    } catch (error: any) {
        return [];
    }
};

export default getPlayersByPracticeId;