import { Promotion } from "src/order/domain/entity/promotion/promotion.entity";

export interface PromotionRepositoryInterface {
  save(promotion: Promotion): Promise<Promotion>;
  findById(id: string): Promise<Promotion | null>;
  findAll(): Promise<Promotion[]>;
  deletePromotion(id: string): Promise<void>;
}