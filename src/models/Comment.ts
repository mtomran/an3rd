import { DataType, Table, Model, Column, AllowNull, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript';
import User from './User';
import Question from './Question';
import Answer from './Answer';

@Table({ tableName: "comment" })
class Comment extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    
    @AllowNull(false)
    @Column(DataType.TEXT)
    body: string;

    @ForeignKey(() => User)
    @Column
    user_id: number;

    @BelongsTo(() => User)
    User: User;

    @ForeignKey(() => Question)
    @Column
    question_id: number;

    @BelongsTo(() => Question)
    Question: Question;

    @ForeignKey(() => Answer)
    @Column
    answer_id: number;

    @BelongsTo(() => Answer)
    Answer: Answer;
  }

export default Comment;