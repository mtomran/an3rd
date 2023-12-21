import { Table, DataType, Model, Column, AutoIncrement, AllowNull, PrimaryKey, Default, BelongsTo, HasMany, ForeignKey } from 'sequelize-typescript'
import User from './User'
import Answer from './Answer'
import Comment from './Comment'

@Table({ tableName: 'question' })
class Question extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number

  @AllowNull(false)
  @Column
    title: string

  @AllowNull(false)
  @Column(DataType.TEXT)
    body: string

  @AllowNull(false)
  @Default(0)
  @Column
    score: number

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
    user_id: number

  @BelongsTo(() => User)
    User: User

  @HasMany(() => Answer)
    Answers: Answer[] = []

  @HasMany(() => Comment)
    Comments: Comment[] = []
}

export default Question
