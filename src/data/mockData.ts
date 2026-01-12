// src/data/mockData.ts

// 1. ประกาศ Interface ให้ตรงกับที่หน้า Home เรียกใช้
export interface Wheel {
  id: string;
  name: string;
  price: number;
  image: string; 
  brand: string; // บรรทัดนี้สำคัญมาก โค้ดหน้า Home เรียกใช้ตัวนี้
}

// 2. ข้อมูลตัวอย่าง
export const MOCK_WHEELS: Wheel[] = [
  {
    id: '1',
    name: 'BBS FI-R',
    price: 8500,
    image: 'https://img.freepik.com/free-photo/car-wheel-isolated-white-background_1012-320.jpg', 
    brand: 'Sport'
  },
  {
    id: '2',
    name: 'Vossen HF-5',
    price: 3200,
    image: 'https://img.freepik.com/premium-photo/alloy-wheel-car-isolated-white-background_1012-308.jpg',
    brand: 'Luxury'
  },
  {
    id: '3',
    name: 'Rays TE37',
    price: 4500,
    image: 'https://img.freepik.com/free-photo/shiny-black-car-rim-isolated-white-background_1012-332.jpg',
    brand: 'Sport'
  },
  {
    id: '4',
    name: 'Enkei RPF1',
    price: 1500,
    image: 'https://img.freepik.com/premium-photo/car-wheel-rim-isolated-white-background_527096-2670.jpg',
    brand: 'Classic'
  },
  {
    id: '5',
    name: 'HRE P101',
    price: 9500,
    image: 'https://img.freepik.com/premium-photo/modern-car-wheel-isolated-white-background_127657-16781.jpg',
    brand: 'Luxury'
  },
  {
    id: '6',
    name: 'OZ Racing',
    price: 2100,
    image: 'https://img.freepik.com/free-photo/car-wheel-isolated_1101-1335.jpg',
    brand: 'Sport'
  },
];