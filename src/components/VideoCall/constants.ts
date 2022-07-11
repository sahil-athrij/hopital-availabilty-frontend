export const DEFAULT_CONSTRAINTS = { video: true, audio: true };
export const DEFAULT_ICE_SERVERS = [{ urls: "stun:stun.l.google.com:19302" }];
export const WEBSOCKET_URL = `${process.env.BASE_URL?.replace("http", "ws")}/ws/chat/webrtc?token=`;

export const TYPE_OFFER = "OFFER";
export const TYPE_ANSWER = "ANSWER";
export const TYPE_ICECANDIDATE = "ICE CANDIDATE";
export const TYPE_CALL_REJECT = "REJECT CALL";
export const TYPE_REGISTER = "REGISTER";
export const TYPE_CALL_END = "END CALL";
export const TYPE_DESCRIPTION = "DESCRIPTION";

