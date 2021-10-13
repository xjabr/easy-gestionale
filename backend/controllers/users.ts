import * as jwt from 'jsonwebtoken';

import UserColl from '../models/user';
import { JWT_SECRETS } from '../configuration';
import OrganizationColl from '../models/organization';

const{ assertExposable } = require('../modules/errors');

const signToken = (user: any, org: any) => {
  return jwt.sign(
    {
      id: user._id,
			email: user.email,
			organization_id: user.organization_id,
			username: user.username,
      ateco: org.codiceAteco,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 14), // Expires in 14 days
    },
    JWT_SECRETS,
  );
};

export const UsersController = {
  signin: async (body: any) => {
    const { email, password } = body;

    const user = await UserColl.findOne({ email });
		const org = await OrganizationColl.findOne({ _id: user.organization_id });

    assertExposable(user, 'login_fail');
    assertExposable(user.isActive, 'disabled_account');
    // assertExposable(user.isVerified, 'user_not_verified');

    const pwd = await user.isCorrectPassword(password);

    assertExposable(pwd, 'login_fail');

    const token = signToken(user, org);
    return token;
	},

	single: async (id: string) =>{
		const result = await UserColl.findOne({ _id: id });
		return result;
	},

	create: async (body: any) =>{
		const { email, username } = body;

		const exists = await UserColl.exists({ email, username })
		assertExposable(!exists, 'already_exists');

		const newUser = new UserColl(body);
		const result = newUser.save();
		return result;
	},
	
  signout: async (email: string) => {
    const user = await UserColl.findOne({ email });
    assertExposable(user, 'user_not_exists');
    return user;
  }
}