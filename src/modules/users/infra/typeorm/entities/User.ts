import { Column, Entity, ObjectIdColumn, Unique } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("users")
@Unique(["cpf"])
class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birth: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cep: string;

  @Column()
  role: string;

  @Column()
  patio: string;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  locality: string;

  @Column()
  uf: string;
}

export default User;
