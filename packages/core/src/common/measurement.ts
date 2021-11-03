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

/* eslint-disable @typescript-eslint/no-explicit-any */

import { inject, injectable } from 'inversify';
import { ILogger, LogLevel, MaybePromise } from '.';

/**
 * A function that measures the time elapsed between its creation and its invocation.
 */
export interface Measurement {
    /** Compute the elapsed time, in milliseconds, if not already done (only has effect on the first invocation). */
    (): number;
    /** The measurement name. This may show up in the performance measurement framework appropriate to the application context. */
    name: string;
    /** The elapsed time measured, or NaN if not yet computed. */
    elapsed: number;
    /**
     * Compute the elapsed time and log a message annotated with that timing information.
     * @param detail a message detailing what activity was measured
     * @param optionalArgs optional message arguments as per the usual console API
     */
    log(detail: string, ...optionalArgs: any[]): void;
}

/**
 * Optional configuration of a {@link Measurement} specified at the time of its creation.
 */
export interface MeasurementOptions {
    /**
     * A specific context of the application in which an activity was measured.
     * Results in logs being emitted with a "[<context>]" qualified at the head.
     */
    context?: string;
    /** An optional logging level at which to emit the log message. The default is {@link LogLevel.INFO}. */
    logLevel?: LogLevel | ((measurement: Measurement) => LogLevel | undefined);
    /**
     * Some measurements are measured against a threshold (in millis) that they should not exceed.
     * If omitted, the implied threshold is unlimited time (no threshold).
     *
     * @see {@link Stopwatch.measurePromise}
     */
    thresholdMillis?: number;
}

/**
 * Configuration of the log messages written by a {@link Measurement}.
 */
interface LogOptions extends MeasurementOptions {
    /** A function that computes the current time, in millis, since the start of the application. */
    now: () => number;
    /** An optional label for the application the start of which (in real time) is the basis of all measurements. */
    owner?: string;
    /** Optional arguments to the log message. The 'optionalArgs' coming in from the {@link Measurement} API are slotted in here. */
    arguments?: any[];
}

/**
 * A factory of {@link Measurement}s for performance logging.
 */
@injectable()
export abstract class Stopwatch {

    @inject(ILogger)
    protected readonly logger: ILogger;

    protected constructor(protected readonly defaultLogOptions: LogOptions) {
        if (!defaultLogOptions.logLevel) {
            defaultLogOptions.logLevel = LogLevel.INFO;
        }
    }

    /**
     * Create a {@link Measurement} that will compute its elapsed time when logged.
     *
     * @param name the {@link Measurement.name measurement name}
     * @param options optional configuration of the new measurement
     * @returns a self-timing measurement
     */
    public abstract measure(name: string, options?: MeasurementOptions): Measurement;

    /**
     * Wrap an asynchronous function in a {@link Measurement} that logs itself on completion.
     * If obtaining and awaiting the `computation` runs too long according to the threshold
     * set in the `options`, then the log message is a warning, otherwise a debug log.
     *
     * @param name the {@link Measurement.name name of the measurement} to wrap around the function
     * @param description a description of what the function does, to be included in the log
     * @param computation a supplier of the asynchronous function to wrap
     * @param options optional addition configuration as for {@link measure}
     * @returns the wrapped `computation`
     *
     * @see {@link MeasurementOptions.thresholdMillis}
     */
    public async measurePromise<T>(name: string, description: string, computation: () => MaybePromise<T>, options?: MeasurementOptions): Promise<T> {
        const threshold = options?.thresholdMillis ?? Number.POSITIVE_INFINITY;

        const measure = this.measure(name, { logLevel: m => m.elapsed > threshold ? LogLevel.WARN : this.logLevel(m, options) });
        const result = await computation();
        if (measure() > threshold) {
            measure.log(`${description} is slow`);
        } else {
            measure.log(description);
        }
        return result;
    }

    protected createMeasurement(name: string, measurement: () => number, options?: MeasurementOptions): Measurement {
        const logOptions = this.mergeLogOptions(options);

        const result: Measurement = () => {
            if (Number.isNaN(result.elapsed)) {
                result.elapsed = measurement();
            }
            return result.elapsed;
        };
        Object.defineProperty(result, 'name', { value: name });
        result.log = (activity: string, ...optionalArgs: any[]) => this.log(result, activity, { ...logOptions, arguments: optionalArgs });
        result.elapsed = Number.NaN;

        return result;
    }

    private mergeLogOptions(logOptions?: Partial<LogOptions>): LogOptions {
        const result: LogOptions = { ...this.defaultLogOptions };
        if (logOptions) {
            Object.assign(result, logOptions);
        }
        return result;
    }

    private logLevel(measurement: Measurement, options?: Partial<LogOptions>): LogLevel {
        return !options
            ? LogLevel.INFO
            : typeof options.logLevel === 'number'
                ? options.logLevel
                : typeof options.logLevel === 'function' ? options.logLevel(measurement) ?? LogLevel.INFO
                    : LogLevel.INFO;
    }

    private log(measurement: Measurement, activity: string, options: LogOptions): void {
        const elapsed = measurement();
        const level = this.logLevel(measurement);

        if (Number.isNaN(elapsed)) {
            switch (level) {
                case LogLevel.ERROR:
                case LogLevel.FATAL:
                    // Always log errors, even if NaN duration from native API preventing a measurement
                    break;
                default:
                    // Measurement was prevented by native API, do not log NaN duration
                    return;
            }
        }

        const start = options.owner ? `${options.owner} start` : 'start';
        const timeFromStart = `Finished ${(options.now() / 1000).toFixed(3)} s after ${start}`;
        const whatWasMeasured = options.context ? `[${options.context}] ${activity}` : activity;
        this.logger.log(level, `${whatWasMeasured} took: ${elapsed.toFixed(1)} ms [${timeFromStart}]`, ...(options.arguments ?? []));
    }

}
