import axios from "axios";

const getPlayersByMatchId = async (id: string) => {
    try {
        const res = await axios.post("/api/getPlayersByMatch", { id });

        const players = res.data;
        
        return players;
    } catch (error: any) {
        return [];
    }
};

export default getPlayersByMatchId;