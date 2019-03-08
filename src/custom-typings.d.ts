declare module '@cometchat-pro/chat' {
  namespace CometChat {
    function init(appId: string): Promise<string>;

    function login(usedId: string, apiKey: string): Promise<any>;

    function joinGroup(
      groupId: string,
      grouptType: GROUP_TYPE,
      password: string
    ): Promise<any>;

    function sendMessage(message: TextMessage): Promise<any>;

    function addMessageListener(
      listnerId: string,
      messageListener: MessageListener
    ): void;

    function removeMessageListener(listnerId: string): void;

    class MessageListener {
      constructor(input: {
        onTextMessageReceived: (msg: any) => void;
        onMediaMessageReceived: (msg: any) => void;
      });
    }

    class MessagesRequestBuilder {
      setGUID(guid: string): MessagesRequestBuilder;
      setLimit(limit: number): MessagesRequestBuilder;
      build(): MessageRequest;
    }

    class TextMessage {
      constructor(
        receiverId: string,
        message: string,
        messageType: MESSAGE_TYPE,
        receiverType: RECEIVER_TYPE
      );
    }

    interface MessageRequest {
      fetchPrevious(): Promise<any>;
    }

    enum GROUP_TYPE {
      PUBLIC,
      PRIVATE,
      PASSWORD
    }

    enum MESSAGE_TYPE {
      TEXT,
      FILE,
      IMAGE,
      VIDEO,
      AUDIO
    }

    enum RECEIVER_TYPE {
      USER,
      GROUP
    }
  }
}
