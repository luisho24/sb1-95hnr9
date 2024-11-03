import { NavigatedData, Page } from '@nativescript/core';
import { AssessmentForm } from '../../shared/models/assessment.model';
import { AssessmentService } from '../../shared/services/assessment.service';
import { validators } from '../../shared/utils/validators';

export class AssessmentFormViewModel {
    private page: Page;
    private assessmentService: AssessmentService;
    
    form: AssessmentForm = {
        age: null,
        systolicBP: null,
        diastolicBP: null,
        bloodSugar: null,
        temperature: null,
        heartRate: null
    };
    
    validationError: string = '';

    constructor(page: Page) {
        this.page = page;
        this.assessmentService = new AssessmentService();
    }

    async onSave() {
        try {
            if (this.validateForm()) {
                const assessment = await this.assessmentService.addAssessment(this.form);
                this.page.frame.goBack();
            }
        } catch (error) {
            this.validationError = error.message;
        }
    }

    onCancel() {
        this.page.frame.goBack();
    }

    private validateForm(): boolean {
        if (!validators.required(this.form.age)) {
            this.validationError = 'assessment.validation.required';
            return false;
        }

        // Validate each field
        const validations = [
            { field: 'age', value: this.form.age },
            { field: 'systolicBP', value: this.form.systolicBP },
            { field: 'diastolicBP', value: this.form.diastolicBP },
            { field: 'bloodSugar', value: this.form.bloodSugar },
            { field: 'temperature', value: this.form.temperature },
            { field: 'heartRate', value: this.form.heartRate }
        ];

        for (const validation of validations) {
            if (!validators[validation.field](validation.value)) {
                this.validationError = `assessment.validation.${validation.field}`;
                return false;
            }
        }

        this.validationError = '';
        return true;
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new AssessmentFormViewModel(page);
}