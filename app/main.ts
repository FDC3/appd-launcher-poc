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

import logStream from './shared';
import { Toolbar } from './toolbar';
import { providerConfigs, toolbarConfig } from './config';
import ProviderConfig from './providers/types/providerConfig';
import ProviderFactory from './providers/providerFactory';
import InteropPlatformAPI from './types/client-api';
import { Fdc3APIImplementation } from './types/interface';

const providerFactory = new ProviderFactory();

const appProviders = providerConfigs.map((providerConfig: ProviderConfig) => {
  const provider = providerFactory.create(providerConfig);
  logStream.next([`Will add provider "${providerConfig.name}" with URL "${providerConfig.apiUrl}"`, 'info', 'Toolbar']);
  return provider;
});

let InteropPlatform: (interopPlatformConfig: any) => InteropPlatformAPI;
let fdc3Impl: (interopPlatforms: InteropPlatformAPI[]) => Promise<Fdc3APIImplementation>;
let fdc3ImplReady: Promise<Fdc3APIImplementation>;

try {
  InteropPlatform = require(toolbarConfig.FINOS_INTEROP_API_IMPLEMENTATION);
} catch (error) {
  logStream.next([`Failed to load ${toolbarConfig.FINOS_INTEROP_API_IMPLEMENTATION} implementation.`, 'error', 'Toolbar']);
}

const interopPlatforms: InteropPlatformAPI[] = []; // https://github.com/finos-plexus/finos-plexus.github.io
toolbarConfig.FDC3_API_PLATFORMS.forEach((fdc3APIPlatform) => {
  // Create Interop Platform and push it to the interopPlatforms list
  const typeSpecificInteropPlatform: InteropPlatformAPI = InteropPlatform(fdc3APIPlatform);
  interopPlatforms.push(typeSpecificInteropPlatform);
});

try {
  fdc3Impl = require(toolbarConfig.FDC3_API_IMPLEMENTATION);
  fdc3ImplReady = fdc3Impl(interopPlatforms);
} catch (error) {
  logStream.next([`Failed to load ${toolbarConfig.FDC3_API_IMPLEMENTATION} implementation.`, 'error', 'Toolbar']);
}

const glue42DemoToolbar = new Toolbar();
glue42DemoToolbar.start(appProviders, fdc3ImplReady);
(global as any).glue42DemoToolbar = glue42DemoToolbar;
(global as any).logStream = logStream;
