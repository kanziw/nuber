import User from '../../../entities/User'
import { ToggleDrivingModeResponse } from '../../../types/graph'
import { Resolvers } from '../../../types/resolvers'
import privateResolver from '../../../utils/privateResolver'

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(
      async (_, __, { req }): Promise<ToggleDrivingModeResponse> => {
        const user: User = req.user
        user.isDriving = !user.isDriving
        try {
          await user.save()
          return {
            ok: true,
            error: null,
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          }
        }
      },
    ),
  },
}

export default resolvers
