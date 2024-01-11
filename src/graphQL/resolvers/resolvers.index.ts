import { deleteUser } from '../services/User.service'
import { UserModel } from '../../models.mongo/user.model'
import { insertCommentBucket } from '../services/Comment.Bucket.service'
const resolvers = {
   Query: {
      User: async (_: any, { id }: any) => {
         return await UserModel.findById(id)
      },
      Users: async () => await UserModel.find(),
   },
   Mutation: {
      createUser: async (_: any, { inputUser: { name, email, password } }: any) => {
         const user = new UserModel({
            name,
            email,
            password,
         })
         await user.save()
         return user
      },
      deleteUser,
      insertCommentBucket,
   },
}
//
export default resolvers
