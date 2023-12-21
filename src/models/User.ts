import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';
import Question from './Question'
import Comment from './Comment';
import Answer from './Answer';

@Table({
  tableName: "user",
})
class User extends Model {
  
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number = 0;

  @AllowNull(false)
  @Column
  username: string;

  @HasMany(() => Question)
  Questions: Question[] = [];

  @HasMany(() => Answer)
  Answers: Answer[] = [];

  @HasMany(() => Comment)
  Comments: Comment[]  = [];
}
 
export default User;