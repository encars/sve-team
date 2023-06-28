import axios from "axios";

const getPlayersByMatchId = async (id: string) => {
    try {
        const res = await axios.get(`/api/matches/${id}`);

        const players = res.data;
        
        return players;
    } catch (error: any) {
        return [];
    }
};

export default getPlayersByMatchId;