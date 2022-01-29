if(typeof window === "undefined")
{
    let queue: string[] = [];
    let websocket: WebSocket;
    let token: string;

    const send = new BroadcastChannel("from-worker");

    function openWs()
    {
        if (!token || !process.env.BASE_URL)
            return false;

        const ws = new WebSocket(`${process.env.BASE_URL.replace("http", "ws")}/chat/ws?token=${token}`);

        ws.onmessage = ({data}) => send.postMessage(data);
        ws.onopen = () => queue = queue.filter((msg) => ws.send(msg));
        ws.onclose = () => openWs();
    }

    new BroadcastChannel("control").onmessage = (({data}) =>
    {
        token = data;
        openWs();
    });

    new BroadcastChannel("to-worker").onmessage = async ({data}) =>
    {
        console.log(data, "to worker");
        if(!websocket || websocket.CLOSED || websocket.CLOSING || !websocket.OPEN)
            return queue.push(data);

        websocket.send(data);
    };
}

export {};
