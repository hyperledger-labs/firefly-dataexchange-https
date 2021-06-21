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

import EventEmitter from "events";
import { OutboundEvent } from "../lib/interfaces";
import { Logger } from "../lib/logger";
import * as utils from '../lib/utils';

const log = new Logger("handlers/events.ts")

let eventQueue: OutboundEvent[] = [];
export const eventEmitter = new EventEmitter();

export const queueEvent = (socketEvent: OutboundEvent) => {
  if(eventQueue.length < utils.constants.MAX_EVENT_QUEUE_SIZE) {
    eventQueue.push(socketEvent);
    if(eventQueue.length === 1) {
      eventEmitter.emit('event', eventQueue[0]);
    }
  } else {
    log.warn('Max queue size reached');
  }
};

export const handleCommit = () => {
  eventQueue.shift();
  if(eventQueue.length > 0) {
    eventEmitter.emit('event', eventQueue[0]);
  }
}

export const getCurrentEvent = () => {
  if(eventQueue.length > 0) {
    return eventQueue[0];
  }
};

export const getQueueSize = () => {
  return eventQueue.length;
};
