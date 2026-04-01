import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-studio',
  imports: [CommonModule],
  templateUrl: './studio.html',
  styleUrls: ['./studio.css'],
})
export class Studio {
  selectedMaterialOption: string = '';
  selectedPatternOption: string | null = null;
  selectedPatternImage: string | null = null;
  selectedMaterialDesign: string = '';
  selectedMaterialDesignImage: string | null = null;

  patternImages: Record<string, string> = {
    Frock: '/images/Frock.png',
    Gown: '/images/Gown.png',
    CordSet: '/images/CordSet.png',
    Kurti: '/images/Kurti.png',
    'Close Kurti': '/images/ClosedKurti.png',
    Kaftan: '/images/Kaftan.png',
  };

  materialDesignImages: Record<string, string> = {
    cotton1: '/images/cotton1.png',
    cotton2: '/images/cotton%202.png',
  };

  selectMaterialOption(material: string) {
    this.selectedMaterialOption = material;
    console.log('selectedMaterialOption', this.selectedMaterialOption);
  }

  selectPatternOption(pattern: string) {
    this.selectedPatternOption = pattern;
    this.selectedPatternImage = this.patternImages[pattern] || null;
    console.log('selectedPatternOption', this.selectedPatternOption, 'image', this.selectedPatternImage);
  }

  selectMaterialDesign(design: string) {
    this.selectedMaterialDesign = design;
    this.selectedMaterialDesignImage = this.materialDesignImages[design] || null;
    console.log('selectedMaterialDesign', this.selectedMaterialDesign, 'image', this.selectedMaterialDesignImage);
  }
}



