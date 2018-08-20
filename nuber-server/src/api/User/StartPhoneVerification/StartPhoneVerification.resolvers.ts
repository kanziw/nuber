import Verification from '../../../entities/Verification'
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse,
} from '../../../types/graph'
import { Resolvers } from '../../../types/resolvers'
// import { sendVerificationSMS } from '../../../utils/sendSMS'

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs,
    ): Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args
      try {
        const existingVerification = await Verification.findOne({
          payload: phoneNumber,
        })
        if (existingVerification) {
          await existingVerification.remove()
        }
        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: 'PHONE',
        }).save()
        console.log('>>', newVerification.key)
        // await sendVerificationSMS(newVerification.payload, newVerification.key)
        wait(10)
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
  },
}

function wait(ms) {
  const start = Date.now()
  let now = start
  while (now - start < ms) {
    now = Date.now()
  }
}

export default resolvers
