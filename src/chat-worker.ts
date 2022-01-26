let websocket: WebSocket;

const channel = new BroadcastChannel("chat");

channel.addEventListener("message", async (event) =>
{
    if (event.data?.type === "SEND" && websocket)
        websocket.send(event.data.payload);
    else if (event.data?.type === "CREATE" && process.env.BASE_URL && !websocket?.OPEN)
    {
        websocket = new WebSocket(
            `${process.env.BASE_URL.replace("http", "ws")}/chat/ws?token=${event.data.token}`);
        websocket.addEventListener("message", ({data}) => channel.postMessage(data));
    }
});

export {};
