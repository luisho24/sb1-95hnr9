import { Observable } from '@nativescript/core';

export class ErrorBoundary extends Observable {
    private _errorMessage: string;

    constructor() {
        super();
        this._errorMessage = '';
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    set errorMessage(value: string) {
        if (this._errorMessage !== value) {
            this._errorMessage = value;
            this.notifyPropertyChange('errorMessage', value);
        }
    }

    onRetry() {
        // Implement retry logic
        this.errorMessage = '';
    }
}