export interface IMessage {
    message: string;
    type: 'info' | 'success' | 'error' | 'warn' | 'warning';
}
