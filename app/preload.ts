/**
 * Copyright © 2014-2019 Tick42 OOD
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { remote } from 'electron';

/**
 * By saving these variables to the window object, the Toolbar Window is able to call methods and subscribe for events
 * in the Electron app.
 * glue42DemoToolbar allows to subscribe for providers and to call methods related to the providers
 * logStream allows to subscribe for log stream and to push new logs
 */
(window as any).glue42DemoToolbar = remote.getGlobal('glue42DemoToolbar');
(window as any).logStream = remote.getGlobal('logStream');
