export interface MessageDto {
  id?: number
  content: string
  sender: Sender
  receiver: Receiver
  timeStamp?: string
}

export interface Sender {
  userName: string
}

export interface Receiver {
  userName: string
}
