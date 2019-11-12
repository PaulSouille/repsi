import { Entity, Column } from '@iaminfinity/express-cassandra';

@Entity({
  table_name: 'likes',
  key: ['id'],
})
export class LikesEntity {
  @Column({
    type: 'uuid',
    default: { $db_function: 'uuid()' },
  })
  parentId: any;

  @Column({
    type: 'uuid',
    default: { $db_function: 'uuid()' },
  })
  userId: any;

}