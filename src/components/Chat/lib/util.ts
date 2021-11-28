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

export function arrayBufferToBase64(buffer: ArrayBuffer)
{
    let binary = "";
    const bytes = new Uint8Array(buffer);

    for (let i = 0; i < bytes.byteLength; i++)
        binary += String.fromCharCode(bytes[i]);

    return window.btoa(binary);
}

export function base64ToArrayBuffer(base64: string | ArrayBuffer)
{
    if(base64 instanceof ArrayBuffer)
        return base64;

    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++)
        bytes[i] = binary_string.charCodeAt(i);

    return bytes.buffer;
}
