// *****************************************************************************
// Copyright (C) 2024 EclipseSource GmbH.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************

import { FrontendApplicationContribution, PreferenceService } from '@theia/core/lib/browser';
import { inject, injectable } from '@theia/core/shared/inversify';
import { HuggingFaceLanguageModelsManager, HuggingFaceModelDescription } from '../common';
import { API_KEY_PREF, MODELS_PREF } from './huggingface-preferences';

@injectable()
export class HuggingFaceFrontendApplicationContribution implements FrontendApplicationContribution {

    @inject(PreferenceService)
    protected preferenceService: PreferenceService;

    @inject(HuggingFaceLanguageModelsManager)
    protected manager: HuggingFaceLanguageModelsManager;

    protected prevModels: string[] = [];

    onStart(): void {
        this.preferenceService.ready.then(() => {
            const apiKey = this.preferenceService.get<string>(API_KEY_PREF, undefined);
            this.manager.setApiKey(apiKey);

            const models = this.preferenceService.get<string[]>(MODELS_PREF, []);
            this.manager.createOrUpdateLanguageModels(...models.map(createHuggingFaceModelDescription));
            this.prevModels = [...models];

            this.preferenceService.onPreferenceChanged(event => {
                if (event.preferenceName === API_KEY_PREF) {
                    this.manager.setApiKey(event.newValue);
                } else if (event.preferenceName === MODELS_PREF) {
                    const oldModels = new Set(this.prevModels);
                    const newModels = new Set(event.newValue as string[]);

                    const modelsToRemove = [...oldModels].filter(model => !newModels.has(model));
                    const modelsToAdd = [...newModels].filter(model => !oldModels.has(model));

                    this.manager.removeLanguageModels(...modelsToRemove.map(model => `huggingface/${model}`));
                    this.manager.createOrUpdateLanguageModels(...modelsToAdd.map(createHuggingFaceModelDescription));
                    this.prevModels = [...event.newValue];
                }
            });
        });
    }
}

function createHuggingFaceModelDescription(modelId: string): HuggingFaceModelDescription {
    return {
        id: `huggingface/${modelId}`,
        model: modelId
    };
}
