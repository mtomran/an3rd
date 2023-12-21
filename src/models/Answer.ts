import { DataType, Table, Model, Column, AllowNull, PrimaryKey, AutoIncrement, Default, BelongsTo, HasMany, ForeignKey } from 'sequelize-typescript'
import Question from './Question'
import Comment from './Comment'
import User from './User'

@Table({ tableName: 'answer' })
class Answer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number

  @AllowNull(false)
  @Column(DataType.TEXT)
    body: string

  @AllowNull(false)
  @Default(0)
  @Column
    score: number

  @AllowNull(false)
  @Default(false)
  @Column
    accepted: boolean

  @ForeignKey(() => Question)
  @AllowNull(false)
  @Column({
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
    question_id: number

  @BelongsTo(() => Question)
    Question: Question

  @HasMany(() => Comment)
    Comments: Comment[]

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
    user_id: number

  @BelongsTo(() => User)
    User: User
}

export default Answer
