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

// fdc3-api-v2 implementation package name
const FDC3_BUS_IMPLEMENTATION = 'com-glue42-finos-fdc3-api-impl';

const glue42PlatformConfig = {
  application: 'Fdc3.Toolbar',
  gateway: {
    protocolVersion: 3,
    ws: 'ws://127.0.0.1:8385/gw',
  },
  auth: {
    username: process.env.USERNAME,
    password: '',
  },
};

// finos-plexus Common Interop API implementation package name - used to open the applications
const typeGluePlatform = {
  config: glue42PlatformConfig,
  type: 'Glue42',
};

const typeEikonPlatform = {
  config: glue42PlatformConfig,
  type: 'Eikon',
};

const FDC3_IMPL_PLATFORMS = [typeGluePlatform, typeEikonPlatform];

const toolbarConfig = {
  FDC3_BUS_IMPLEMENTATION,
  FDC3_IMPL_PLATFORMS,
};

export default toolbarConfig;
