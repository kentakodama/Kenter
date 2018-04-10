
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
    export const RECEIVE_CHAT_INFO = ' RECEIVE_CHAT_INFO';

export const receiveMessages = (thread) => ({
  type: RECEIVE_MESSAGES,
  thread
});

export const receiveChatInfo = (chatInfo) => ({
  type: RECEIVE_CHAT_INFO,
  chatInfo
});
