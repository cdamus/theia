/********************************************************************************
* Copyright (c) 2019, 2021 TypeFox, STMicroelectronics and others.
*
* This program and the accompanying materials are made available under the
* terms of the Eclipse Public License 2.0 which is available at
* http://www.eclipse.org/legal/epl-2.0.
*
* This Source Code may also be made available under the following Secondary
* Licenses when the conditions for such availability set forth in the Eclipse
* Public License v. 2.0 are satisfied: GNU General Public License, version 2
* with the GNU Classpath Exception which is available at
* https://www.gnu.org/software/classpath/license.html.
*
* SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
*******************************************************************************/

import { injectable } from 'inversify';
import { Measurement, MeasurementOptions, Stopwatch } from '../common/measurement';

@injectable()
export class FrontendStopwatch extends Stopwatch {

    constructor() {
        super({
            owner: 'frontend',
            now: () => performance.now(),
        });
    }

    measure(name: string, options?: MeasurementOptions): Measurement {
        const startMarker = `${name}-start`;
        const endMarker = `${name}-end`;
        performance.clearMeasures(name);
        performance.clearMarks(startMarker);
        performance.clearMarks(endMarker);

        performance.mark(startMarker);

        return this.createMeasurement(name, () => {
            performance.mark(endMarker);
            performance.measure(name, startMarker, endMarker);

            const entries = performance.getEntriesByName(name);
            const duration = entries.length > 0 ? entries[0].duration : Number.NaN;

            performance.clearMeasures(name);
            performance.clearMarks(startMarker);
            performance.clearMarks(endMarker);
            return duration;
        }, options);
    }
};
