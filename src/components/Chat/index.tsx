// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";


async function work()
{
    const ALICE_ADDRESS = new SignalProtocolAddress("+14151111111", 1);
    const BOB_ADDRESS = new SignalProtocolAddress("+14152222222", 1);

    const aliceStore = new SignalProtocolStore();

    const bobStore = new SignalProtocolStore();
    const bobPreKeyId = 1337;
    const bobSignedKeyId = 1;

    await generateIdentity(aliceStore);
    await generateIdentity(bobStore);

    const preKeyBundle = await generatePreKeyBundle(bobStore, bobPreKeyId, bobSignedKeyId);
    const builder = new libsignal.SessionBuilder(aliceStore, BOB_ADDRESS);
    builder.processPreKey(preKeyBundle);

    const originalMessage = util.toArrayBuffer("L'homme est condamné à être libre");
    const aliceSessionCipher = new libsignal.SessionCipher(aliceStore, BOB_ADDRESS);
    const bobSessionCipher = new libsignal.SessionCipher(bobStore, ALICE_ADDRESS);


    const record = await aliceStore.loadSession(BOB_ADDRESS.toString());
    const sessionRecord = Internal.SessionRecord.deserialize(record);
    console.log(sessionRecord);

    const ciphertext1 = await aliceSessionCipher.encrypt(originalMessage);
    const plaintext1 = bobSessionCipher.decryptPreKeyWhisperMessage(ciphertext.body, "binary");
    console.log(ciphertext1, plaintext1);


    const ciphertext2 = await bobSessionCipher.encrypt(originalMessage);
    const plaintext2 = await aliceSessionCipher.decryptWhisperMessage(ciphertext.body, "binary");
    console.log(ciphertext2, plaintext2);
}

class ChatLoc extends AuthComponent<AuthPropsLoc, AuthState>
{
    render(): JSX.Element
    {
        work().then();
        return super.render();
    }
}

export default withRouter(ChatLoc);
