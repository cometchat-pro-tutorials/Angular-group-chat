declare module '@cometchat-pro/chat' {
  interface CometChatInterface {
    init(appId: string): Promise<string>;
    login(usedId: string, appId: string): Promise<User | Error>;
  }

  type User = object;

  let CometChat: CometChatInterface;
}
