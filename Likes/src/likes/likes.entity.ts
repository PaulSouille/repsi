import { Entity, Column } from '@iaminfinity/express-cassandra';

@Entity({
  table_name: 'likes',
  key: ['parentid', 'userid'],
})
export class LikesEntity {
  @Column({
    type: 'uuid',
    default: { $db_function: 'uuid()' },
  })
  id: any;

  @Column({
    type: 'text',
  })
  parentid: any;

  @Column({
    type: 'text',
  })
  userid: any;

}
