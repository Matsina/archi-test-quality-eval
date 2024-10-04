import { InjectDataSource } from '@nestjs/typeorm';
import { Promotion } from 'src/order/domain/entity/promotion/promotion.entity';
import { PromotionRepositoryInterface } from 'src/order/domain/port/persistance/promotion/promotion.repository.interface';
import { DataSource, Repository } from 'typeorm';

export default class PromotionRepositoryTypeOrm
  extends Repository<Promotion>
  implements PromotionRepositoryInterface
{
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(Promotion, datasource.createEntityManager());
  }

  async findById(id: string): Promise<Promotion | null> {
    const queryBuilder = this.createQueryBuilder('promotion');

    queryBuilder.where('promotion.id = :id', { id });

    return queryBuilder.getOne();
  }

  async findAll(): Promise<Promotion[]> {
    const queryBuilder = this.createQueryBuilder('promotion');

    return queryBuilder.getMany();
  }

  async findByName(name: string): Promise<Promotion[]> {
    const queryBuilder = this.createQueryBuilder('promotion');

    queryBuilder.where('promotion.name = :name', { name });

    return queryBuilder.getMany();
  }

  async deletePromotion(id: string): Promise<void> {
    const queryBuilder = this.createQueryBuilder('promotion');

    queryBuilder.where('promotion.id = :id', { id });

    await queryBuilder.delete().execute();
  }
}
