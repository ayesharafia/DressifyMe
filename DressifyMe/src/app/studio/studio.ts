import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioService } from '../../app/service/StudioService';


@Component({
  standalone: true,
  selector: 'app-studio',
  imports: [CommonModule],
  templateUrl: './studio.html',
  styleUrls: ['./studio.css'],
})
export class Studio {
    constructor(private studioService: StudioService) {}
 selectMaterialOption(material: string) {
    this.selectedMaterialOption = material;
    this.studioService.selectedMaterialOption = material;
  }

  selectMaterialDesign(design: string) {
    this.selectedMaterialDesign = design;
    this.selectedMaterialDesignImage = this.materialDesignImages[design] || null;
    this.studioService.selectedMaterialDesignImage = this.selectedMaterialDesignImage;
  }

  selectPatternOption(pattern: string) {
    this.selectedPatternOption = pattern;
    this.selectedPatternImage = this.patternImages[pattern] || null;
    this.studioService.selectedPatternOption = pattern;
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.studioService.selectedSize = size;
  }
  selectedMaterialOption: string = '';
  selectedPatternOption: string | null = null;
  selectedPatternImage: string | null = null;
  selectedMaterialDesign: string = '';
  selectedMaterialDesignImage: string | null = null;

  // Size feature
  selectedSize: string = '';
  sizeUnit: 'in' | 'cm' = 'in';

  sizeChartData = [
    { label: 'XS', bust_in: 34.0, length_in: 44.0, waist_in: 26.0, outseam_in: 36.0, inseam_in: 29.0, bust_cm: 86.4, length_cm: 111.8, waist_cm: 66.0, outseam_cm: 91.4, inseam_cm: 73.7 },
    { label: 'S',  bust_in: 36.0, length_in: 46.0, waist_in: 28.0, outseam_in: 38.0, inseam_in: 31.0, bust_cm: 91.4, length_cm: 116.8, waist_cm: 71.1, outseam_cm: 96.5, inseam_cm: 78.7 },
    { label: 'M',  bust_in: 38.0, length_in: 46.0, waist_in: 30.0, outseam_in: 38.0, inseam_in: 31.0, bust_cm: 96.5, length_cm: 116.8, waist_cm: 76.2, outseam_cm: 96.5, inseam_cm: 78.7 },
    { label: 'L',  bust_in: 40.0, length_in: 47.0, waist_in: 32.0, outseam_in: 39.0, inseam_in: 32.0, bust_cm: 101.6, length_cm: 119.4, waist_cm: 81.3, outseam_cm: 99.1, inseam_cm: 81.3 },
    { label: 'XL', bust_in: 42.0, length_in: 47.0, waist_in: 34.0, outseam_in: 39.0, inseam_in: 32.0, bust_cm: 106.7, length_cm: 119.4, waist_cm: 86.4, outseam_cm: 99.1, inseam_cm: 81.3 },
    { label: 'XXL',bust_in: 44.0, length_in: 48.0, waist_in: 36.0, outseam_in: 40.0, inseam_in: 33.0, bust_cm: 111.8, length_cm: 121.9, waist_cm: 91.4, outseam_cm: 101.6, inseam_cm: 83.8 },
  ];

  measurementTips = [
    {
      icon: '📏',
      label: 'Bust',
      description: 'Measure around the fullest part of your chest, keeping the tape parallel to the floor.',
    },
    {
      icon: '🔘',
      label: 'Waist',
      description: 'Measure around your natural waistline, the narrowest part of your torso.',
    },
    {
      icon: '📐',
      label: 'Front Length',
      description: 'Measure from the highest point of your shoulder straight down to where you want the garment to end.',
    },
    {
      icon: '🦵',
      label: 'Outseam Length',
      description: 'Measure from your natural waist down the outside of your leg to your ankle.',
    },
    {
      icon: '📌',
      label: 'Inseam Length',
      description: 'Measure from the crotch seam down the inner leg to your ankle.',
    },
    {
      icon: '💡',
      label: 'Pro Tip',
      description: 'Use a soft measuring tape and wear fitted clothing or measure over bare skin for best accuracy.',
    },
  ];

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

 
addToCart() {
  if (
    !this.selectedMaterialOption ||
    !this.selectedPatternOption ||
    !this.selectedSize
  ) {
    alert('Please select Material, Pattern, and Size before adding to bag.');
    return;
  }
  this.studioService.addToCart();
  alert('Item added to bag!');
}
  setSizeUnit(unit: 'in' | 'cm') {
    this.sizeUnit = unit;
  }

  }