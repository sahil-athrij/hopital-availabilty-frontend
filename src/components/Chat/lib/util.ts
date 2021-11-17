// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const StaticArrayBufferProto = new ArrayBuffer().__proto__;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const dcodeIO = dcodeIO || window.dcodeIO;

export function toString(thing: unknown)
{
    if (typeof thing === "string")
        return thing;

    return new dcodeIO.ByteBuffer.wrap(thing).toString("binary");
}

export function toArrayBuffer(thing?: string | { __proto__: unknown })
{
    if (thing === undefined)
        return undefined;

    if (thing === Object(thing))

        if (typeof thing !== "string" && thing.__proto__ === StaticArrayBufferProto)

            return thing;


    if (typeof thing !== "string")

        throw new Error("Tried to convert a non-string of type " + typeof thing + " to an array buffer");

    return new dcodeIO.ByteBuffer.wrap(thing, "binary").toArrayBuffer();
}

export function isEqual(a?: string, b?: string)
{
    // TODO: Special-case arraybuffers, etc
    if (!a || !b)

        return false;

    a = toString(a);
    b = toString(b);

    if (!a || !b)
        return false;

    const maxLength = Math.max(a.length, b.length);
    if (maxLength < 5)

        throw new Error("a/b compare too short");

    return a.substring(0, Math.min(maxLength, a.length)) === b.substring(0, Math.min(maxLength, b.length));
}

export function dumpBinary(obj: Record<string, unknown> | ArrayBuffer)
{
    if(obj instanceof ArrayBuffer)
        return JSON.stringify({
            buffer: arrayBufferToBase64(obj),
            "dump_signature_array_buffer": "PURE_BUFFER"
        });

    if(obj !== Object(obj))
        return JSON.stringify(obj);

    const paths: Array<string> = [];

    obj = safeJSONString(obj, paths);
    obj["dump_signature_array_buffer"] = paths;

    return JSON.stringify(obj);
}

export function loadBinary(dumpString: string)
{
    const dump = JSON.parse(dumpString);

    if (dump !== Object(dump) || !("dump_signature_array_buffer" in dump))
        return dump;

    if(dump["dump_signature_array_buffer"] === "PURE_BUFFER")
        return base64ToArrayBuffer(dump.buffer);

    dump["dump_signature_array_buffer"].forEach((path: string) =>
    {
        const {parent, key} = resolve(dump, path.split("/").filter((s) => s));
        console.log("Decoding", key, parent[key]);
        parent[key] = base64ToArrayBuffer(parent[key] as string);
    });

    delete dump["dump_signature_array_buffer"];

    return dump;
}

function safeJSONString(obj: Record<string, unknown>, paths: string[], parent = "")
{
    if(obj !== Object(obj))
        return obj;

    for(const key in obj)
        if(obj[key] instanceof ArrayBuffer)
        {
            obj[key] = arrayBufferToBase64(obj[key] as ArrayBuffer);
            paths.push(`${parent}/${key}`);
        }
        else if (obj === Object(obj))
            obj[key] = safeJSONString(obj[key] as Record<string, unknown>, paths, `${parent}/${key}`);

    return obj;
}

function resolve(obj: Record<string, unknown>, path: string[])
{
    let working_root: Record<number, unknown> | Record<string, unknown>[] = [obj];
    const working_path = [0, ...path];

    while (working_path.length > 1)
        working_root = working_root[working_path.shift() as unknown as number] as Record<number, unknown>;

    return {parent: obj as Record<string, unknown>, key: path[0] as string};
}

function arrayBufferToBase64(buffer: ArrayBuffer)
{
    let binary = "";
    const bytes = new Uint8Array(buffer);

    for (let i = 0; i < bytes.byteLength; i++)
        binary += String.fromCharCode(bytes[i]);

    return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string)
{
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++)
        bytes[i] = binary_string.charCodeAt(i);

    return bytes.buffer;
}
