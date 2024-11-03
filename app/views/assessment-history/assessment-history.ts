import { NavigatedData, Observable, Page } from '@nativescript/core';
import { Assessment } from '../../shared/models/assessment.model';
import { AssessmentService } from '../../shared/services/assessment.service';

export class AssessmentHistoryViewModel extends Observable {
    private page: Page;
    private assessmentService: AssessmentService;
    
    private _assessments: Assessment[] = [];
    private _isLoading: boolean = false;

    constructor(page: Page) {
        super();
        this.page = page;
        this.assessmentService = new AssessmentService();
        this.loadAssessments();
    }

    get assessments(): Assessment[] {
        return this._assessments;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    async loadAssessments() {
        try {
            this.isLoading = true;
            const assessments = await this.assessmentService.getAssessments();
            this._assessments = assessments;
            this.notifyPropertyChange('assessments', assessments);
        } catch (error) {
            console.error('Error loading assessments:', error);
            // Handle error appropriately
        } finally {
            this.isLoading = false;
        }
    }

    onNewAssessment() {
        this.page.frame.navigate({
            moduleName: 'views/assessment-form/assessment-form',
            animated: true
        });
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new AssessmentHistoryViewModel(page);
}