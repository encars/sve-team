export const formatDateAndTime = (date: Date) => {
    const day = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: '2-digit' });
    const dateNum = date.toLocaleString('en-US', { day: '2-digit' });
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    const formattedDate = `${day}, ${dateNum}.${month}`;

    return { formattedDate, time };
};
