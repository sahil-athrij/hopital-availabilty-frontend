export const buildServers = (serverURLs: string[]) => 
{
    if (!serverURLs) return;
    return serverURLs.map(serverURL => ({urls: serverURL}));
};

const replaceCharacter = (char: string) => 
{
    return (Number(char) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(char) / 4).toString(16);
};

export const generateRoomKey = () => 
{
    const baseString = "10000000-1000-4000-8000-100000000000";
    return baseString.replace(/[018]/g, replaceCharacter);
};

export const createMessage = (type: string, payload: { roomKey: string; socketID: string; message: string; }) => ({
    type,
    payload
});
export const createPayload = (roomKey: string, socketID: string, message: any = null) => ({
    roomKey,
    socketID,
    message
});
