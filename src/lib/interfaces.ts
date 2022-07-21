// Copyright © 2021 Kaleido, Inc.
//
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export interface IConfig {
  api: {
    hostname: string
    port: number
  }
  events?: {
    maxInflight?: number
    queueSize?: number;
  }
  p2p: {
    hostname: string
    port: number
    endpoint?: string
  }
  apiKey?: string
  peers: {
    id: string
    endpoint: string
  }[]
  jsonParserLimit?: string
}

export interface IFile {
  key: string
  name: string
  readableStream: NodeJS.ReadableStream
}

export type OutboundEvent =
  IMessageReceivedEvent |
  IMessageDeliveredEvent |
  IMessageFailedEvent |
  IBlobReceivedEvent |
  IBlobDeliveredEvent |
  IBlobFailedEvent

export interface IMessageReceivedEvent {
  id: string
  type: 'message-received'
  recipient: string
  sender: string
  message: string
}

export interface IMessageDeliveredEvent {
  id: string
  type: 'message-delivered'
  sender: string
  recipient: string
  message: string
}

export interface IMessageFailedEvent {
  id: string
  type: 'message-failed'
  sender: string
  recipient: string
  message: string
  requestId?: string
}

export interface IBlobReceivedEvent {
  id: string
  type: 'blob-received'
  sender: string
  recipient: string
  path: string
  hash: string
  size: number
}

export interface IBlobDeliveredEvent {
  id: string
  type: 'blob-delivered'
  sender: string
  recipient: string
  path: string
}

export interface IBlobFailedEvent {
  id: string
  type: 'blob-failed'
  sender: string
  recipient: string
  path: string
}

export type InboundEvent =
  IMessageEvent |
  IAckEvent

export interface IMessageEvent {
  type: 'message'
  recipient: string
  message: string
}

export interface IAckEvent {
  type: 'commit' | 'ack'
  id?: string
}

export type MessageTask = {
  requestId?: string
  message: string
  recipientID: string
  recipientURL: string
  senderDestination?: string
  recipientDestination?: string
}

export type BlobTask = {
  requestId?: string
  blobPath: string
  recipientID: string
  recipientURL: string
  senderDestination?: string
  recipientDestination?: string
}

export interface IStatus {
  messageQueueSize: number
  inFlightCount: number
  peers: {
    id: string
    endpoint: string
    available: boolean
  }[]
}

export interface ICertData {
  organization?: string
  organizationUnit?: string
}

export interface IMetadata {
  hash: string
  size: number
  lastUpdate: number
}