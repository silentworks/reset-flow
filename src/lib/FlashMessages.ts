import type { Cookies } from '@sveltejs/kit';

interface FlashMessage {
	message?: string;
}

let storage: Cookies;
const flashMessages: FlashMessage[] = [];

enum MessageType {
	INFO,
	SUCCESS,
	WARNING,
	ERROR
}

export const initFlashMessages = (cookies: Cookies) => {
	storage = cookies;
    flashMessages = { MessageType.INFO: [] }
};

const add = (message: string, messageType: MessageType) => {
	flashMessages[messageType] = { message };
	console.log({ flashMessages });
	return storage.set('flash-messages', JSON.stringify(flashMessages));
};

export const info = (message: string) => add(message, MessageType.INFO);
export const success = (message: string) => add(message, MessageType.SUCCESS);
export const warning = (message: string) => add(message, MessageType.WARNING);
export const error = (message: string) => add(message, MessageType.ERROR);
