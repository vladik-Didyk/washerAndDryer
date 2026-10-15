// Russian server-only text: the guides (../index.server.ts merges this over ./en.server.ts).
// Empty for now: every guide shows in English until it is translated here, with the same
// keys and {placeholders} as English. The policies and llms.txt stay English-only.
import type { DeepPartial } from "../index";
import type { ServerText } from "../index.server";

const ruServer: DeepPartial<ServerText> = {};

export default ruServer;
