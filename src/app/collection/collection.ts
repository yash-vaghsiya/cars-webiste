import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Car {
  name: string;
  category: string;
  price: string;
  power: string;
  speed: string;
  image: string;
}

@Component({
  selector: 'app-Collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection.html',
  styleUrls: ['./collection.css'],
})
export class Collection  {

  activeCategory: string = 'all';

  cars: Car[] = [
    {
      name: 'Lamborghini Huracan',
      category: 'sports',
      price: '₹5.5 Cr',
      power: '610 HP',
      speed: '325 km/h',
      image: 'https://tse4.mm.bing.net/th/id/OIP.yL6h6YhF4L5oa98bOyvJwQHaEK?pid=Api&P=0&h=180'
    },
    {
      name: 'Mercedes S-Class',
      category: 'luxury',
      price: '₹1.8 Cr',
      power: '429 HP',
      speed: '250 km/h',
      image: 'https://www.topgear.com/sites/default/files/2022/03/1-Mercedes-S-Class-plug-in.jpg'
    },
    {
      name: 'Tesla Model S',
      category: 'electric',
      price: '₹1.5 Cr',
      power: '1020 HP',
      speed: '322 km/h',
      image: 'https://tse3.mm.bing.net/th/id/OIP.IEgN4XbpauwO6n32B_msvgHaE8?pid=Api&P=0&h=180'
    },
    {
      name: 'Range Rover Sport',
      category: 'suv',
      price: '₹1.6 Cr',
      power: '523 HP',
      speed: '225 km/h',
      image: 'https://tse3.mm.bing.net/th/id/OIP.52MGnS1HppF3ZQvf8UVyQgHaFj?pid=Api&P=0&h=180'
    },


    {
      name: 'Lamborghini Urus',
      category: 'sports',
      price: '₹4.18 Cr',
      power: '657 HP',
      speed: '305 km/h',
      image: 'https://img.indianautosblog.com/gallery/2024/04/28/lamborghini-urus-se-front-quarter-right-bf06.jpg'
    },
    {
      name: 'Fortuner Legender ',
      category: 'suv',
      price: '₹47.46 Lakh',
      power: '201 HP',
      speed: '200 km/h',
      image: 'https://tse4.mm.bing.net/th/id/OIP.CaLlI4i8ETnctic-nTR69wHaEL?pid=Api&P=0&h=180'
    },
    {
      name: 'G wagon ev',
      category: 'electric',
      price: '₹3.10 Cr',
      power: '190 HP',
      speed: '322 km/h',
      image: 'https://www.slashgear.com/img/gallery/2025-mercedes-g-580-revealed-what-the-fully-electric-g-wagon-does-with-four-motors/l-intro-1713799350.jpg'
    },
    {
      name: 'Volvo XC60 ',
      category:'luxury',
      price: '₹68.10 Lakh',
      power: '250 HP',
      speed: '220 km/h',
      image: 'https://4.bp.blogspot.com/-Yq1FaRVtjGo/W3s7MOtOdMI/AAAAAAACtbg/aueyaKVgKPcrv092qb9CWXxsuR2HSEXbgCLcBGAs/s1600/Volvo-XC60-2019%2B%25282%2529.jpg'
    },

        {
      name: 'Lamborghini Huracan',
      category: 'sports',
      price: '₹5.5 Cr',
      power: '610 HP',
      speed: '325 km/h',
      image: 'https://tse4.mm.bing.net/th/id/OIP.yL6h6YhF4L5oa98bOyvJwQHaEK?pid=Api&P=0&h=180'
    },
    {
      name: 'Mercedes S-Class',
      category: 'luxury',
      price: '₹1.8 Cr',
      power: '429 HP',
      speed: '250 km/h',
      image: 'https://www.topgear.com/sites/default/files/2022/03/1-Mercedes-S-Class-plug-in.jpg'
    },
    {
      name: 'Tesla Model S',
      category: 'electric',
      price: '₹1.5 Cr',
      power: '1020 HP',
      speed: '322 km/h',
      image: 'https://tse3.mm.bing.net/th/id/OIP.IEgN4XbpauwO6n32B_msvgHaE8?pid=Api&P=0&h=180'
    },
    {
      name: 'Defender',
      category: 'suv',
      price: '₹2.42 Cr',
      power: '296 HP',
      speed: '195 km/h',
      image: 'https://media.ed.edmunds-media.com/land-rover/defender/2022/oem/2022_land-rover_defender_4dr-suv_110-p525-v8-carpathian-edition_fq_oem_1_815.jpg'
    },


    {
      name: 'Lamborghini Urus',
      category: 'sports',
      price: '₹4.18 Cr',
      power: '657 HP',
      speed: '305 km/h',
      image: 'https://img.indianautosblog.com/gallery/2024/04/28/lamborghini-urus-se-front-quarter-right-bf06.jpg'
    },
    {
      name: 'Ford Endeavor  ',
      category: 'suv',
      price: '₹36.26 Lakh',
      power: '180 HP',
      speed: '190 km/h',
      image: 'https://tse4.mm.bing.net/th/id/OIP.yPJJ4bkgJ-gKvNWVByzpdwHaE6?pid=Api&P=0&h=180'
    },
    {
      name: 'G wagon ev',
      category: 'electric',
      price: '₹3.10 Cr',
      power: '190 HP',
      speed: '322 km/h',
      image: 'https://www.slashgear.com/img/gallery/2025-mercedes-g-580-revealed-what-the-fully-electric-g-wagon-does-with-four-motors/l-intro-1713799350.jpg'
    },
    {
      name: 'Volvo XC60 ',
      category:'luxury',
      price: '₹68.10 Lakh',
      power: '250 HP',
      speed: '220 km/h',
      image: 'https://4.bp.blogspot.com/-Yq1FaRVtjGo/W3s7MOtOdMI/AAAAAAACtbg/aueyaKVgKPcrv092qb9CWXxsuR2HSEXbgCLcBGAs/s1600/Volvo-XC60-2019%2B%25282%2529.jpg'
    }

  ];

  filteredCars: Car[] = [...this.cars];

  filterCars(category: string): void {
    this.activeCategory = category;

    this.filteredCars =
      category === 'all'
        ? this.cars
        : this.cars.filter(car => car.category === category);
  }
}
