import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioService } from '../../app/service/StudioService';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-studio',
  imports: [CommonModule],
  templateUrl: './studio.html',
  styleUrls: ['./studio.css'],
})
export class Studio {

  constructor(private studioService: StudioService, private router: Router) {
    this.studioService.selectedMaterialOption = 'Cotton';
  }

  selectMaterialOption(material: string) {
    this.selectedMaterialOption = material;
    this.studioService.selectedMaterialOption = material;

    // Reset design when material changes
    this.selectedMaterialDesign = '';
    this.selectedMaterialDesignImage = null;
    this.studioService.selectedMaterialDesignImage = null;
  }

  selectMaterialDesign(design: { key: string; src: string }) {
    this.selectedMaterialDesign = design.key;
    this.selectedMaterialDesignImage = design.src;
    this.studioService.selectedMaterialDesign = design.key;
    this.studioService.selectedMaterialDesignImage = design.src;
  }

  selectPatternOption(pattern: string) {
    this.selectedPatternOption = pattern;
    this.selectedPatternImage = this.patternImages[pattern] || null;
    this.studioService.selectedPatternOption = pattern;
    this.studioService.selectedPatternImage = this.patternImages[pattern] || null;
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.studioService.selectedSize = size;
  }

  selectedMaterialOption: string = 'Cotton';
  selectedPatternOption: string | null = null;
  selectedPatternImage: string | null = null;
  selectedMaterialDesign: string = '';
  selectedMaterialDesignImage: string | null = null;

  // Size feature
  selectedSize: string = '';
  sizeUnit: 'in' | 'cm' = 'in';

  sizeChartData = [
    { label: 'XS',  bust_in: 34.0, length_in: 44.0, waist_in: 26.0, outseam_in: 36.0, inseam_in: 29.0, bust_cm: 86.4,  length_cm: 111.8, waist_cm: 66.0, outseam_cm: 91.4,  inseam_cm: 73.7 },
    { label: 'S',   bust_in: 36.0, length_in: 46.0, waist_in: 28.0, outseam_in: 38.0, inseam_in: 31.0, bust_cm: 91.4,  length_cm: 116.8, waist_cm: 71.1, outseam_cm: 96.5,  inseam_cm: 78.7 },
    { label: 'M',   bust_in: 38.0, length_in: 46.0, waist_in: 30.0, outseam_in: 38.0, inseam_in: 31.0, bust_cm: 96.5,  length_cm: 116.8, waist_cm: 76.2, outseam_cm: 96.5,  inseam_cm: 78.7 },
    { label: 'L',   bust_in: 40.0, length_in: 47.0, waist_in: 32.0, outseam_in: 39.0, inseam_in: 32.0, bust_cm: 101.6, length_cm: 119.4, waist_cm: 81.3, outseam_cm: 99.1,  inseam_cm: 81.3 },
    { label: 'XL',  bust_in: 42.0, length_in: 47.0, waist_in: 34.0, outseam_in: 39.0, inseam_in: 32.0, bust_cm: 106.7, length_cm: 119.4, waist_cm: 86.4, outseam_cm: 99.1,  inseam_cm: 81.3 },
    { label: 'XXL', bust_in: 44.0, length_in: 48.0, waist_in: 36.0, outseam_in: 40.0, inseam_in: 33.0, bust_cm: 111.8, length_cm: 121.9, waist_cm: 91.4, outseam_cm: 101.6, inseam_cm: 83.8 },
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

  materialDesignImages: Record<string, { key: string; src: string }[]> = {
    'Cotton': [
      { key: 'cotton01', src: '/images/cotton01.jpeg' },
      { key: 'cotton02', src: '/images/cotton02.jpeg' },
      { key: 'cotton03', src: '/images/cotton03.jpeg' },
      { key: 'cotton04', src: '/images/cotton04.jpeg' },
      { key: 'cotton05', src: '/images/cotton05.jpeg' },
      { key: 'cotton06', src: '/images/cotton06.jpeg' },
      { key: 'cotton07', src: '/images/cotton07.jpeg' },
      { key: 'cotton08', src: '/images/cotton08.jpeg' },
      { key: 'cotton09', src: '/images/cotton09.jpeg' },
      { key: 'cotton10', src: '/images/cotton10.jpeg' },
      { key: 'cotton11', src: '/images/cotton11.jpeg' },
    ],
    'Rayon': [
      { key: 'rayon01', src: '/images/Rayon01.jpeg' },
      { key: 'rayon02', src: '/images/Rayon02.jpeg' },
      { key: 'rayon03', src: '/images/Rayon03.jpeg' },
      { key: 'rayon04', src: '/images/Rayon04.jpeg' },
      { key: 'rayon05', src: '/images/Rayon05.jpeg' },
    ],
    // 'Velvet': [
    //   { key: 'velvet01', src: '/images/velvet01.jpeg' },
    //   { key: 'velvet02', src: '/images/velvet02.jpeg' },
    //   { key: 'velvet03', src: '/images/velvet03.jpeg' },
    //   { key: 'velvet04', src: '/images/velvet04.jpeg' },
    //   { key: 'velvet05', src: '/images/velvet05.jpeg' },
    //   { key: 'velvet06', src: '/images/velvet06.jpeg' },
    //   { key: 'velvet07', src: '/images/velvet07.png' },
    // ],
    // 'BanarasiSilk': [
    //   { key: 'banarasisilk01', src: '/images/BanarsiSilk01.jpeg' },
    //   { key: 'banarasisilk02', src: '/images/BanarsiSilk02.jpeg' },
    //   { key: 'banarasisilk03', src: '/images/BanarsiSilk03.jpeg' },
    //   { key: 'banarasisilk04', src: '/images/BanarsiSilk04.jpeg' },
    //   { key: 'banarasisilk05', src: '/images/BanarsiSilk05.jpeg' },
    //   { key: 'banarasisilk06', src: '/images/BanarsiSilk06.jpeg' },
    // ],
  };

  get filteredDesigns(): { key: string; src: string }[] {
    return this.materialDesignImages[this.selectedMaterialOption] ?? [];
  }

  addToCart() {
  if (!this.selectedMaterialOption) {
    alert('Please select a Material before adding to bag.');
    return;
  }

  if (!this.selectedMaterialDesign) {
    alert('Please select a Material Design before adding to bag.');
    return;
  }

  if (!this.selectedPatternOption) {
    alert('Please select a Pattern before adding to bag.');
    return;
  }

  if (!this.selectedSize) {
    alert('Please select a Size before adding to bag.');
    return;
  }

  this.studioService.addToCart();
  alert('Item added to bag!');
  this.router.navigate(['/bag']);
}

  setSizeUnit(unit: 'in' | 'cm') {
    this.sizeUnit = unit;
  }
}