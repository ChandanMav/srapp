import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
})
export class PrescriptionComponent implements OnInit {
  message: string = '';
  filename: string;
  errorMessage: string;
  user_profile = {
    name: 'Chandan',
    bmi: 23.45,
    Running_Speed: 23,
    agility: 78,
    Reaction_Time: 19,
    balance: 78,
    strength: 98,
    aggression: 33,
    anticipation_index: 32,
    peripheral_vision: 89,
  };
  isFileParsing: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  /**
   * on file drop handler
   */
  onFileDropped(file: File) {
    this.prepareFilesList(file.name);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    let fileName = event.target.files[0].name;
    if (fileName.endsWith('.pdf')) {
      this.prepareFilesList(event.target.files[0].name);
    } else {
      this.errorMessage = 'Please select pdf file only.';
      this.message = '';
      this.filename = '';
    }
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(filename: string) {
    this.errorMessage = '';
    this.filename = filename;
    this.isFileParsing = true;
    setTimeout(() => {
      this.isFileParsing = false;
      this.message = 'Successfully uploaded';
    }, 1000);
  }

  wrongFileDropped(message: string) {
    this.errorMessage = message;
    this.message = '';
    this.filename = '';
  }

  css(): string {
    return this.errorMessage === '' ? 'file-success' : 'file-error';
  }

  tryIt() {
    this.router.navigate(['/recommendation'], {
      relativeTo: this.activatedRoute,
      queryParams: this.user_profile,
    });
  }

  cancel() {
    this.errorMessage = '';
    this.message = '';
  }
}
