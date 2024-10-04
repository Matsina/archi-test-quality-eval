import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface CreatePromotion {
  name: string;
  code: string;
  amount: number;
}

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  amount: number;

  constructor(createPromotion: CreatePromotion) {
    if (!createPromotion) {
      return;
    }
    if (!createPromotion.name || !createPromotion.code) {
      throw new Error('Missing required fields');
    }
    if (!createPromotion.amount) {
      this.amount = 1500;
    }
    this.name = createPromotion.name;
    this.code = createPromotion.code;
    this.amount = createPromotion.amount;
  }
}
